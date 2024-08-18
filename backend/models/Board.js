// models/Board.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        columns: {
            toDo: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
            inProgress: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
            review: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
            done: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Board', BoardSchema);
