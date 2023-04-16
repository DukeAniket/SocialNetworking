import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter First Name"],
    },
    middleName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, "Please enter Email ID"],
        unique: [true, "Email Already Exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [6, "Passwords must be atleast 6 characters"],
    },
    // dob: {
    //     type: Date,
    //     required: [true, "Please enter your Date of Birth"],
    // },
    bio: {
        type: String,
        required: [true, "Please Enter Bio"],
    },

    avatar: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostMessage",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

const User = mongoose.model('User', userSchema);
export default User