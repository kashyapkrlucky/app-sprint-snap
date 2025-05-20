const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

const userController = {
  getUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  },

  getProfileByUserId: async (userId) => {
    const profile = await Profile.findOne({ user: userId }).populate("user");
    if (!profile) throw new Error("Profile not found");
    return profile;
  },

  searchUsersByName: async (text) => {
    return await User.find({ fullName: new RegExp(text, "i") });
  },

  signUpUser: async ({ firstName, lastName, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const profile = new Profile({ user: user._id });
    await profile.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });

    return { token, user, profile };
  },

  signInUser: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    const profile = await Profile.findOne({ user: user._id });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });

    return { token, user, profile };
  },

  updateUserInfo: async (userId, { avatar, firstName, lastName }) => {
    const updates = {};
    if (avatar) updates.avatar = avatar;
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) throw new Error("User not found");

    return updatedUser;
  },

  updateProfile: async (
    userId,
    { firstName, lastName, city, country, tagline, phone, notifications, theme }
  ) => {
    const userUpdates = {};
    if (firstName) userUpdates.firstName = firstName;
    if (lastName) userUpdates.lastName = lastName;
    if (firstName || lastName) {
      userUpdates.fullName = `${firstName || ""} ${lastName || ""}`.trim();
    }

    await User.findByIdAndUpdate(userId, userUpdates, { new: true });

    const profile = await Profile.findOne({ user: userId });
    if (!profile) throw new Error("Profile not found");

    const updates = {};
    if (city) updates.city = city;
    if (country) updates.country = country;
    if (tagline) updates.tagline = tagline;
    if (phone) updates.phone = phone;
    if (typeof notifications === "boolean")
      updates.notifications = notifications;
    if (theme) updates.theme = theme;

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile._id,
      updates,
      { new: true }
    ).populate("user");
    return updatedProfile;
  },

  deleteUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    await Profile.findOneAndDelete({ user: id });
    await User.findByIdAndDelete(id);

    return true;
  },
};

module.exports = userController;
