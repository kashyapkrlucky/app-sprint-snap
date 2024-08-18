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

  type Query {
    projects: [Project]
    project(id: ID!): Project
    tasks: [Task]
    task(id: ID!): Task
    comments: [Comment]
    comment(id: ID!): Comment
    notifications: [Notification]
    notification(id: ID!): Notification
  }

  type Mutation {
    createTask(title: String!, description: String, status: String, priority: String, dueDate: String, assignee: ID, project: ID): Task
    updateTask(id: ID!, title: String, description: String, status: String, priority: String, dueDate: String, assignee: ID, project: ID): Task
    deleteTask(id: ID!): Task
    createProject(name: String!, description: String, startDate: String, endDate: String, status: String): Project
    updateProject(id: ID!, name: String, description: String, startDate: String, endDate: String, status: String): Project
    deleteProject(id: ID!): Project
    createComment(content: String!, author: ID, task: ID): Comment
    updateComment(id: ID!, content: String): Comment
    deleteComment(id: ID!): Comment
    createNotification(recipient: ID!, type: String!, message: String!, isRead: Boolean, relatedTask: ID, relatedProject: ID, createdBy: ID): Notification
    updateNotification(id: ID!, isRead: Boolean): Notification
    deleteNotification(id: ID!): Notification
  }
`;

module.exports = typeDefs;
