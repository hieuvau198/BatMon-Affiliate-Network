import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/download (1).png";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const values = { email, password };
      console.log("Login values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login successful!");
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your information again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 flex items-center px-4 py-2 text-gray-700 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
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
        Back
      </button>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Promotional Content */}
          <div className="lg:w-7/12 p-8">
            {/* Advertiser Card */}
            <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg p-8 mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <svg
                      className="w-6 h-6 text-orange-400"
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
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Advertiser</h3>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-white">CONNECT FOR SUCCESS WITH</h4>
                  <h2 className="text-3xl font-bold text-white mt-2">AFFIHUB</h2>
                  <p className="text-white text-opacity-90 mt-2">
                    The leading effective revenue growth platform in Vietnam & SEASIA
                  </p>
                </div>
                <button className="mt-5 flex items-center px-6 py-3 bg-white text-orange-400 font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  CONSULT ME
                </button>
              </div>
            </div>

            {/* Publisher Card */}
            <div className="relative bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-lg p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <svg
                      className="w-6 h-6 text-blue-500"
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
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Publisher</h3>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-white">JOIN THE NETWORK OF</h4>
                  <div className="flex items-baseline mt-2">
                    <h2 className="text-3xl font-bold text-white">2.5</h2>
                    <h3 className="text-2xl font-semibold text-white ml-2">MILLION PUBLISHERS</h3>
                  </div>
                  <p className="text-white text-opacity-90 font-semibold mt-2">LARGEST IN VIETNAM</p>
                </div>
                <button className="mt-5 flex items-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-5/12 bg-white p-8 flex flex-col items-center justify-center">
            <div className="relative ">
              <div className="absolute w-24 h-24 bg-[radial-gradient(circle,rgba(58,123,213,0.1)_0%,transparent_70%)] rounded-full -top-2 -left-2"></div>
              <img
                src={logo} // Thay logo đã import vào đây
                alt="AffiHub Logo"
                className="w-64 h-64 relative z-10 object-contain" // Thêm h-20 và object-contain để đảm bảo kích thước hợp lý
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">LOGIN</h2>

            <form onSubmit={onFinish} className="w-full max-w-sm">
              {/* Input cho Username or Email */}
              <div className="mb-6">
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
                    placeholder="Username or Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Input cho Password */}
              <div className="mb-6">
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center mt-6">
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <a href="/forgot-password" className="text-blue-500 font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>


              <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
                <span className="flex-grow h-px bg-gray-200"></span>
                <span className="px-4">Or login with</span>
                <span className="flex-grow h-px bg-gray-200"></span>
              </div>

              <button
                type="button"
                className="w-full mt-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-300"
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
    </div>
  );
}