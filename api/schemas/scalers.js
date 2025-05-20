const { gql } = require("apollo-server-express");

const scalarTypeDefs = gql`
  scalar DateTime
`;

module.exports = scalarTypeDefs;
