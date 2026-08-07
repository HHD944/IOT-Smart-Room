import { Service } from "../device/services/PIR.service.js";

const handlePIRDataMessage = async (message) => {
  const data = JSON.parse(message);

  await Service.ServicePIR(data);
};

export default handlePIRDataMessage;