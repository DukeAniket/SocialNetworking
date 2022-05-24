import PostComment from "../models/postComment.js";
import PostMessage from "../models/postMessage.js";
import url from "url";

export const getComments = async (req, res) => {
    try {
        var q = url.parse(req.url, true).query;
        const post = await PostMessage.findById(q.id);

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
    var q = url.parse(req.url, true).query;
    const newComment = new PostComment(comment);
    try {
        const post = await PostMessage.findById(q.id);

        if (!post) {
            res.status(404).json({message: "Posts Not Found"});
        }

        console.log(req.body);
        post.comments.push(comment);
        post.save();
        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}