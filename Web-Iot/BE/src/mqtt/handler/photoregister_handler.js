import ServicePhotoregister from "../../services/devices/Photo.service.js";

const handlePhotoregisterDataMessage = async (message,io) => {
  const data = JSON.parse(message);

  await ServicePhotoregister.ServicePhotoregister(data, io);
};

export default handlePhotoregisterDataMessage;