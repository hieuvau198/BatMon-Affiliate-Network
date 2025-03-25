import { useState, useEffect } from "react";
import { Card, Spin, Statistic } from "antd";
import { motion } from "framer-motion";
import getPublisherBalance from "../../../../modules/PublisherBalance"; // Thay bằng đường dẫn thực tế

export default function Wallet() {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const data = await getPublisherBalance();
        if (data) {
          setWalletData(data[0]); // Lấy object đầu tiên từ array
        }
        setLoading(false);
      } catch (error) {
        console.error("Error in component:", error);
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Thông tin ví
      </h2>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : walletData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:bg-gray-50 transition-colors duration-200">
            <Statistic
              title="Số dư khả dụng"
              value={walletData.availableBalance}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: "#2ecc71" }}
            />
          </Card>
          <Card className="hover:bg-gray-50 transition-colors duration-200">
            <Statistic
              title="Số dư đang chờ"
              value={walletData.pendingBalance}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: "#f1c40f" }}
            />
          </Card>
          <Card className="hover:bg-gray-50 transition-colors duration-200">
            <Statistic
              title="Tổng thu nhập"
              value={walletData.lifetimeEarnings}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: "#3498db" }}
            />
          </Card>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Không thể tải dữ liệu ví
        </div>
      )}

      {walletData && (
        <div className="mt-4 text-right text-gray-600">
          Cập nhật lần cuối:{" "}
          {new Date(walletData.lastUpdated).toLocaleDateString("vi-VN")}
        </div>
      )}
    </motion.div>
  );
}