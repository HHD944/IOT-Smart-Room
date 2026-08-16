import { getSensorData } from "./cloudHandler.js";

const sendToThingSpeak = async () => {
  console.log("Gửi dữ liệu DHT11 lên ThingSpeak...");
  try {
    const { temperature, humidity } = getSensorData();

    if (temperature === null || humidity === null) {
      console.log("Chưa có dữ liệu DHT11");
      return;
    }

    const apiKey = process.env.THINGSPEAK_WRITE_API_KEY;

    const url =
      `https://api.thingspeak.com/update?api_key=${apiKey}` +
      `&field1=${temperature}` +
      `&field2=${humidity}`;

    const response = await fetch(url);
    const result = await response.text();

    console.log(
      `ThingSpeak: temperature=${temperature}, humidity=${humidity}, result=${result}`,
    );
  } catch (error) {
    console.error("Lỗi gửi ThingSpeak:", error);
  }
};

export default sendToThingSpeak;
