const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    avatar: { type: String, default: '' },
}, { timestamps: true });

// Auto-generate fullName before saving
UserSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});

// Hash password before saving if it has been modified
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare raw password with hashed password
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Text index for fullName
UserSchema.index({ fullName: "text" });

module.exports = mongoose.model('User', UserSchema);
