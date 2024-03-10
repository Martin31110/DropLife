import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abrahammonroy:n5L5be7hYInkK5Sq@cluster0.3agv59b.mongodb.net/');
        console.log(">>> DB is conected");
    } catch (error) {
        console.log(error);
    }
};