// models/Sprint.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SprintSchema = new Schema(
  {
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "Closed"],
      default: "Not Started",
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sprint", SprintSchema);
