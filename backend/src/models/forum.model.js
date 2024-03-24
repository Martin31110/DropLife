import mongoose from "mongoose";


const forumSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        required: true
    },
    campaignImage: {
        type: String,
        required: true
    },
    campaignDescription: {
        type: String,
        required: true
    },
    favorite: { type: Boolean, default: false },
    reported: { type: Boolean, default: false }
});

export default mongoose.model('Forum', forumSchema);