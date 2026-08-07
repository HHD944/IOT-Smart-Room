import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 1. Hàm gọi API để lấy mã OTP
  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Vui lòng nhập email hoặc username!" });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/login/forgot-password', { email });

      // Simulate API call
      setTimeout(() => {
        setIsOtpSent(true);
        setMessage({
          type: "success",
          text: "Mã OTP đã được gửi đến email của bạn!",
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: "error", text: "Lỗi khi gửi OTP, vui lòng thử lại." });
      setLoading(false);
    }
  };

  // 2. Hàm gọi API để đặt lại mật khẩu với OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setMessage({
        type: "error",
        text: "Vui lòng nhập đầy đủ OTP và mật khẩu mới!",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/login/reset-password', { email, otp, newPassword });

      // Simulate API call
      setTimeout(() => {
        setMessage({
          type: "success",
          text: "Đổi mật khẩu thành công! Bạn có thể đăng nhập.",
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: "error", text: "OTP không hợp lệ hoặc đã hết hạn." });
      console.error("Reset password error:", error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Icon Khóa giống màn hình Login */}
      <div className="mb-4 text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quên mật khẩu</h2>
      <p className="text-sm text-gray-500 mb-6">
        Lấy lại quyền truy cập vào tài khoản của bạn
      </p>

      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-sm">
        {/* Thông báo lỗi / thành công */}
        {message.text && (
          <div
            className={`p-3 mb-4 text-sm rounded ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
          >
            {message.text}
          </div>
        )}

        {/* Form lấy OTP */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email / Username
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
            <button
              type="button"
              onClick={handleGetOtp}
              disabled={isOtpSent || loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              {loading && !isOtpSent ? "Đang gửi..." : "Lấy OTP"}
            </button>
          </div>
        </div>

        {/* Form nhập OTP và Mật khẩu mới (Chỉ hiện khi đã gửi OTP) */}
        {isOtpSent && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã xác nhận (OTP)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mã 6 số"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#1d4ed8] hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
            >
              {loading ? "Đang xử lý..." : "Xác nhận & Đổi mật khẩu"}
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Nhớ lại mật khẩu?{" "}
        <a
          href="/login"
          className="font-semibold text-gray-900 hover:underline"
        >
          Đăng nhập
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
