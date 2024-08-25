const User = require('../models/User');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

const userResolvers = {
    Query: {
        // Get user by ID
        getUser: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (error) {
                throw new Error('Error fetching user');
            }
        },
        getProfile: async (_, { userId }) => {
            try {
                const profile = await Profile.findOne({ user: userId }).populate('user').populate('tasks').populate('projects');
                if (!profile) {
                    throw new Error('Profile not found');
                }
                return profile;
            } catch (error) {
                throw new Error('Error fetching profile');
            }
        },
        searchUsers: async (_, { text }) => {
            try {
                const docs = await User.find({ fullName: new RegExp(text, 'i') })
                return docs;
            } catch (error) {
                throw new Error('Error fetching profile');
            }
        }
    },
    Mutation: {
        signUp: async (_, { firstName, lastName, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const user = new User({
                firstName,
                lastName,
                email,
                password
            });

            await user.save();

            // Create a profile for the new user
            const profileData = new Profile({
                user: user._id
            });

            const profile = await profileData.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '23h' });

            return { token, user, profile };
        },
        signIn: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                throw new Error('Invalid email or password');
            }

            const profile = await Profile.findOne({ user: user._id });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '23h' });

            return { token, user, profile };
        },
        updateUserInfo: async (_, { avatar, firstName, lastName }, { user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }

            const updates = {};
            if (avatar) updates.avatar = avatar;
            if (firstName) userUpdates.firstName = firstName;
            if (lastName) userUpdates.lastName = lastName;

            const item = await User.findByIdAndUpdate(user.id, updates, { new: true });

            return item;
        },
        updateProfile: async (_, { firstName, lastName, city, country, tagline, phone, notifications, theme }, { user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }

            const userUpdates = {};
            if (firstName) userUpdates.firstName = firstName;
            if (lastName) userUpdates.lastName = lastName;
            if (firstName || lastName) {
                userUpdates.fullName = `${firstName} ${lastName}`;
            }

            await User.findByIdAndUpdate(user.id, userUpdates, { new: true });

            const profile = await Profile.findOne({ user: user.id });

            if (!profile) {
                throw new Error('Profile not found');
            }

            const updates = {};
            if (city) updates.city = city;
            if (country) updates.country = country;
            if (tagline) updates.tagline = tagline;
            if (phone) updates.phone = phone;
            if (notifications !== undefined) updates.notifications = notifications;
            if (theme) updates.theme = theme;

            const updatedProfile = await Profile.findByIdAndUpdate(profile.id, updates, { new: true }).populate('user');

            return updatedProfile;
        },
        deleteUser: async (_, { id }) => {
            try {
                // Find the user and profile
                const user = await User.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }

                // Delete the user's profile
                await Profile.findOneAndDelete({ user: id });

                // Delete the user
                await User.findByIdAndDelete(id);

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    }
};

module.exports = userResolvers;
