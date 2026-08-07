import { Service } from "../services/devices/Photo.service.js";

const handlePhotoregisterDataMessage = async (message) => {
  const data = JSON.parse(message);

  await Service.ServicePhotoregister(data);
};

export default handlePhotoregisterDataMessage;