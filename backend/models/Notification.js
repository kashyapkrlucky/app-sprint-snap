const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Task Assigned', 'Task Updated', 'Comment Added', 'Project Update'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    relatedTask: { type: Schema.Types.ObjectId, ref: 'Task' },
    relatedProject: { type: Schema.Types.ObjectId, ref: 'Project' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
