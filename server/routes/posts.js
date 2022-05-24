import express from "express";
import postRoute from "./post.js";
import { getPosts, createPost } from "../controllers/posts.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get('/', authenticateToken, getPosts);
router.post('/', authenticateToken, createPost);

router.use('/post', authenticateToken, postRoute);

export default router;