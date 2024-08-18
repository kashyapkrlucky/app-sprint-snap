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
        }
    }
};

module.exports = projectResolver;
