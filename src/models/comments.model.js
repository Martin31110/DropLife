import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userProfileImage: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    forumID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum', // Refiere al modelo de foro
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;