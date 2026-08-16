
const ServiceDHT11 = async (data,io) => {
    console.log("Data received from DHT11:", data);

    io.emit("dht11-data", data);
};

export default { ServiceDHT11 };