require('dotenv').config(); // Load environment variables
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || '';

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findById(decoded.userId);
                return { user };
            } catch (err) {
                throw new Error('Not authenticated');
            }
        }
        return {};
    }
});

// Apply Apollo middleware to Express app
server.start().then(() => {
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
