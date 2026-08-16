import sendToThingSpeak from "./thingspeak.js";

const startCloudSync = () => {
  setInterval(() => {
    sendToThingSpeak();
  }, 15000);

  console.log("Cloud Sync đã khởi động");
};

export default startCloudSync;
