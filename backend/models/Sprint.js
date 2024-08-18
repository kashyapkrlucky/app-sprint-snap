// models/Sprint.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SprintSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project', // Reference to the project the sprint belongs to
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['Not Started', 'In Progress', 'Completed', 'Closed'],
            default: 'Not Started',
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task', // Reference to tasks in this sprint
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Sprint', SprintSchema);
