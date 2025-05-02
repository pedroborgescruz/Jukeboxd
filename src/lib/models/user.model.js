import mongoose from "mongoose";

// Model what an user is under the hood for the application. 
  
const userSchema = new mongoose.Schema(
    { 
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }, 
        username: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
        }, 
        followers: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            default: [],
        }, 
        following: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            default: [],
        }, 
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;