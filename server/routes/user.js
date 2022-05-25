import express from "express";
import { createUser, getProfile, login } from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/profile", getProfile);

export default router;