const Project = require('../models/Project');
const Sprint = require('../models/Sprint');
const Board = require('../models/Board');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const { default: mongoose } = require('mongoose');

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
            const items = await Sprint.find({ project: projectId })
                .populate({
                    path: 'tasks',
                    populate: {
                        path: 'reporter',
                        model: 'User',
                    },
                    options: { sort: { createdAt: -1 } }
                }).sort({ createdAt: -1 });

            const unassignedTasks = await Task.find({ project: projectId, sprints: [] })
                .populate('reporter');

            items.push({
                id: new mongoose.Types.ObjectId(),
                name: 'Backlog',
                tasks: unassignedTasks,
                status: 'Not'
            });

            return items;
        },
        sprint: async (_, { sprintId }) => {
            return await Sprint.findById(sprintId).populate('tasks');
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
            $or: [
                { assignee: userId },
                { reporter: userId }
            ]
        }).populate('assignee').populate('reporter').populate('project'),
        taskByNumber: async (parent, { ticketNumber }) => await Task.findOne({ ticketNumber }).populate('assignee').populate('reporter').populate('sprints'),
        task: async (parent, { id }) => await Task.findById(id).populate('assignee').populate('reporter').populate('sprints'),
        comments: () => Comment.find().populate('author').populate('task'),
        comment: (parent, { id }) => Comment.findById(id).populate('author').populate('task'),
        notifications: () => Notification.find().populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
        notification: (parent, { id }) => Notification.findById(id).populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
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

            // Update the sprint with the new data
            return await Sprint.findByIdAndUpdate(
                sprintId,
                { name, status, startDate, endDate },
                { new: true }
            );
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
            const { id, title, description, priority, points } = args;
            const updates = {};
            if (title) updates.title = title;
            if (description) updates.description = description;
            if (priority) updates.priority = priority;
            if (points) updates.points = points;

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
        createComment: async (parent, args) => {
            const comment = new Comment(args);
            return comment.save();
        },
        updateComment: async (parent, { id, content }) => {
            return Comment.findByIdAndUpdate(id, { content }, { new: true });
        },
        deleteComment: async (parent, { id }) => {
            return Comment.findByIdAndDelete(id);
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
        },

    }
};

module.exports = projectResolver;
