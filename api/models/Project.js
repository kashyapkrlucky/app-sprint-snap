const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Project Schema
 */
const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    initials: { type: String, trim: true },
    ticketCount: { type: Number, default: 0 },
    activeSprint: { type: Schema.Types.ObjectId, ref: "Sprint" }, // added ref for clarity
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
