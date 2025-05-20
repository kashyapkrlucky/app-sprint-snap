const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProfileSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    tagline: { type: String, default: "" },
    phone: { type: String },
    settings: {
      notifications: { type: Boolean, default: true },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
