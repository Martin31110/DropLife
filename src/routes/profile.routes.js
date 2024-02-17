import express from 'express';
import { 
    getUserProfile, 
    updateUserProfile, 
    changePassword,
    saveForumAsFavorite } from '../controllers/profile.controller.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', getUserProfile);

// Route to update user profile
router.put('/profile', updateUserProfile);

// Route to change user password
router.put('/profile/change-password', changePassword);

router.post('/profile/favorite-forums/:forumId', saveForumAsFavorite);

export default router;