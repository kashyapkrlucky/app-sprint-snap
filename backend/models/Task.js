const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: { type: Date },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  reporter: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  ticketType: { type: String, required: true },
  sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
