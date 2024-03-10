
// Import express and the comment controllers
import express from 'express';
import { 
    getCommentsByForumId, 
    createComment, 
    editComment, 
    deleteComment } 
from '../controllers/comment.controllers.js';

// Create a new router
const router = express.Router();

// Route to get all comments for a specific forum
router.get('/comments/:forumId', getCommentsByForumId);

// Route to create a new comment
router.post('/comments', createComment);

// Route to update an existing comment
router.put('/comments/:commentId', editComment);

// Route to delete a comment
router.delete('/comments/:commentId', deleteComment);

export default router;