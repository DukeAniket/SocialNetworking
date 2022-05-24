import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: String,
    lastName: String,
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },

    profilepic: String,
    posts: [
        {
            post_id: String,
        }
    ],
    followers: [
        {
            follower_id: String,
        }
    ],
    following: [
        {
            following_id: String,
        }
    ],
});

const User = mongoose.model('User', userSchema);
export default User