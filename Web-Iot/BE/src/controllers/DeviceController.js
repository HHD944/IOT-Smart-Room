import ServiceFan from "../services/devices/Fan.service.js";
import ServiceLight from "../services/devices/Light.service.js";
import ServiceDHT11 from "../services/devices/DHT11.service.js";
import ServicePIR from "../services/devices/PIR.service.js";
import ServicePhoto from "../services/devices/Photo.service.js";

const Motor = async (req, res) => {
  try {
    const result = await ServiceFan.ServiceFan(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Led = async (req, res) => {
  try {
    const result = await ServiceLight.ServiceLight(req, res);
    res.status(200).json({ success: true, data: result });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
};

const LDR = async (req, res) => {
  try {
    const result = await ServicePhoto.ServicePhotoregister(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const DHT11 = async (req, res) => {
  try {
    const result = await ServiceDHT11.ServiceDHT11(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const PIR = async (req, res) => {
  try {
    const result = await ServicePIR.ServicePIR(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  Motor,
  Led,
  LDR,
  DHT11,
  PIR,
};