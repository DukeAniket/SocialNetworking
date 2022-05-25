import express from "express";
import { createUser, login } from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;