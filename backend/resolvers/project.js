const Project = require('../models/Project');
const Sprint = require('../models/Sprint');
const Board = require('../models/Board');
const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const { default: mongoose } = require('mongoose');

const generateBurndownData = (sprint) => {
    // Example: Simplified function to generate burndown data
    // You can customize this based on your specific data and requirements
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const data = [];

    for (let i = 0; i <= totalDays; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const remainingTasks = sprint.tasks.filter(task =>
            !task.completed || new Date(task.completedDate) > date).length;

        data.push({ date: date.toISOString().split('T')[0], remainingTasks });
    }

    return data;
};
const projectResolver = {
    Query: {
        projects: async (_, { userId }) => {
            return await Project.find({ members: userId }).populate('members').sort({ createdAt: -1 });
        },
        project: (parent, { id }) => Project.findById(id).populate('members').populate('tasks').populate('notifications'),
        sprints: async (_, { projectId }) => {
            return await Sprint.find({ project: projectId }).sort({ createdAt: -1 });
        },
        sprintsWithTasks: async (_, { projectId }) => {
            const items = await Sprint.find({ project: projectId, status: { $in: ['Not Started', 'In Progress'] } })
                .populate({
                    path: 'tasks',
                    populate: {
                        path: 'assignee',
                        model: 'User',
                    },
                    options: { sort: { createdAt: -1 } }
                }).sort({ createdAt: -1 });

            const unassignedTasks = await Task.find({ project: projectId, sprints: [] })
                .populate('assignee');

            items.push({
                id: new mongoose.Types.ObjectId(),
                name: 'Backlog',
                tasks: unassignedTasks,
                status: 'Not'
            });

            return items;
        },
        sprint: async (_, { sprintId }) => {
            return await Sprint.findById(sprintId).populate({
                path: 'tasks',
                populate: {
                    path: 'assignee',
                    model: 'User',
                },
                options: { sort: { createdAt: -1 } }
            });
        },
        boards: async (_, { projectId }) => {
            return await Board.find({ project: projectId }).populate({
                path: 'columns.toDo columns.inProgress columns.review columns.done',
            });
        },
        board: async (_, { boardId }) => {
            return await Board.findById(boardId).populate({
                path: 'columns.toDo columns.inProgress columns.review columns.done',
            });
        },
        tasks: async (_, { userId, status }) => await Task.find({
            status,
            assignee: userId,
        }).populate('assignee').populate('reporter').populate('project'),
        taskByNumber: async (parent, { ticketNumber }) => await Task.findOne({ ticketNumber })
            .populate('assignee')
            .populate('reporter')
            .populate('sprints')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User',
                },
                // options: { sort: { createdAt: -1 } }
            }),
        task: async (parent, { id }) => await Task.findById(id)
            .populate('assignee')
            .populate('reporter')
            .populate('sprints')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User',
                },
                // options: { sort: { createdAt: -1 } }
            }),
        comments: () => Comment.find().populate('author').populate('task'),
        comment: (parent, { id }) => Comment.findById(id).populate('author').populate('task'),
        notifications: () => Notification.find().populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
        notification: (parent, { id }) => Notification.findById(id).populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),

        getBurndownData: async (_, { sprintId }) => {
            const sprint = await Sprint.findById(sprintId).populate('tasks');
            const burndownData = generateBurndownData(sprint);
            return burndownData;
        },
    },
    Mutation: {
        createProject: async (parent, args) => {
            const { name, description, startDate, endDate, status, initials, member } = args;
            const project = new Project({
                name, description, startDate, endDate, status, initials, members: [member]
            });
            return project.save();
        },
        updateProject: async (parent, { id, ...updates }) => {
            return Project.findByIdAndUpdate(id, updates, { new: true });
        },
        addProjectMember: async (parent, { id, userId }) => {
            const project = await Project.findById(id).populate('members');
            if (project) {
                project.members.push(userId);
                await project.save();
            }
            return project;
        },
        deleteProject: async (parent, { id }) => {
            return Project.findByIdAndDelete(id);
        },
        createSprint: async (_, { name, projectId }) => {
            const newSprint = new Sprint({
                name,
                project: projectId,
            });
            return await newSprint.save();
        },
        updateSprint: async (_, { sprintId, name, status, startDate, endDate }) => {
            // Find the existing sprint
            const sprint = await Sprint.findById(sprintId);

            if (!sprint) {
                throw new Error('Sprint not found');
            }

            // Status transition logic
            if (sprint.status === 'Closed') {
                throw new Error('Cannot update a sprint that is closed');
            }

            if (sprint.status === 'Completed' && status !== 'Closed') {
                throw new Error('A completed sprint can only transition to Closed');
            }

            if (sprint.status === 'In Progress' && status === 'Not Started') {
                throw new Error('Cannot revert an In Progress sprint back to Not Started');
            }

            if (sprint.status === 'Not Started' && status === 'Completed') {
                throw new Error('Cannot mark a Not Started sprint as Completed');
            }

            // Date validation logic
            if (status === 'Not Started' && new Date(startDate) <= new Date()) {
                throw new Error('Start date must be in the future for Not Started sprints');
            }

            if (status === 'Completed' && new Date(endDate) > new Date()) {
                throw new Error('End date must be in the past or today for Completed sprints');
            }

            if (status === 'In Progress') {
                const sprint = await Sprint.findById(sprintId).populate('project');
                const project = await Project.findById(sprint?.project);
                project.activeSprint = sprintId;
                project.save();
            }

            // Update the sprint with the new data
            return await Sprint.findByIdAndUpdate(
                sprintId,
                { name, status, startDate, endDate },
                { new: true }
            );
        },
        completeSprint: async (_, { sprintId, newSprintId, taskIds }) => {
            // Step 2: Remove task IDs from the old sprint
            await Sprint.findByIdAndUpdate(sprintId, {
                status: 'Completed',
                $pull: { tasks: { $in: taskIds } }
            });

            if (newSprintId) {
                // Step 1: Update tasks with the new sprint ID
                await Task.updateMany(
                    { _id: { $in: taskIds } }, // Filter tasks by the given task IDs
                    { $addToSet: { sprints: newSprintId } } // Set the new sprint ID
                );

                // Step 3: Add task IDs to the new sprint
                await Sprint.findByIdAndUpdate(newSprintId, {
                    $addToSet: { tasks: { $each: taskIds } } // $addToSet to avoid duplicates
                });
            }

            const sprint = await Sprint.findById(sprintId).populate('project');
            const project = await Project.findById(sprint?.project);
            project.activeSprint = null;
            project.save();
            return true;
        },
        updateSprintTask: async (_, { sprintId, newSprintId, taskId }) => {
            if (newSprintId) {
                await Task.findByIdAndUpdate(taskId, { $push: { sprints: newSprintId } });
                await Sprint.findByIdAndUpdate(newSprintId, {
                    $push: { tasks: taskId } // $addToSet to avoid duplicates
                });
                if (sprintId) {
                    await Sprint.findByIdAndUpdate(sprintId, {
                        $pull: { tasks: taskId }
                    });
                }
            } else {
                await Task.findByIdAndUpdate(taskId, { sprints: [] });
                await Sprint.findByIdAndUpdate(sprintId, {
                    $pull: { tasks: taskId }
                });
            }
            return true;
        },
        deleteSprint: async (_, { sprintId }) => {
            await Sprint.findByIdAndDelete(sprintId);
            return true;
        },

        createBoard: async (_, { name, projectId }) => {
            const newBoard = new Board({
                name,
                project: projectId,
                columns: {
                    toDo: [],
                    inProgress: [],
                    review: [],
                    done: [],
                },
            });
            return await newBoard.save();
        },
        updateBoard: async (_, { boardId, name }) => {
            return await Board.findByIdAndUpdate(boardId, { name }, { new: true });
        },
        deleteBoard: async (_, { boardId }) => {
            await Board.findByIdAndDelete(boardId);
            return true;
        },
        createTask: async (parent, args) => {
            const { projectId, title, description, reporter, priority, sprintId, ticketType, points } = args;

            // Fetch the project and increment the ticketCount
            const project = await Project.findById(projectId);
            if (!project) throw new Error('Project not found');

            project.ticketCount += 1;
            await project.save();

            // Generate the ticket number (e.g., PRO-001)
            const ticketNumber = `${project.initials}-${project.ticketCount.toString().padStart(3, '0')}`;

            // Create the new task with the generated ticket number
            const task = new Task({
                title,
                description,
                project: projectId,
                reporter,
                priority,
                ticketType,
                ticketNumber,
                points
            });

            // Push sprintId to the task's sprints array if sprintId is provided and doesn't already exist
            if (sprintId && !task.sprints.includes(sprintId)) {
                task.sprints.push(sprintId);
            }

            const newTask = await task.save();

            if (sprintId) {
                const sprint = await Sprint.findById(sprintId);
                sprint.tasks.push(newTask.id);
                sprint.save();
            }
            // Save the task
            return newTask;
        },
        updateTask: async (parent, args) => {
            const { id, title, description, priority, points, assignee } = args;
            const updates = {};
            if (title) updates.title = title;
            if (description) updates.description = description;
            if (priority) updates.priority = priority;
            if (points) updates.points = points;
            if (assignee) updates.assignee = assignee;

            return await Task.findByIdAndUpdate(id, updates, { new: true });
        },
        updateTaskStatus: async (parent, { taskId, status }) => {
            return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        },
        deleteTask: async (parent, { id }) => {
            return Task.findByIdAndDelete(id);
        },
        moveTask: async (_, { boardId, taskId, fromColumn, toColumn }) => {
            const board = await Board.findById(boardId);

            // Remove task from the current column
            board.columns[fromColumn] = board.columns[fromColumn].filter(
                (task) => task.toString() !== taskId
            );

            // Add task to the new column
            board.columns[toColumn].push(taskId);

            await board.save();
            return board.populate({
                path: 'columns.toDo columns.inProgress columns.review columns.done',
            });
        },
        createComment: async (parent, { content, author, task }) => {

            if (!author) throw new Error('Not authenticated');

            const item = await Task.findById(task);
            if (!item) throw new Error('task not found');

            const comment = new Comment({ content, task, author });

            const saved = await comment.save();
            item.comments.push(saved.id);
            await item.save();

            return saved;
        },
        updateComment: async (parent, { id, content }) => {
            return Comment.findByIdAndUpdate(id, { content }, { new: true });
        },
        deleteComment: async (parent, { id }) => {

            // Find the reply
            const comment = await Comment.findById(id);
            if (!comment) {
                throw new Error('comment not found');
            }

            // Check if the user is the author of the reply
            // if (comment.author.toString() !== user.id) {
            //     throw new Error('You do not have permission to delete this reply');
            // }

            // Remove the reply from the discussion and delete the reply document
            await Task.findByIdAndUpdate(
                comment?.task,
                { $pull: { comments: id } }
            );

            await Comment.findByIdAndRemove(id);

            return { id };
        },
        createNotification: async (parent, args) => {
            const notification = new Notification(args);
            return notification.save();
        },
        updateNotification: async (parent, { id, isRead }) => {
            return Notification.findByIdAndUpdate(id, { isRead }, { new: true });
        },
        deleteNotification: async (parent, { id }) => {
            return Notification.findByIdAndDelete(id);
        }
    }
};


module.exports = projectResolver;
