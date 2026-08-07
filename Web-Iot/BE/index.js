import express from "express";
import cors from "cors";

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());

//---------

import loginRoutes from "./src/routes/Login.js";
app.use("/api/login", loginRoutes);

import registerRoutes from "./src/routes/Register.js";
app.use("/api/register", registerRoutes);

import deviceRoutes from "./src/routes/Device.js";
app.use("/api/device", deviceRoutes);

//---------

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});