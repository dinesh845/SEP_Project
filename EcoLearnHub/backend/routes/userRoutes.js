import express from "express";
import { registerUser, loginUser, updateStats } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update", updateStats);

export default router;
