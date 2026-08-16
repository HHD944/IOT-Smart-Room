import client from "../../mqtt/client.js";

const topic = "23127352/device/command/light";
const ServiceLight = async (req, res) => {
  const messageJson = req.body;

  client.publish(topic, JSON.stringify(messageJson), (error) => {
    if (error) {
      console.error("Lỗi khi publish dữ liệu:", error);
      return;
    }

    console.log("Đã publish:", messageJson);
  });   

  return { message: "success" };
};

export default { ServiceLight };
