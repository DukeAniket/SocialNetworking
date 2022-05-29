import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: String,
    user_email: String,
    comment: {
        type: String,
        required: true,
    },
    commentLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    createdTime: {
        type: Date,
        default: Date.now,
    }
});

const PostComment = mongoose.model('PostComment', commentSchema);
export default PostComment;