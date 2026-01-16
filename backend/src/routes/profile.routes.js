import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/profile", getProfile);
router.post("/profile", createProfile);
router.put("/profile", updateProfile);

export default router;
