const { gql } = require("apollo-server-express");

const projectTypeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String
    startDate: DateTime
    endDate: DateTime
    status: String
    members: [User!]!
    notifications: [Notification!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    initials: String
    activeSprint: ID
  }

  type Sprint {
    id: ID!
    name: String!
    project: Project!
    startDate: DateTime
    endDate: DateTime
    status: String!
    tickets: [Ticket!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Board {
    id: ID!
    name: String!
    project: Project!
    columns: BoardColumns!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type BoardColumns {
    toDo: [Ticket!]!
    inProgress: [Ticket!]!
    review: [Ticket!]!
    done: [Ticket!]!
  }
  type Ticket {
    id: ID!
    title: String!
    description: String
    status: String
    priority: String
    dueDate: DateTime
    assignee: User
    reporter: User
    project: Project
    comments: [Comment!]!
    notifications: [Notification!]!
    ticketType: String
    createdAt: DateTime!
    updatedAt: DateTime!
    sprints: [Sprint!]!
    ticketNumber: String
    points: Int
  }

  type Comment {
    id: ID!
    content: String!
    author: User
    ticket: Ticket
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Notification {
    id: ID!
    recipient: User!
    type: String!
    message: String!
    isRead: Boolean
    relatedTicket: Ticket
    relatedProject: Project
    createdBy: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type BurndownPoint {
    date: DateTime!
    remainingTickets: Int!
  }

  type Query {
    projects(userId: ID!): [Project!]!
    project(id: ID!): Project
    sprints(projectId: ID!): [Sprint!]!
    sprint(sprintId: ID!): Sprint
    boards(projectId: ID!): [Board!]!
    board(boardId: ID!): Board
    tickets(userId: ID!, status: String): [Ticket!]!
    ticket(id: ID!): Ticket
    ticketByNumber(ticketNumber: String): Ticket
    comments: [Comment!]!
    comment(id: ID!): Comment
    notifications: [Notification!]!
    notification(id: ID!): Notification
    getBurndownData(sprintId: ID!): [BurndownPoint!]!
  }

  type Mutation {
    createProject(
      name: String!
      description: String
      startDate: DateTime
      endDate: DateTime
      status: String
      initials: String
      member: ID
    ): Project
    updateProject(
      id: ID!
      name: String
      description: String
      startDate: DateTime
      endDate: DateTime
      status: String
    ): Project
    addProjectMember(id: ID!, userId: ID!): Project
    deleteProject(id: ID!): Project

    createSprint(name: String!, projectId: ID!): Sprint!
    updateSprint(
      sprintId: ID!
      name: String
      status: String
      startDate: DateTime
      endDate: DateTime
    ): Sprint!
    completeSprint(sprintId: ID!, newSprintId: ID, ticketIds: [ID]): Boolean
    updateSprintTicket(sprintId: ID, newSprintId: ID, ticketId: ID): Boolean
    deleteSprint(sprintId: ID!): Boolean!

    createBoard(name: String!, projectId: ID!): Board!
    updateBoard(boardId: ID!, name: String): Board!
    deleteBoard(boardId: ID!): Boolean!
    createTicket(
      title: String!
      description: String
      priority: String
      reporter: ID!
      projectId: ID!
      ticketType: String!
      sprintId: ID
      points: Int
    ): Ticket
    updateTicket(
      id: ID!
      title: String
      description: String
      priority: String
      points: Int
      assignee: ID
    ): Ticket
    deleteTicket(id: ID!): Ticket
    moveTicket(
      boardId: ID!
      ticketId: ID!
      fromColumn: String!
      toColumn: String!
    ): Board!
    updateTicketStatus(ticketId: ID!, status: String): Ticket

    createComment(content: String!, author: ID, ticket: ID): Comment
    updateComment(id: ID!, content: String): Comment
    deleteComment(id: ID!): ID

    createNotification(
      recipient: ID!
      type: String!
      message: String!
      isRead: Boolean
      relatedTicket: ID
      relatedProject: ID
      createdBy: ID
    ): Notification
    updateNotification(id: ID!, isRead: Boolean): Notification
    deleteNotification(id: ID!): Notification
  }
`;

module.exports = projectTypeDefs;
