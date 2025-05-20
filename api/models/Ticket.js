const mongoose = require("mongoose");
const { Schema } = mongoose;

const VALID_TICKET_TYPES = ["Bug", "Feature", "Task", "Improvement"];
const VALID_POINTS = [0, 1, 2, 3, 5, 8];

const ticketSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, default: "" },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: { type: Date, required: false },
    assignee: { type: Schema.Types.ObjectId, ref: "User", required: false },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: false },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: false },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    notifications: {
      type: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
      default: [],
    },
    ticketType: {
      type: String,
      enum: VALID_TICKET_TYPES,
      required: true,
    },
    sprints: {
      type: [{ type: Schema.Types.ObjectId, ref: "Sprint" }],
      default: [],
    },
    ticketNumber: { type: String, unique: true, index: true, required: false },
    points: {
      type: Number,
      default: 0,
      validate: {
        validator: (val) => VALID_POINTS.includes(val),
        message: `{VALUE} is not a valid point value`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
