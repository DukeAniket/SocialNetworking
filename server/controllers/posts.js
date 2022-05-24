import PostMessage from "../models/postMessage.js";
import url from "url";

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
        var q = url.parse(req.url, true).query;
        const postMessage = await PostMessage.findById(q.id);
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