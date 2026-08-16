import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import  startSubscriber  from "./src/mqtt/subscriber.js";

import loginRoutes from "./src/routes/Login.js";
import registerRoutes from "./src/routes/Register.js";
import deviceRoutes from "./src/routes/Device.js";

import startCloudSync from "./src/cloud/cloudSync.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/device", deviceRoutes);

// Truyền io vào MQTT subscriber
startSubscriber(io);

startCloudSync();

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});