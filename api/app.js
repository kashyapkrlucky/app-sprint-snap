// app.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const User = require("./models/User");

const app = express();

const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

      if (!token) return {};

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        return { user };
      } catch {
        throw new Error("Not authenticated");
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
};

module.exports = { createApolloServer, app };
