const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

const projectResolver = {
    Query: {
        projects: () => Project.find().populate('members').populate('tasks').populate('notifications'),
        project: (parent, { id }) => Project.findById(id).populate('members').populate('tasks').populate('notifications'),
        tasks: () => Task.find().populate('assignee').populate('project').populate('comments').populate('notifications'),
        task: (parent, { id }) => Task.findById(id).populate('assignee').populate('project').populate('comments').populate('notifications'),
        comments: () => Comment.find().populate('author').populate('task'),
        comment: (parent, { id }) => Comment.findById(id).populate('author').populate('task'),
        notifications: () => Notification.find().populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
        notification: (parent, { id }) => Notification.findById(id).populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
        getSprints: async (_, { projectId }) => {
            return await Sprint.find({ project: projectId }).populate('tasks');
        },
        getSprint: async (_, { sprintId }) => {
            return await Sprint.findById(sprintId).populate('tasks');
        },
        getBoards: async (_, { projectId }) => {
            return await Board.find({ project: projectId }).populate({
                path: 'columns.toDo columns.inProgress columns.review columns.done',
            });
        },
        getBoard: async (_, { boardId }) => {
            return await Board.findById(boardId).populate({
                path: 'columns.toDo columns.inProgress columns.review columns.done',
            });
        },
    },
    Mutation: {
        createProject: async (parent, args) => {
            const project = new Project(args);
            return project.save();
        },
        updateProject: async (parent, { id, ...updates }) => {
            return Project.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteProject: async (parent, { id }) => {
            return Project.findByIdAndDelete(id);
        },
        createTask: async (parent, args) => {
            const task = new Task(args);
            return task.save();
        },
        updateTask: async (parent, { id, ...updates }) => {
            return Task.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteTask: async (parent, { id }) => {
            return Task.findByIdAndDelete(id);
        },
        moveTask: async (_, { taskId, newStatus }) => {
            const task = await Task.findById(taskId).populate('dependencies');

            // Check if all dependencies are done
            const unmetDependencies = task.dependencies.filter(dep => dep.status !== 'done');

            if (unmetDependencies?.length > 0) {
                throw new Error('Task cannot be moved until dependencies are completed.');
            }

            task.status = newStatus;
            await task.save();
            return task;
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
        createSprint: async (_, { name, projectId, startDate, endDate }) => {
            const newSprint = new Sprint({
                name,
                project: projectId,
                startDate,
                endDate,
            });
            return await newSprint.save();
        },
        updateSprint: async (_, { sprintId, name, status, startDate, endDate }) => {
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
        deleteBoard: async (_, { boardId }) => {
            await Board.findByIdAndDelete(boardId);
            return true;
        },
    }
};

module.exports = projectResolver;
