const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "Ticket Assigned",
        "Ticket Updated",
        "Comment Added",
        "Project Update",
      ],
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true },
    ticket: { type: Schema.Types.ObjectId, ref: "Ticket" }, // optional
    project: { type: Schema.Types.ObjectId, ref: "Project" }, // optional
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
