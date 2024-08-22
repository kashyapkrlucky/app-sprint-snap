import { gql } from "@apollo/client";

// Project Queries
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
        ticketType
        ticketNumber
        reporter {
          id
          fullName
          avatar
        }
        status
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
        ticketType
        assignee
        status
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
