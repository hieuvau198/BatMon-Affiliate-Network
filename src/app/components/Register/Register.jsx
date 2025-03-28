"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("publisher");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.agreement) {
      alert("Vui lòng đồng ý với điều khoản dịch vụ!");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!");
      setLoading(false);
      return;
    }

    try {
      console.log("Registration values:", { ...formData, userType });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
      // navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 flex items-center px-4 py-2 text-gray-700 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300 z-10"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay Lại
      </button>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Promotional Content */}
        <div className="lg:w-5/12 p-8 bg-gradient-to-br from-blue-500 to-cyan-400 relative text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
          <div className="relative z-10 flex flex-col h-full justify-center items-center">
            <svg
              className="w-12 h-12 mb-4 bg-white bg-opacity-20 p-3 rounded-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7v4a4 4 0 01-4 4H9.828a2 2 0 00-1.414.586l-2.828 2.828A2 2 0 015 19.414V7a2 2 0 012-2h8a2 2 0 012 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Tham gia AffiHub</h2>
            <p className="text-center text-white text-opacity-90 mb-8">
              Bắt đầu hành trình kiếm tiền trực tuyến cùng cộng đồng hơn 2,5 triệu Publisher
            </p>
            <div className="space-y-4">
              {[
                "Thu nhập lên đến 50 triệu/tháng",
                "Tự do kiếm tiền online mọi lúc, mọi nơi",
                "Được đào tạo miễn phí tại AffiHub Academy",
                "Nhận ngay 1 triệu đồng khi đăng ký thành công",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-7/12 p-8 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute w-24 h-24 bg-[radial-gradient(circle,rgba(58,123,213,0.1)_0%,transparent_70%)] rounded-full -top-2 -left-2"></div>
            <img
              src={logo}
              alt="AffiHub Logo"
              className="w-64 h-64 relative z-10 object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">ĐĂNG KÝ TÀI KHOẢN</h2>

          <div className="w-full max-w-md mb-6">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setUserType("publisher")}
                className={`flex-1 py-3 rounded-lg text-center font-semibold transition-all duration-300 ${userType === "publisher"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                <svg
                  className="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h5M21 4a2 2 0 00-2-2h-5a2 2 0 00-2 2v2M3 4a2 2 0 012-2h5a2 2 0 012 2v2m-9 6h18"
                  />
                </svg>
                Publisher
              </button>
              <button
                onClick={() => setUserType("advertiser")}
                className={`flex-1 py-3 rounded-lg text-center font-semibold transition-all duration-300 ${userType === "advertiser"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                <svg
                  className="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h18M3 9h18m-9 6h9M3 15h6m-6 6h18"
                  />
                </svg>
                Advertiser
              </button>
            </div>
            <div
              className={`p-4 rounded-lg ${userType === "publisher" ? "bg-blue-50" : "bg-orange-50"
                }`}
            >
              <p
                className={`text-sm font-medium ${userType === "publisher" ? "text-blue-600" : "text-orange-600"
                  }`}
              >
                {userType === "publisher"
                  ? "Bạn sẽ đăng ký tài khoản Publisher để kiếm tiền từ việc tiếp thị liên kết."
                  : "Bạn sẽ đăng ký tài khoản Advertiser để quảng bá sản phẩm và dịch vụ."}
              </p>
            </div>
          </div>

          <form onSubmit={onFinish} className="w-full max-w-md space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Họ"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Tên"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Tên đăng nhập"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.376 1 1.723V16h2v-3.277c.598-.347 1-.985 1-1.723zm9-5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2z"
                />
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.376 1 1.723V16h2v-3.277c.598-.347 1-.985 1-1.723zm9-5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2z"
                />
              </svg>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Xác nhận mật khẩu"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                Tôi đồng ý với{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${userType === "publisher"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-opacity-90"
                : "bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-opacity-90"
                }`}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <span className="flex-grow h-px bg-gray-200"></span>
              <span className="px-4">Hoặc đăng ký với</span>
              <span className="flex-grow h-px bg-gray-200"></span>
            </div>

            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-lg text-gray-600 font-medium flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 0h-4"
                />
              </svg>
              Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}