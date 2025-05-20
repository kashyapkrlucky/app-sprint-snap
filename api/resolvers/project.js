const projectController = require("../controllers/project");
const boardController = require("../controllers/board");
const ticketController = require("../controllers/ticket");
const commentController = require("../controllers/comment");
const notificationController = require("../controllers/notification");

const resolvers = {
  Query: {
    // Project Queries
    projects: async (_, { userId }) => projectController.getProjects(userId),
    project: async (_, { id }) => projectController.getProjectById(id),
    getBurndownData: async (_, { sprintId }) =>
      projectController.getBurndownData(sprintId),

    // Sprint Queries
    sprints: async (_, { projectId }) =>
      projectController.getSprints(projectId),
    sprint: async (_, { id }) => projectController.getSprintById(id),

    // Board Queries
    boards: async (_, { projectId }) => boardController.getBoards(projectId),
    board: async (_, { id }) => boardController.getBoardById(id),

    // Ticket Queries
    tickets: async (_, { boardId }) => ticketController.getTickets(boardId),
    ticket: async (_, { id }) => ticketController.getTicketById(id),

    // Comment Queries
    comments: async (_, { taskId }) => commentController.getComments(taskId),
    comment: async (_, { id }) => commentController.getCommentById(id),

    // Notification Queries
    notifications: async (_, { userId }) =>
      notificationController.getNotifications(userId),
    notification: async (_, { id }) =>
      notificationController.getNotificationById(id),
  },

  Mutation: {
    // Project Mutations
    createProject: async (_, args) => projectController.createProject(args),
    updateProject: async (_, { id, ...updates }) =>
      projectController.updateProject(id, updates),
    addProjectMember: async (_, { id, userId }) =>
      projectController.addProjectMember(id, userId),
    deleteProject: async (_, { id }) => projectController.deleteProject(id),

    // Sprint Mutations
    createSprint: async (_, args) => sprintController.createSprint(args),
    updateSprint: async (_, { id, ...updates }) =>
      sprintController.updateSprint(id, updates),
    deleteSprint: async (_, { id }) => sprintController.deleteSprint(id),

    // Board Mutations
    createBoard: async (_, args) => boardController.createBoard(args),
    updateBoard: async (_, { id, ...updates }) =>
      boardController.updateBoard(id, updates),
    deleteBoard: async (_, { id }) => boardController.deleteBoard(id),

    // Ticket Mutations
    createTicket: async (_, args) => taskController.createTicket(args),
    updateTicket: async (_, { id, ...updates }) =>
      taskController.updateTicket(id, updates),
    deleteTicket: async (_, { id }) => taskController.deleteTicket(id),
    moveTicket: async (_, { taskId, newBoardId }) =>
      taskController.moveTicket(taskId, newBoardId),
    // assignTicket: async (_, { taskId, userId }) =>
    //   taskController.assignTicket(taskId, userId),

    // Comment Mutations
    createComment: async (_, args) => commentController.createComment(args),
    updateComment: async (_, { id, ...updates }) =>
      commentController.updateComment(id, updates),
    deleteComment: async (_, { id }) => commentController.deleteComment(id),

    // Notification Mutations
    createNotification: async (_, args) =>
      notificationController.createNotification(args),
    updateNotification: async (_, { id, ...updates }) =>
      notificationController.updateNotification(id, updates),
    deleteNotification: async (_, { id }) =>
      notificationController.deleteNotification(id),
  },
};

module.exports = resolvers;
