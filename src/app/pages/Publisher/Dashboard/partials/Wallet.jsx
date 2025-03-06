// src/pages/Wallet.js
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftOutlined,
  WalletOutlined,
  DollarOutlined,
  DownloadOutlined,
  ArrowRightOutlined, // Add this import
  ClockCircleOutlined, // Ensure this is imported for Pending Balance
} from "@ant-design/icons";
import { Layout, Typography, Button, Table } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Wallet() {
  const [balance] = useState({
    available: "$5,240.00",
    pending: "$1,890.00",
    total: "$24,563.00",
  });

  const transactions = [
    {
      key: "1",
      date: "2025-03-01",
      description: "Shopee 12.12 Campaign",
      amount: "$500.00",
      status: "Completed",
    },
    {
      key: "2",
      date: "2025-03-02",
      description: "Lazada Tết Campaign",
      amount: "$750.00",
      status: "Pending",
    },
    {
      key: "3",
      date: "2025-03-03",
      description: "Tiki Sale Campaign",
      amount: "$300.00",
      status: "Completed",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <Text strong>${text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded ${status === "Completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
            }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link to="/publisher/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftOutlined className="mr-2" /> Back to Dashboard
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">View Balance</h2>
          <div className="flex items-center gap-4">
            <Button
              type="default"
              icon={<DownloadOutlined />}
              className="border-gray-200 hover:bg-gray-100"
            >
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Balance Overview */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Available Balance */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Available Balance</p>
              <span className="rounded-lg bg-blue-100 p-1.5">
                <WalletOutlined className="h-4 w-4 text-blue-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{balance.available}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <Link to="/earnings/withdraw" className="text-blue-600 hover:underline">
                Withdraw Now
              </Link>
              <ArrowRightOutlined className="h-3 w-3 text-gray-600" />
            </div>
          </div>

          {/* Pending Balance */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Pending Balance</p>
              <span className="rounded-lg bg-yellow-100 p-1.5">
                <ClockCircleOutlined className="h-4 w-4 text-yellow-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{balance.pending}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Will be available in 45 days</p>
          </div>

          {/* Total Earnings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <span className="rounded-lg bg-green-100 p-1.5">
                <DollarOutlined className="h-4 w-4 text-green-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{balance.total}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Compared to last month</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Transaction History</h3>
            <Button
              type="default"
              icon={<DownloadOutlined />}
              className="border-gray-200 hover:bg-gray-100"
            >
              Export
            </Button>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={{ pageSize: 5 }}
              className="w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}