import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const client = mqtt.connect(process.env.TLS_HIVEMQ_URL,
  {
    username: process.env.USERNAME_HIVEMQ,
    password: process.env.PASSWORD_HIVEMQ,
    clientId: "nodejs_backend_" + Math.random().toString(16).slice(2),
  },
);

export default client;