import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: [
        {
            user: String,
            user_email: String,
            comment: {
                type: String,
                required: true,
            },
            commentLike: {
                type: Number,
                default: 0
            },
            createdTime: {
                type: Date,
                default: Date.now,
            }
        }
    ],
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;