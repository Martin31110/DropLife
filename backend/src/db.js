import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abrahamonroy77:21R4lzjHzVbWaQwb@cluster0.8sk1a7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(">>> DB is conected");
    } catch (error) {
        console.log(error);
    }
};