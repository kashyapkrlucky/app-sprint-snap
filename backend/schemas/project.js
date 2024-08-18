const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String
    startDate: String
    endDate: String
    status: String
    members: [User]
    tasks: [Task]
    notifications: [Notification]
    createdAt: String
    updatedAt: String
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    priority: String
    dueDate: String
    assignee: User
    project: Project
    comments: [Comment]
    notifications: [Notification]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: ID!
    content: String!
    author: User
    task: Task
    createdAt: String
    updatedAt: String
  }

  type Notification {
    id: ID!
    recipient: User!
    type: String!
    message: String!
    isRead: Boolean
    relatedTask: Task
    relatedProject: Project
    createdBy: User
    createdAt: String
    updatedAt: String
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    status: String!
  }

  type Sprint {
    _id: ID!
    name: String!
    project: Project!
    startDate: String!
    endDate: String!
    status: String!
    tasks: [Task!]
    createdAt: String!
    updatedAt: String!
  }


  type Board {
    _id: ID!
    name: String!
    project: Project!
    columns: BoardColumns!
    createdAt: String!
    updatedAt: String!
  }

  type BoardColumns {
    toDo: [Task!]
    inProgress: [Task!]
    review: [Task!]
    done: [Task!]
  }

  type BoardColumn {
    name: String!
    tasks: [Task!]
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
    tasks: [Task]
    task(id: ID!): Task
    comments: [Comment]
    comment(id: ID!): Comment
    notifications: [Notification]
    notification(id: ID!): Notification
    getSprints(projectId: ID!): [Sprint!]
    getSprint(sprintId: ID!): Sprint
    getBoards(projectId: ID!): [Board!]
    getBoard(boardId: ID!): Board
  }

  type Mutation {
    createTask(title: String!, description: String, status: String, priority: String, dueDate: String, assignee: ID, project: ID): Task
    updateTask(id: ID!, title: String, description: String, status: String, priority: String, dueDate: String, assignee: ID, project: ID): Task
    deleteTask(id: ID!): Task
    moveTask(boardId: ID!, taskId: ID!, fromColumn: String!, toColumn: String!): Board!
    
    createProject(name: String!, description: String, startDate: String, endDate: String, status: String): Project
    updateProject(id: ID!, name: String, description: String, startDate: String, endDate: String, status: String): Project
    deleteProject(id: ID!): Project
    createComment(content: String!, author: ID, task: ID): Comment
    updateComment(id: ID!, content: String): Comment
    deleteComment(id: ID!): Comment
    createNotification(recipient: ID!, type: String!, message: String!, isRead: Boolean, relatedTask: ID, relatedProject: ID, createdBy: ID): Notification
    updateNotification(id: ID!, isRead: Boolean): Notification
    deleteNotification(id: ID!): Notification
    
    createSprint(name: String!, projectId: ID!, startDate: String!, endDate: String!): Sprint!
    updateSprint(sprintId: ID!, name: String, status: String, startDate: String, endDate: String): Sprint!
    deleteSprint(sprintId: ID!): Boolean!

    createBoard(name: String!, projectId: ID!): Board!
    updateBoard(boardId: ID!, name: String): Board!
    deleteBoard(boardId: ID!): Boolean!
    
  }
`;

module.exports = typeDefs;
