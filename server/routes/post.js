import express from "express";
import commentRoutes from "./comments.js";
import { getPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPost);
router.use('/comments', commentRoutes);

export default router;