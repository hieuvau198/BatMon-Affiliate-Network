import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spin, Statistic, Tabs, Button } from "antd";
import { motion } from "framer-motion";
import { ArrowDownOutlined, ArrowUpOutlined, WalletOutlined, LeftOutlined, HistoryOutlined } from "@ant-design/icons";
import getPublisherBalance from "../../../../modules/PublisherBalance";
import Overview from "./partials/Overview";
import PayoutHistory from "./partials/PayoutHistory";
import TrafficSources from "./partials/TrafficSources";
const { TabPane } = Tabs;

export default function WalletDashboard({ publisherId = 1 }) {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const data = await getPublisherBalance();
        if (data) {
          setWalletData(data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, [publisherId]);

  const updateWalletData = async () => {
    try {
      const data = await getPublisherBalance();
      if (data) {
        setWalletData(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const formatDynamicCurrency = (amount, currencyCode) => {
    if (currencyCode === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(amount);
    } else if (currencyCode === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    }
    return amount;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="p-4 md:p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            icon={<LeftOutlined />}
            onClick={handleBack}
            className="mr-3 border-0 shadow-none text-gray-600 hover:text-blue-600"
          >
            Quay lại
          </Button>
          <WalletOutlined className="text-3xl mr-3 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Ví điện tử của bạn
          </h1>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : walletData ? (
          <Card className="mb-6 shadow-sm border-0 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg text-gray-600 mb-1">Số dư khả dụng</h2>
                <div className="text-3xl font-bold text-gray-800">
                  {formatCurrency(walletData.availableBalance)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Cập nhật: {new Date(walletData.lastUpdated).toLocaleDateString("vi-VN")}
                </div>
              </div>
              <div className="flex space-x-4">
                <Statistic
                  title={<span className="text-gray-600">Số dư đang chờ</span>}
                  value={walletData.pendingBalance}
                  prefix={<ArrowDownOutlined />}
                  valueStyle={{ color: "#f59e0b" }}
                  formatter={(value) => formatCurrency(value)}
                  className="bg-white p-3 rounded-lg shadow-xs"
                />
                <Statistic
                  title={<span className="text-gray-600">Tổng thu nhập</span>}
                  value={walletData.lifetimeEarnings}
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: "#10b981" }}
                  formatter={(value) => formatCurrency(value)}
                  className="bg-white p-3 rounded-lg shadow-xs"
                />
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-6">
            <div className="text-center text-gray-500 py-4">
              Không thể tải dữ liệu ví
            </div>
          </Card>
        )}
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="wallet-tabs">
          <TabPane
            tab={
              <span className="flex items-center">
                <WalletOutlined className="mr-1" />
                Tổng quan
              </span>
            }
            key="overview"
          >
            <Overview
              walletData={walletData}
              formatCurrency={formatCurrency}
              formatDynamicCurrency={formatDynamicCurrency}
              updateWalletData={updateWalletData}
              publisherId={publisherId}
            />
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center">
                <HistoryOutlined className="mr-1" />
                Trạng Thái Rút Tiền
              </span>
            }
            key="history"
          >
            <PayoutHistory
              publisherId={publisherId}
              formatDynamicCurrency={formatDynamicCurrency}
            />
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center">
                <WalletOutlined className="mr-1" />
                Nguồn lưu lượng
              </span>
            }
            key="traffic"
          >
            <TrafficSources publisherId={publisherId} />
          </TabPane>
        </Tabs>
        {walletData && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Số dư tối thiểu rút</div>
              <div className="text-xl font-semibold">{formatCurrency(100000)}</div>
            </Card>
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Phí rút tiền</div>
              <div className="text-xl font-semibold">0.5%</div>
            </Card>
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Thời gian xử lý</div>
              <div className="text-xl font-semibold">3-5 ngày làm việc</div>
            </Card>
          </div>
        )}
      </div>
      <style jsx global>{`
        .wallet-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .wallet-tabs .ant-tabs-tab {
          padding: 12px 16px !important;
          font-size: 15px !important;
        }
        .wallet-tabs .ant-tabs-tab-active {
          background: #f0f7ff !important;
          border-radius: 6px !important;
        }
        .wallet-transactions-table .ant-table-thead > tr > th {
          background: #f8fafc !important;
          font-weight: 600 !important;
        }
        .wallet-transactions-table .ant-table {
          overflow-x: hidden !important;
        }
      `}</style>
    </motion.div>
  );
}
