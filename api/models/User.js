const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    fullName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

// Auto-generate fullName before saving
UserSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

// Hash password before saving if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare candidate password with stored hashed password
 * @param {string} candidatePassword
 * @returns {Promise<boolean>}
 */
UserSchema.methods.matchPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Text index on fullName for search optimization
UserSchema.index({ fullName: "text" });

module.exports = mongoose.model("User", UserSchema);
