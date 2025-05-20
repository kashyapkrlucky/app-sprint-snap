// controllers/ticket.controller.js
const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

// Create Ticket
exports.createTicket = async ({ input }, user) => {
  const {
    title,
    description,
    status,
    priority,
    assigneeId,
    sprintId,
    boardId,
    projectId,
  } = input;

  const ticket = await Ticket.create({
    title,
    description,
    status,
    priority,
    assignee: assigneeId,
    sprint: sprintId,
    board: boardId,
    project: projectId,
    createdBy: user.id,
  });

  return ticket;
};

// Get Single Ticket
exports.getTicketById = async ({ id }) => {
  const ticket = await Ticket.findById(id)
    .populate("assignee")
    .populate("sprint")
    .populate("board")
    .populate("project");

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

// Get All Tickets for a Project/Board/Sprint
exports.getTickets = async ({ projectId, boardId, sprintId }) => {
  const filter = {};
  if (projectId) filter.project = projectId;
  if (boardId) filter.board = boardId;
  if (sprintId) filter.sprint = sprintId;

  const tasks = await Ticket.find(filter)
    .sort({ createdAt: -1 })
    .populate("assignee");

  return tasks;
};

// Update Ticket
exports.updateTicket = async ({ id, input }) => {
  const ticket = await Ticket.findByIdAndUpdate(id, input, { new: true });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

// Delete Ticket
exports.deleteTicket = async ({ id }) => {
  const ticket = await Ticket.findById(id);

  if (!ticket) throw new Error("Ticket not found");

  // Delete related comments
  await Comment.deleteMany({ ticket: id });

  // Optionally delete related notifications
  await Notification.deleteMany({ ticket: id });

  await ticket.remove();

  return { message: "Ticket deleted successfully" };
};

// Assign Ticket to User
exports.assignTicket = async ({ taskId, userId }) => {
  const ticket = await Ticket.findById(taskId);
  if (!ticket) throw new Error("Ticket not found");

  ticket.assignee = userId;
  await ticket.save();

  return ticket;
};
