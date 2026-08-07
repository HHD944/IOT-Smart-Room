// user.controller.js
import LoginService from "../services/LoginService.js";

const Login = async (req, res) => {
  try {
    const token = await LoginService.Login(req, res);
    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const ForgetPassword = async (req, res) => {
  try {
    await LoginService.ForgetPassword_SendOTP(req, res);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const ResetPassword = async (req, res) => {
  try {
    await LoginService.ForgetPassword_NewPassword(req, res);
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  Login,
  ForgetPassword,
  ResetPassword,
};
