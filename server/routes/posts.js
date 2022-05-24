import express from "express";
import postRoute from "./post.js";
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

router.use('/post', postRoute);

export default router;