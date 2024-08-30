import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        fullName
        avatar
      }
      profile {
        notifications
        theme
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        id
        email
        fullName
        avatar
      }
      profile {
        notifications
        theme
      }
    }
  }
`;



export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $firstName: String!,
    $lastName: String!,
    $city: String,
    $country: String,
    $tagline: String,
    $phone: String,
    $notifications: Boolean!
    $theme: String!
  ) {
    updateProfile(
      firstName: $firstName,
      lastName: $lastName,
      city: $city,
      country: $country,
      tagline: $tagline,
      phone: $phone,
      notifications: $notifications
      theme: $theme
    ) {
      id
      user {
        firstName
        lastName
        fullName
        avatar
        email
      }
      city
      country
      tagline
      phone
      notifications
      theme
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $firstName: String,
    $lastName: String,
    $avatar: String,
  ) {
    updateUserInfo(
      firstName: $firstName,
      lastName: $lastName,
      avatar: $avatar,
    ) {
      id
      avatar
    }
  }
`;



export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String!, $startDate:String, $endDate:String, $initials: String, $member: ID) {
    createProject(name: $name, description: $description, startDate:$startDate, endDate:$endDate, initials: $initials, member: $member) {
      id
      name
      description
      initials
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String, $description: String) {
    updateProject(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`
export const ADD_PROJECT_MEMBER = gql`
  mutation AddProjectMember($id: ID!, $userId: ID) {
    addProjectMember(id: $id, userId: $userId) {
      id
      name
    }
  }
`

export const CREATE_SPRINT = gql`
  mutation CreateSprint($name: String!, $projectId: ID!) {
    createSprint(name: $name, projectId: $projectId) {
      id
      name
      status
    }
  }
`
export const UPDATE_SPRINT = gql`
  mutation UpdateSprint($sprintId: ID!, $name: String, $status: String, $startDate: String, $endDate: String) {
    updateSprint(sprintId: $sprintId, name: $name, status: $status, startDate: $startDate, endDate: $endDate) {
      id
      name
    }
  }
`
export const COMPLETE_SPRINT = gql`
  mutation CompleteSprint($sprintId: ID!, $newSprintId: ID, $taskIds: [ID]) {
    completeSprint(sprintId: $sprintId, newSprintId: $newSprintId, taskIds: $taskIds)
  }
`

export const UPDATE_SPRINT_TASK = gql`
  mutation UpdateSprintTask($sprintId: ID, $newSprintId: ID, $taskId: ID) {
    updateSprintTask(sprintId: $sprintId, newSprintId: $newSprintId, taskId: $taskId)
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $projectId: ID!, $priority: String, $reporter: ID!, $ticketType:String!, $sprintId: ID) {
    createTask(title: $title, description: $description, projectId: $projectId, priority: $priority, reporter: $reporter, ticketType: $ticketType, sprintId: $sprintId) {
      id
      title
      description
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $priority: String, $points: Int, $assignee: ID) {
    updateTask(id: $id, title: $title, description: $description, priority: $priority, points: $points, assignee: $assignee) {
      id
      title
      description
    }
  }
`
export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($taskId: ID!, $status: String) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      id
      title
      description
    }
  }
`
export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $task: ID!, $author: ID!) {
    createComment(content: $content, task: $task, author: $author) {
      id
      content
    }
  }
`
export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`

// mutation DeleteProject($id: ID!) {
//   deleteProject(id: $id) {
//     id
//   }
// }

// mutation DeleteTask($id: ID!) {
//   deleteTask(id: $id) {
//     id
//   }
// }

// mutation MoveTask($boardId: ID!, $taskId: ID!, $fromColumn: Int!, $toColumn: Int!) {
//   moveTask(boardId: $boardId, taskId: $taskId, fromColumn: $fromColumn, toColumn: $toColumn) {
//     id
//     columns {
//       toDo {
//         id
//         title
//       }
//       inProgress {
//         id
//         title
//       }
//       review {
//         id
//         title
//       }
//       done {
//         id
//         title
//       }
//     }
//   }
// }





// mutation UpdateComment($id: ID!, $content: String!) {
//   updateComment(id: $id, content: $content) {
//     id
//     content
//   }
// }

// mutation CreateNotification($message: String!, $userId: ID!) {
//   createNotification(message: $message, userId: $userId) {
//     id
//     message
//     user {
//       id
//       fullName
//     }
//   }
// }

// mutation UpdateNotification($id: ID!, $isRead: Boolean!) {
//   updateNotification(id: $id, isRead: $isRead) {
//     id
//     isRead
//   }
// }

// mutation DeleteNotification($id: ID!) {
//   deleteNotification(id: $id) {
//     id
//   }
// }






// mutation DeleteSprint($sprintId: ID!) {
//   deleteSprint(sprintId: $sprintId)
// }


// mutation CreateBoard($name: String!, $projectId: ID!) {
//   createBoard(name: $name, projectId: $projectId) {
//     id
//     name
//     project {
//       id
//       name
//     }
//     columns {
//       toDo {
//         id
//         title
//       }
//       inProgress {
//         id
//         title
//       }
//       review {
//         id
//         title
//       }
//       done {
//         id
//         title
//       }
//     }
//   }
// }

// mutation UpdateBoard($boardId: ID!, $name: String!) {
//   updateBoard(boardId: $boardId, name: $name) {
//     id
//     name
//   }
// }

// mutation DeleteBoard($boardId: ID!) {
//   deleteBoard(boardId: $boardId)
// }



