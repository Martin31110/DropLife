import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String, 
        default: "default_profile_image.jpg" 
    },
    points:{
        type: Number,
        required: true,
        trim: true
    },
    role:{
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);