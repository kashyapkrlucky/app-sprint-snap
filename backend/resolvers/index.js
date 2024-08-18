const userResolvers = require('./user');
const projectResolvers = require('./project');


const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...projectResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...projectResolvers.Mutation,
    }
};

module.exports = resolvers;
