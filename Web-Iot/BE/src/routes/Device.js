import express from "express";
const router = express.Router();

import deviceController from "../controllers/DeviceController.js";

// Định nghĩa các tuyến đường (Endpoints)
router.post("/motor", deviceController.Motor); 
router.post("/led", deviceController.Led);

export default router;