"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  LineChart,
  BarChart,
  WalletCards,
  DoughnutChart,
  TransactionList,
} from "./partials"
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
} from "@ant-design/icons"
import { Layout, Typography, Card, Row, Col, Button, Statistic, Space, Select } from "antd"

const { Content } = Layout
const { Title, Text } = Typography
const { Option } = Select

export default function EarningsDashboard() {
  const [activeTimeRange, setActiveTimeRange] = useState("7days")
  const [activeCampaignRange, setActiveCampaignRange] = useState("thisMonth")
  const [activeDistributionRange, setActiveDistributionRange] = useState("thisMonth")

  return (
    <Content className="site-layout-background" style={{ padding: '24px', minHeight: 280 }}>
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <Title level={3} style={{ margin: 0 }}>Earnings Dashboard</Title>
        <Space>
          <Button type="default">
            <Link to="/publisher/dashboard/wallet">View Balance</Link>
          </Button>
          <Button type="primary">
            <Link to="/earnings/withdraw">Withdraw Funds</Link>
          </Button>
        </Space>
      </div>

      {/* Stats Overview */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Total Earnings */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<Text className="text-gray-600">Total Earnings</Text>}
              value={24563.00}
              precision={2}
              valueStyle={{ color: '#333' }}
              prefix="$"
              suffix={
                <span className="ml-2 text-green-600 text-sm flex items-center">
                  <ArrowUpOutlined /> 12.5%
                </span>
              }
            />
            <Text type="secondary" className="text-xs">Compared to last month</Text>
          </Card>
        </Col>

        {/* Available Balance */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<Text className="text-gray-600">Available Balance</Text>}
              value={5240.00}
              precision={2}
              valueStyle={{ color: '#333' }}
              prefix="$"
              suffix={<WalletOutlined className="ml-2 text-blue-600" />}
            />
            <Link to="/earnings/withdraw" className="text-blue-600 text-sm flex items-center mt-1">
              Withdraw Now <ArrowRightOutlined className="ml-1" />
            </Link>
          </Card>
        </Col>

        {/* This Month */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<Text className="text-gray-600">This Month</Text>}
              value={3890.00}
              precision={2}
              valueStyle={{ color: '#333' }}
              prefix="$"
              suffix={
                <span className="ml-2 text-green-600 text-sm flex items-center">
                  <ArrowUpOutlined /> 8.2%
                </span>
              }
            />
            <Text type="secondary" className="text-xs">20 days remaining</Text>
          </Card>
        </Col>

        {/* Pending */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<Text className="text-gray-600">Pending</Text>}
              value={1890.00}
              precision={2}
              valueStyle={{ color: '#333' }}
              prefix="$"
              suffix={<ClockCircleOutlined className="ml-2 text-yellow-600" />}
            />
            <Text type="secondary" className="text-xs">Will be available in 45 days</Text>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Earnings Trend */}
        <Col xs={24} lg={12}>
          <Card 
            title="Earnings Trend" 
            bordered={false} 
            className="shadow-sm"
            extra={
              <Select 
                defaultValue="7days" 
                style={{ width: 120 }} 
                onChange={setActiveTimeRange}
              >
                <Option value="7days">Last 7 Days</Option>
                <Option value="30days">Last 30 Days</Option>
                <Option value="90days">Last 90 Days</Option>
              </Select>
            }
          >
            <div style={{ height: 300 }}>
              <LineChart />
            </div>
          </Card>
        </Col>

        {/* Revenue by Campaign */}
        <Col xs={24} lg={12}>
          <Card 
            title="Revenue by Campaign" 
            bordered={false} 
            className="shadow-sm"
            extra={
              <Select 
                defaultValue="thisMonth" 
                style={{ width: 120 }} 
                onChange={setActiveCampaignRange}
              >
                <Option value="thisMonth">This Month</Option>
                <Option value="lastMonth">Last Month</Option>
                <Option value="last3Months">Last 3 Months</Option>
              </Select>
            }
          >
            <div style={{ height: 300 }}>
              <BarChart />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Wallet Cards */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Title level={4} style={{ margin: 0 }}>Your Wallets</Title>
          <Button icon={<PlusOutlined />}>Add New</Button>
        </div>
        <WalletCards />
      </div>

      {/* Bottom Grid */}
      <Row gutter={[16, 16]}>
        {/* Recent Transactions */}
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Transactions" 
            bordered={false} 
            className="shadow-sm"
            extra={
              <Space>
                <Button icon={<FilterOutlined />} size="small">Filter</Button>
                <Button icon={<DownloadOutlined />} size="small">Export</Button>
              </Space>
            }
          >
            <TransactionList />
            <div className="mt-4 pt-4 border-t text-right">
              <Link to="/earnings/transactions" className="text-gray-600 hover:text-blue-600 text-sm flex items-center justify-end">
                View All Transactions <RightOutlined className="ml-1" />
              </Link>
            </div>
          </Card>
        </Col>

        {/* Revenue Distribution */}
        <Col xs={24} lg={12}>
          <Card 
            title="Revenue Distribution" 
            bordered={false} 
            className="shadow-sm"
            extra={
              <Select 
                defaultValue="thisMonth" 
                style={{ width: 120 }} 
                onChange={setActiveDistributionRange}
              >
                <Option value="thisMonth">This Month</Option>
                <Option value="lastMonth">Last Month</Option>
                <Option value="last3Months">Last 3 Months</Option>
              </Select>
            }
          >
            <div className="flex justify-center" style={{ height: 300 }}>
              <DoughnutChart />
            </div>
            <Row gutter={16} className="mt-4">
              <Col span={12}>
                <Card size="small" bordered>
                  <Text type="secondary" className="text-sm">Top Campaign</Text>
                  <div className="text-lg font-medium">Shopee 12.12</div>
                  <div className="text-green-600">$2,450.00</div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" bordered>
                  <Text type="secondary" className="text-sm">Top Category</Text>
                  <div className="text-lg font-medium">E-commerce</div>
                  <div className="text-green-600">$4,320.00</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Content>
  )
}
