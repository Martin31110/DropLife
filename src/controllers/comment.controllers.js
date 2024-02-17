// comment.controllers.js

import Comment from '../models/comments.model.js';
import Forum from '../models/forum.model.js';

// Controller to create a new comment
export const createComment = async (req, res) => {
    try {
        const { userId, userProfileImage, username, content, forumId } = req.body;

        // Verify if the forum exists
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found.' });
        }

        // Create a new comment associated with the forum
        const newComment = new Comment({
            user: userId,
            userProfileImage,
            username,
            content,
            forum: forumId // Assign the forum ID to the comment
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find and delete the comment by its ID
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to edit a comment
export const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        // Find and update the comment by its ID
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByForumId = async (req, res) => {
    try {
        const { forumId } = req.params;

        const comments = await Comment.find({ forum: forumId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};