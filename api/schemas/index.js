// const { gql } = require("apollo-server-express");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const scalarTypeDefs = require("./scalers");
const userTypeDefs = require("./user");
const projectTypeDefs = require("./project");

const typeDefs = mergeTypeDefs([scalarTypeDefs, projectTypeDefs, userTypeDefs]);

module.exports = typeDefs;
