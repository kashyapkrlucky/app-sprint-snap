import { gql } from "@apollo/client";

// Profile Queries
export const GET_USER = gql`
  query GetUser($id: ID) {
    getUser(id: $id) {
      id
      firstName
      lastName
      avatar
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($text: String) {
    searchUsers(text: $text) {
      id
      fullName
      avatar
    }
  }
`;

// Project Queries
export const GET_PROJECTS = gql`
  query GetProjects($userId: ID!) {
    projects(userId: $userId) {
      id
      name
      description
      initials
      members {
        id
        fullName
        avatar
      }
      activeSprint
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      tasks {
        id
        title
      }
    }
  }
`;

// Task Queries
export const GET_TASKS = gql`
  query GetTasks($userId: ID!, $status: String) {
    tasks(userId: $userId, status: $status) {
      id
      title
      description
      status
      priority
      assignee{
        id
        fullName
        avatar
      }
      reporter{
        id
        fullName
        avatar
      }
      project {
        id
        name
      }
      ticketType
      ticketNumber
      points
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      priority
      assignee{
        id
        fullName
        avatar
      }
      reporter{
        id
        fullName
        avatar
      }
      ticketType
      sprints {
        id
        name
      }
      ticketNumber
      createdAt
      updatedAt   
      points
      comments {
        id
        content
        createdAt
        author {
           id
           fullName
        }
      }
    }
  }
`;

export const GET_TASK_BY_NUMBER = gql`
  query GetTaskByNumber($ticketNumber: String) {
    taskByNumber(ticketNumber: $ticketNumber) {
      id
      title
      description
      status
      priority
      assignee{
        id
        fullName
        avatar
      }
      reporter{
        id
        fullName
        avatar
      }
      ticketType
      sprints {
        id
        name
      }
      ticketNumber
      createdAt
      updatedAt  
      points
      comments {
        id
        content
        createdAt
        author {
           id
           fullName
        }
      }        
    }
  }
`;

// Sprint Queries
export const GET_SPRINTS = gql`
  query GetSprints($projectId: ID!) {
    sprints(projectId: $projectId) {
      id
      name
      startDate
      endDate
      status
    }
  }
`;

// Sprint Queries
export const GET_SPRINTS_WITH_TASKS = gql`
  query GetSprintsWithTasks($projectId: ID) {
    sprintsWithTasks(projectId: $projectId) {
      id
      name
      startDate
      endDate
      status
      tasks {
        id
        title
        description
        status
        priority
        assignee {
          id
          fullName
          avatar
        }
        ticketType
        ticketNumber
        createdAt
        updatedAt   
        points
      }
    }
  }
`;

export const GET_SPRINT = gql`
  query GetSprint($sprintId: ID!) {
    sprint(sprintId: $sprintId) {
      id
      name
      startDate
      endDate
      status
      tasks {
        id
        title
        description
        status
        priority
        assignee {
          id
          fullName
          avatar
        }
        ticketType
        ticketNumber
        createdAt
        updatedAt   
        points
      }
    }
  }
`;

// Board Queries
export const GET_BOARDS = gql`
  query GetBoards($projectId: ID!) {
    boards(projectId: $projectId) {
      id
      name
      columns {
        id
        name
      }
    }
  }
`;

export const GET_BOARD = gql`
  query GetBoard($boardId: ID!) {
    board(boardId: $boardId) {
      id
      name
      columns {
        id
        name
        tasks {
          id
          title
        }
      }
    }
  }
`;



export const GET_BURNDOWN_DATA = gql`
    query GetBurndownData($sprintId: ID!) {
        getBurndownData(sprintId: $sprintId) {
            date
            remainingTasks
        }
    }
`;