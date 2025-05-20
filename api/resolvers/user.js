const userController = require("../controllers/user");

const userResolvers = {
  Query: {
    getUser: (_, { id }) => userController.getUserById(id),
    getProfile: (_, { userId }) => userController.getProfileByUserId(userId),
    searchUsers: (_, { text }) => userController.searchUsersByName(text),
  },
  Mutation: {
    signUp: (_, args) => userController.signUpUser(args),
    signIn: (_, args) => userController.signInUser(args),
    updateUserInfo: async (_, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return userController.updateUserInfo(user.id, args);
    },
    updateProfile: async (_, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return userController.updateProfile(user.id, args);
    },
    deleteUser: (_, { id }) => userController.deleteUserById(id),
  },
};

module.exports = userResolvers;
