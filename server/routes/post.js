import express from "express";
import commentRoutes from "./comments.js";
import { deletePost, getPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPost);
router.delete('/', deletePost);
router.use('/comments', commentRoutes);

export default router;