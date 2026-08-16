const ServicePhotoregister = async (data,io) => {
  console.log("Data received from Photoregister:", data);
  io.emit("photoregister-data", data);
};

export default { ServicePhotoregister };