import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    creator_email: {
        type: String,
        required: true
    },
    tags: [String],
    selectedFile: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostComment",
        }
    ],
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;