import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: String,
    comment: String,
    commentLike: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: Date,
        default: new Date()
    },
});

const PostComment = mongoose.model('PostComment', commentSchema);
export default PostComment;