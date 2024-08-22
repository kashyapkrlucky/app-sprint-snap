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
    initials: String
  }

  type Sprint {
    id: ID!
    name: String!
    project: Project!
    startDate: String
    endDate: String
    status: String!
    tasks: [Task!]
    createdAt: String!
    updatedAt: String!
  }

  type Board {
    id: ID!
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

  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    priority: String
    dueDate: String
    assignee: User
    reporter: User
    project: Project
    comments: [Comment]
    notifications: [Notification]
    ticketType: String
    createdAt: String
    updatedAt: String
    sprints: [Sprint]
    ticketNumber: String
    points: Int
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
    projects(userId: ID!): [Project]
    project(id: ID!): Project
    sprints(projectId: ID!): [Sprint!]
    sprintsWithTasks(projectId: ID): [Sprint]
    sprint(sprintId: ID!): Sprint
    boards(projectId: ID!): [Board!]
    board(boardId: ID!): Board
    tasks(userId: ID!, status: String): [Task]
    task(id: ID!): Task
    taskByNumber(ticketNumber: String): Task
    comments: [Comment]
    comment(id: ID!): Comment
    notifications: [Notification]
    notification(id: ID!): Notification
  }

  type Mutation {
    
    createProject(name: String!, description: String, startDate: String, endDate: String, status: String, initials: String, member: ID): Project
    updateProject(id: ID!, name: String, description: String, startDate: String, endDate: String, status: String): Project
    addProjectMember(id: ID!, userId: ID): Project
    deleteProject(id: ID!): Project

    createSprint(name: String!, projectId: ID!): Sprint!
    updateSprint(sprintId: ID!, name: String, status: String, startDate: String, endDate: String): Sprint!
    deleteSprint(sprintId: ID!): Boolean!

    createBoard(name: String!, projectId: ID!): Board!
    updateBoard(boardId: ID!, name: String): Board!
    deleteBoard(boardId: ID!): Boolean!

    createTask(title: String!, description: String, priority: String, reporter: ID!, projectId: ID!, ticketType:String!, sprintId: ID, points: Int): Task
    updateTask(id: ID!, title: String, description: String, priority: String, points: Int, assignee: ID): Task
    deleteTask(id: ID!): Task
    moveTask(boardId: ID!, taskId: ID!, fromColumn: String!, toColumn: String!): Board!
    updateTaskStatus(taskId: ID!, status: String): Task
    
    createComment(content: String!, author: ID, task: ID): Comment
    updateComment(id: ID!, content: String): Comment
    deleteComment(id: ID!): Comment

    createNotification(recipient: ID!, type: String!, message: String!, isRead: Boolean, relatedTask: ID, relatedProject: ID, createdBy: ID): Notification
    updateNotification(id: ID!, isRead: Boolean): Notification
    deleteNotification(id: ID!): Notification
    
  }
`;

module.exports = typeDefs;
