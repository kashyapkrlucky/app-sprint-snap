const Project = require('../models/Project');
const Sprint = require('../models/Sprint');
const Board = require('../models/Board');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

const projectResolver = {
    Query: {
        projects: async () => {
            return await Project.find().populate('members').sort({ createdAt: -1 });
        },
        project: (parent, { id }) => Project.findById(id).populate('members').populate('tasks').populate('notifications'),
        sprints: async (_, { projectId }) => {
            return await Sprint.find({ project: projectId }).populate('tasks').sort({ createdAt: -1 });
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
        tasks: () => Task.find().populate('assignee').populate('project').populate('comments').populate('notifications'),
        task: (parent, { id }) => Task.findById(id).populate('assignee').populate('project').populate('comments').populate('notifications'),
        comments: () => Comment.find().populate('author').populate('task'),
        comment: (parent, { id }) => Comment.findById(id).populate('author').populate('task'),
        notifications: () => Notification.find().populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),
        notification: (parent, { id }) => Notification.findById(id).populate('recipient').populate('relatedTask').populate('relatedProject').populate('createdBy'),

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
        createSprint: async (_, { name, projectId }) => {
            const newSprint = new Sprint({
                name,
                project: projectId,
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
        deleteBoard: async (_, { boardId }) => {
            await Board.findByIdAndDelete(boardId);
            return true;
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
