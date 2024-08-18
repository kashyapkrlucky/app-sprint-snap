const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String
    email: String!
    isActive: Boolean!
    avatar: String
    createdAt: String
    updatedAt: String
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
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUser(id: ID!): User
    getProfile(userId: ID!): Profile
  }

  type AuthPayload {
    token: String
    user: User
    profile: Profile
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    updatePicture(
      avatar: String
    ): User
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

module.exports = typeDefs;
