import express from "express";
import { getUsers, editProfile } from "../controllers/user.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
import { upload } from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", protectedRoute, getUsers);
router.post("/edit/:id", protectedRoute, upload.single("file"), editProfile);

export default router;
