import DeviceService from "../services/devices/DeviceService.js";

const Motor = async (req, res) => {
  try {
    const result = await DeviceService.Motor(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Led = async (req, res) => {
  try {
    const result = await DeviceService.Led(req, res);
    res.status(200).json({ success: true, data: result });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
};

export default {
  Motor,
  Led,
};