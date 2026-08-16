
import sendPushsaferAlert, {
  shouldSendHeatAlert,
} from "../notifications/Pushsafer.service.js";

const ServiceDHT11 = async (data, io) => {
  console.log("Data received from DHT11:", data);

  io.emit("dht11-data", data);

  const temperature = Number(data.temp);

  if (!Number.isFinite(temperature)) {
    return;
  }

  if (shouldSendHeatAlert(temperature)) {
    await sendPushsaferAlert(temperature);
  }
};

export default { ServiceDHT11 };