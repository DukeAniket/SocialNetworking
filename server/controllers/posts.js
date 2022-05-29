import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const postMessage = await PostMessage.findById(req.query.id);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    newPost.creator_email = req.user.email;
    if (req.user.lastName) {
        newPost.creator = `${req.user.firstName} ${req.user.lastName}`;
    }
    else {
        newPost.creator = req.user.firstName;
    }

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const post_id = req.query.post_id;
    try {
        const deletingPost = await PostMessage.findById(post_id);
        if (deletingPost.creator_email !== req.user.email) {
            return res.status(403).json({success: false, message: "Action Forbidden!"});
        }
        const deletedPost = await PostMessage.findByIdAndDelete(post_id);
        if (deletedPost == null) {
            return res.status(404).json({success: false, message: "Post Not Found!"})
        }
        res.status(200).json({success: true, message: "Post Deleted Successfully!"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const getFeed = async (req, res) => {
    try {
        const following = [];
        const user_following = await User.find({email: req.user.email}).following;
        console.log(user_following);
        for (var i = 0; i < user_following.length; i++) {
            following.push(user_following[i].email);
        }
        following.push(req.user.email);
        const postMessages = await PostMessage.find({creator_email: {$in: following}}).sort({createdAt: -1 });
        res.json(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}

export const likePost = async (req, res) => {
    try {
        const liker = await User.find({email: req.user.email});
        const liked = await PostMessage.findById(req.body.post_id);
        liked.likes.push(liker);
        liked.save();
        res.status(200).json({success: true, message: "Post Liked!"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const unlikePost = async (req, res) => {
    try {
        const liker = await User.find({email: req.user.email});
        const liked = await PostMessage.findById(req.body.post_id);
        liked.likes.pull(liker);
        liked.save();
        res.status(200).json({success: true, message: "Post Unliked!"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}