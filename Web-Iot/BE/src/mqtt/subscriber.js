import client from "./client.js";

import handlePIRDataMessage from "./handler/PIR_handler.js";
import handleTempDataMessage from "./handler/DHT11_handler.js";
import handlePhotoregisterDataMessage from "./handler/photoregister_handler.js";

const startSubscriber = (io) => {
  client.on("connect", () => {
    console.log("Đã kết nối thành công tới MQTT Broker!");

    client.subscribe(
      ["23127349/sensor/pir", "23127468/sensor/temp", "23127468/sensor/photo"],
      (err) => {
        if (err) {
          console.error("Subscribe lỗi:", err);
          return;
        }

        console.log("Đã subscribe tới các topic");
      },
    );
  });

  client.on("message", (topic, message) => {
    if (topic === "23127349/sensor/pir") {
      handlePIRDataMessage(message, io);
    } else if (topic === "23127468/sensor/temp") {
      handleTempDataMessage(message, io);     
    } else if (topic === "23127468/sensor/photo") {
      handlePhotoregisterDataMessage(message, io);
    }
  });

  client.on("error", (err) => {
    console.error("Lỗi kết nối MQTT:", err);
  });
};

export default startSubscriber ;