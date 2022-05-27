import mongoose from "mongoose";
import shallowEqual from "../middleware/shallowEqual.js";
import PostMessage from "../models/postMessage.js";

export const getComments = async (req, res) => {
    try {
        const post = await PostMessage.findById(req.query.id);

        if (!post) {
            res.status(404).json({message: "Posts Not Found"});
        }
        
        const postComments = post.comments;
        res.status(200).json(postComments);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const addComment = async (req, res) => {
    const comment = req.body;
    comment.user = req.user.firstName;
    comment.user_email = req.user.email;
    try {
        const post = await PostMessage.findById(req.query.id);

        if (!post) {
            res.status(404).json({message: "Posts Not Found"});
        }

        post.comments.push(comment);
        post.save();
        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

export const deleteComment = async (req, res) => {
    const comment_id = req.body.comment_id;
    const post_id = req.body.post_id;
    
    try {
        const post = await PostMessage.findById(post_id);
        
        var dc = -1;
        var objID = mongoose.Types.ObjectId(comment_id.toString());
        for (var i = 0; i < post.comments.length; i++ ) {
            if (shallowEqual(post.comments[i]._id, objID)) {
                if(post.comments[i].user_email!==req.user.email) {
                    return res.status(403).json({success: false, message: "Action Forbidden"})
                }
                dc = i
                break;
            }
        }
        if (dc== -1) {
            return res.status(404).json({success: false, message:"Comment Not Found!"})
        }
        const deletedComment = post.comments.splice(dc, 1);
        post.save();
        res.status(200).json({success: true, message: "Comment Deleted Successfully!", deletedComment: deletedComment});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}