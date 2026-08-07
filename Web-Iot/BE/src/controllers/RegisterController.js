// user.controller.js
import RegisterService from "../services/RegisterService.js";

const createUser = async (req, res) => {
  try {
    const user = await RegisterService.createUser(req, res);
    res.status(200).json({ success: true});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createUser,
};