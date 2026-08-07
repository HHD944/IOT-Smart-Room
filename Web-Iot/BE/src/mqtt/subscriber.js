import client from "./client.js";
import { handlePIRDataMessage } from "./handler/PIR_handler.js";
import { handleTempDataMessage } from "./handler/DHT11_handler.js";
import { handlePhotoresistorDataMessage } from "./handler/photorresistor_handler.js";

client.on("connect", () => {
  console.log("Đã kết nối thành công tới MQTT Broker!");
  // Subscribe topic
  client.subscribe([
    "sensor/pir",
    "sensor/temp",
    "sensor/photo"
  ], (err) => {
    if (!err) console.log("Đã subscribe tới các topic");
  });
});

client.on("message", (topic, message) => {
  if (topic === "sensor/pir") {
    handlePIRDataMessage(message);
  }
  else if (topic === "sensor/temp") {
    handleTempDataMessage(message);
  }
  else if (topic === "sensor/photo") {
    handlePhotoresistorDataMessage(message);
  }
  
});

client.on("error", (err) => {
  console.error("Lỗi kết nối MQTT:", err);
});
