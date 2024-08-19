import { gql } from "@apollo/client";

// Project Queries
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      initials
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
  query GetTasks {
    tasks {
      id
      title
      description
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      comments {
        id
        content
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
      tasks {
        id
        title
        ticketType
        assignee {
          id
          fullName
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
