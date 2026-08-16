import ServiceDHT11 from "../../services/devices/DHT11.service.js";

const handleDHT11DataMessage = async (message,io) => {
  const data = JSON.parse(message);

  await ServiceDHT11.ServiceDHT11(data, io);
};

export default handleDHT11DataMessage;
