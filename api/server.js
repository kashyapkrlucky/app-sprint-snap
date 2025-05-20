// index.js - the app entry point
require("dotenv").config();

const { createApolloServer, app } = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    await createApolloServer();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
