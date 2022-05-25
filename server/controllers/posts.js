import PostMessage from "../models/postMessage.js";

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
        const deletedPost = await PostMessage.findByIdAndDelete(post_id);
        if (deletedPost == null) {
            return res.status(404).json({success: false, message: "Post Not Found!"})
        }
        res.status(200).json({success: true, message: "Post Deleted Successfully!"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}