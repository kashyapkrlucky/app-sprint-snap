const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Sprint Schema
 */
const SprintSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "Closed"],
      default: "Not Started",
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sprint", SprintSchema);
