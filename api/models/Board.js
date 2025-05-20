const mongoose = require("mongoose");
const { Schema } = mongoose;

const ColumnSchema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const BoardSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    columns: [ColumnSchema], // Array of columns with name and tasks
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", BoardSchema);
