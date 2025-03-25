import { useState, useEffect } from "react";
import { Card, Spin, Statistic, Table, Tag } from "antd";
import { motion } from "framer-motion";
import getPublisherBalance from "../../../../modules/PublisherBalance"; // Thay bằng đường dẫn thực tế
import getPayoutRequestsByPublisher from "../../../../modules/PublisherBalance/partials/getPayoutRequestsByPublisher";


export default function Wallet({ publisherId = 1 }) { // Giả sử publisherId được truyền vào, mặc định là 1
  const [walletData, setWalletData] = useState(null);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState(true);

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
        console.error("Error fetching wallet data:", error);
        setLoading(false);
      }
    };

    const fetchPayoutRequests = async () => {
      try {
        setPayoutLoading(true);
        const data = await getPayoutRequestsByPublisher(publisherId);
        if (data) {
          setPayoutRequests(data); // Lưu danh sách payout requests
        }
        setPayoutLoading(false);
      } catch (error) {
        console.error("Error fetching payout requests:", error);
        setPayoutLoading(false);
      }
    };

    // Gọi cả hai API
    fetchWalletData();
    fetchPayoutRequests();
  }, [publisherId]); // Thêm publisherId vào dependency array để refetch nếu publisherId thay đổi

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Định dạng số tiền dựa trên currencyCode
  const formatDynamicCurrency = (amount, currencyCode) => {
    if (currencyCode === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    } else if (currencyCode === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }
    return amount; // Fallback nếu không có currencyCode hợp lệ
  };

  // Cột cho bảng Payout Requests
  const payoutColumns = [
    {
      title: "Mã yêu cầu",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Nhà xuất bản",
      dataIndex: "publisherName",
      key: "publisherName",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) =>
        formatDynamicCurrency(amount, record.currencyCode),
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
  ];

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

      {/* Phần hiển thị Payout Requests */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Yêu cầu thanh toán
        </h3>

        {payoutLoading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : payoutRequests.length > 0 ? (
          <Table
            columns={payoutColumns}
            dataSource={payoutRequests}
            rowKey="requestId"
            pagination={false}
            className="rounded-lg shadow-sm"
          />
        ) : (
          <div className="text-center text-gray-500">
            Không có yêu cầu thanh toán nào
          </div>
        )}
      </div>
    </motion.div>
  );
}