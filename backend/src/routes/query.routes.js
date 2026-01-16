 import express from "express";
import {
  getProjectsBySkill,
  getTopSkills,
  search
} from "../controllers/query.controller.js";

const router = express.Router();

router.get("/projects", getProjectsBySkill);
router.get("/skills/top", getTopSkills);
router.get("/search", search);

export default router;
