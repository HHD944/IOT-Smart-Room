import express from "express";
const router = express.Router();

import userController from "../controllers/LoginController.js";

// Định nghĩa các tuyến đường (Endpoints)
router.post("/", userController.Login); 
router.post("/forgot-password", userController.ForgetPassword);
router.post("/reset-password", userController.ResetPassword);

export default router;