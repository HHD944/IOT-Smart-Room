import express from "express";
const router = express.Router();

import userController from "../controllers/RegisterController.js";

// Định nghĩa các tuyến đường (Endpoints)
router.post("/", userController.createUser); // Tạo mới

export default router;