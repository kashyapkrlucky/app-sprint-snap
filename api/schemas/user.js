const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String
    email: String!
    isActive: Boolean!
    avatar: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Profile {
    id: ID!
    user: User!
    city: String
    country: String
    tagline: String
    phone: String
    notifications: Boolean
    theme: String
    followers: [User]
    following: [User]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    getUser(id: ID!): User
    getProfile(userId: ID!): Profile
    searchUsers(text: String): [User]
  }

  type AuthPayload {
    token: String
    user: User
    profile: Profile
  }

  type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    updateUserInfo(firstName: String, lastName: String, avatar: String): User
    updateProfile(
      firstName: String
      lastName: String
      city: String
      country: String
      tagline: String
      phone: String
      notifications: Boolean
      theme: String
    ): Profile
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;
