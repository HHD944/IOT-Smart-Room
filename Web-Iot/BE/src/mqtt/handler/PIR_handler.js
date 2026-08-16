import ServicePIR from "../../services/devices/PIR.service.js";

const handlePIRDataMessage = async (message,io) => {
  const data = JSON.parse(message);
  console.log("Data received from PIR:", data);
  await ServicePIR.ServicePIR(data, io);
};

export default handlePIRDataMessage;