const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProfileSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    city: { type: String },
    country: { type: String },
    tagline: { type: String },
    phone: { type: String },
    notifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);