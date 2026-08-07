import client from "../../mqtt/client.js";

const topic = "device/command";

class DeviceService {
    async Motor(req, res) {
    
    const message = req.body.action; 

    client.on("connect", () => {
      console.log("Đã kết nối thành công tới MQTT Broker!");
      // Subscribe topic
      client.publish(topic, message, (error) => {
        if (error) {
          console.error("Lỗi khi publish dữ liệu:", error);
        }
      });
    }); 
    return { message: message };
    }


    async Led(req, res) {
   
    const message = req.body.action; 
    
    client.on("connect", () => {
      console.log("Đã kết nối thành công tới MQTT Broker!");
      // Subscribe topic
      client.publish(topic, message, (error) => {
        if (error) {
          console.error("Lỗi khi publish dữ liệu:", error);
        }
      });
    }); 
    return { message: message };
    }

}

export default DeviceService;