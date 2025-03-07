import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  BarChart,
  WalletCards,
  DoughnutChart,
  TransactionList,
} from "./partials";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  ArrowRightOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  RightOutlined,
  DownloadOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function EarningsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Earnings Dashboard</h2>
          <div className="flex items-center gap-4">
            <Link
              to="/publisher/dashboard/wallet"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              View Balance
            </Link>
            <Link
              to="/earnings/withdraw"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
            >
              Withdraw Funds
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Earnings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <span className="rounded-lg bg-green-100 p-1.5">
                <ArrowUpOutlined className="h-4 w-4 text-green-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">$24,563.00</span>
              <span className="text-sm text-green-600">+12.5%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Compared to last month</p>
          </div>

          {/* Available Balance */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Available Balance</p>
              <span className="rounded-lg bg-blue-100 p-1.5">
                <WalletOutlined className="h-4 w-4 text-blue-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">$5,240.00</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <Link to="/earnings/withdraw" className="text-blue-600 hover:underline">
                Withdraw Now
              </Link>
              <ArrowRightOutlined className="h-3 w-3 text-gray-600" />
            </div>
          </div>

          {/* This Month */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <span className="rounded-lg bg-green-100 p-1.5">
                <DollarOutlined className="h-4 w-4 text-green-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">$3,890.00</span>
              <span className="text-sm text-green-600">+8.2%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">20 days remaining</p>
          </div>

          {/* Pending */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <span className="rounded-lg bg-yellow-100 p-1.5">
                <ClockCircleOutlined className="h-4 w-4 text-yellow-600" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">$1,890.00</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Will be available in 45 days</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Earnings Trend */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Earnings Trend</h3>
              <select className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="mt-4 h-[300px]">
              <LineChart />
            </div>
          </div>

          {/* Revenue by Campaign */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Revenue by Campaign</h3>
              <select className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="mt-4 h-[300px]">
              <BarChart />
            </div>
          </div>
        </div>

        {/* Wallet Cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Your Wallets</h3>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
              <PlusOutlined className="h-4 w-4 text-gray-600" />
              Add New
            </button>
          </div>
          <div className="mt-4">
            <WalletCards />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Recent Transactions */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <FilterOutlined className="h-4 w-4 text-gray-600" />
                  Filter
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <DownloadOutlined className="h-4 w-4 text-gray-600" />
                  Export
                </button>
              </div>
            </div>
            <div className="p-6">
              <TransactionList />
            </div>
            <div className="border-t border-gray-200 p-4">
              <Link
                to="/earnings/transactions"
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
              >
                View All Transactions
                <RightOutlined className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Revenue Distribution</h3>
              <select className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-[300px] w-[300px]">
                <DoughnutChart />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">Top Campaign</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Shopee 12.12</p>
                <p className="text-sm text-green-600">$2,450.00</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">Top Category</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">E-commerce</p>
                <p className="text-sm text-green-600">$4,320.00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}