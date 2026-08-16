
let sensorData = {
  temperature: null,
  humidity: null,
};

const handleCloudSensorData = (topic, message) => {
  if (topic !== "23127468/sensor/temp") {
    return;
  }

  try {
    const data = JSON.parse(message.toString());

    console.log("Cloud nhận DHT11:", data);

    sensorData = {
      temperature: Number(data.temp),
      humidity: Number(data.humid),
    };
  } catch (error) {
    console.error("Lỗi xử lý dữ liệu Cloud:", error);
  }
};

export const getSensorData = () => {
  return sensorData;
};

export default handleCloudSensorData;