import mongoose from "mongoose";
import shallowEqual from "../middleware/shallowEqual.js";
import PostComment from "../models/postComment.js";
import PostMessage from "../models/postMessage.js";

export const getComments = async (req, res) => {
    try {
        const post = await PostMessage.findById(req.query.id);

        if (!post) {
            res.status(404).json({message: "Posts Not Found"});
        }
        
        const postComments = await PostComment.findById(post.comments);

        res.status(200).json(postComments);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const addComment = async (req, res) => {
    const comment = req.body;
    comment.user = req.user.firstName;
    comment.user_email = req.user.email;
    const newComment = new PostComment(comment);
    try {
        const post = await PostMessage.findById(req.query.id);

        if (!post) {
            res.status(404).json({message: "Posts Not Found"});
        }

        post.comments.push(newComment);
        post.save();
        res.status(201).json({success: true, message: "Comment Added!"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

export const deleteComment = async (req, res) => {
    const comment_id = req.body.comment_id;
    const post_id = req.body.post_id;
    
    try {
        const post = await PostMessage.findById(post_id);
        const comment = await PostComment.findById(comment_id);

        if(comment.user_email!==req.user.email) {
            return res.status(403).json({success: false, message: "Action Forbidden"})
        }

        post.comments.pull(comment);
        await PostComment.deleteOne(comment);
        
        post.save();
        res.status(200).json({success: true, message: "Comment Deleted Successfully!"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const likeComment = async (req, res) => {
    try {
        const liker = await User.find({email: req.user.email});
        const liked = await PostComment.findById(req.body.comment_id);
        liked.likes.push(liker);
        liked.save();
        res.status(200).json({success: true, message: "Comment Liked!"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const unlikeComment = async (req, res) => {
    try {
        const liker = await User.find({email: req.user.email});
        const liked = await PostComment.findById(req.body.comment_id);
        liked.likes.pull(liker);
        liked.save();
        res.status(200).json({success: true, message: "Comment Unliked!"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}