const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');
const projectTypeDefs = require('./project');

// You can combine them using the spread operator in gql
const typeDefs = gql`
  ${userTypeDefs}
  ${projectTypeDefs}
`;

module.exports = typeDefs;
