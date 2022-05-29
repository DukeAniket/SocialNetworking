import express from "express";
import { createUser, follow, getFollowers, getFollowing, getProfile, login, unfollow } from "../controllers/user.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/profile", authenticateToken ,getProfile);
router.get("/following", authenticateToken, getFollowing);
router.get("/followers", authenticateToken, getFollowers);
router.post('/follow', authenticateToken, follow);
router.post('/unfollow', authenticateToken, unfollow);

export default router;