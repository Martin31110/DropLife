// import mongoose from "mongoose";

// const roleChangeRequestSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     userProfileImage: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     requestDate: {
//         type: Date,
//         default: Date.now
//     },
//     communityCapacity: {
//         type: Number,
//         required: true,
//         min: 10
//     },
//     reasonDescription: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'approved', 'rejected'],
//         default: 'pending'
//     }
// });

// export default mongoose.model('RoleChangeRequest', roleChangeRequestSchema);
