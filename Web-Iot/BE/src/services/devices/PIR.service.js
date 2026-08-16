const ServicePIR = async (data,io) => {
  console.log("Data received from PIR:", data);
  io.emit("pir-data", data);
};

export default { ServicePIR };