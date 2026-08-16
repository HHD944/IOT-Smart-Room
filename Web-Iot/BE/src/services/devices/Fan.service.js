import client from "../../mqtt/client.js";

const topic = "23127349/device/command/fan";
const ServiceFan = async (req, res) => {
  const messageJson = req.body;

  client.publish(topic, JSON.stringify(messageJson), (error) => {
    if (error) {
      console.error("Lỗi khi publish dữ liệu:", error);
      return;
    }

    console.log("Đã publish fan:", messageJson);
  });
  return { message: "success" };
};

export default { ServiceFan };
