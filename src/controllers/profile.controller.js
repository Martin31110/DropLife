// controllers/profile.controller.js

import User from '../models/user.model.js';

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        // Get the current user from the authentication middleware
        const user = req.user;
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile (including profile picture)
export const updateUserProfile = async (req, res) => {
    try {
        // Get the current user from the authentication middleware
        const userId = req.user._id;
        const updatedFields = req.body;

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change user password
export const changePassword = async (req, res) => {
    try {
        // Get the current user from the authentication middleware
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const user = await User.findById(userId);
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(400).json({ message: 'Invalid current password.' });
        }

        // Change password
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const saveForumAsFavorite = async (req, res) => {
    try {
        const { forumId } = req.params;
        const { userId } = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verificar si el foro ya está en favoritos del usuario
        if (user.favoriteForums.includes(forumId)) {
            return res.status(400).json({ message: 'Forum already saved as favorite.' });
        }

        // Guardar el foro como favorito
        user.favoriteForums.push(forumId);
        await user.save();

        res.status(200).json({ message: 'Forum saved as favorite successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};