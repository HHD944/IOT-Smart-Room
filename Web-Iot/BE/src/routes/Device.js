import express from "express";
const router = express.Router();

import deviceController from "../controllers/DeviceController.js";

// Định nghĩa các tuyến đường (Endpoints)
router.post("/fan", deviceController.Motor);
router.post("/light", deviceController.Led);

router.post("/ldr", deviceController.LDR);
router.post("/dht11", deviceController.DHT11);
router.post("/pir", deviceController.PIR);

export default router;
