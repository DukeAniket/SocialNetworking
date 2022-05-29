import express from "express";
import postRoute from "./post.js";
import { getPosts, createPost, getFeed } from "../controllers/posts.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get('/', authenticateToken, getPosts);
router.post('/', authenticateToken, createPost);
router.get('/feed', authenticateToken, getFeed);

router.use('/post', authenticateToken, postRoute);

export default router;