import { Service } from "../services/devices/DHT11.service.js";

const handleDHT11DataMessage = async (message) => {
  const data = JSON.parse(message);

  await Service.ServiceDHT11(data);
};

export default handleDHT11DataMessage;