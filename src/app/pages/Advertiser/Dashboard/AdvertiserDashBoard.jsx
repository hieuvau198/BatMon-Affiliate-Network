"use client";

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, ConfigProvider, Row, Col, Card } from "antd";
import {
  BarChartOutlined,
  SafetyOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  BankOutlined,
} from "@ant-design/icons";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const { Header, Content } = Layout;

// **Dữ liệu giả lập**
const fraudRuleData = [
  { name: "High Risk", count: 30 },
  { name: "Medium Risk", count: 50 },
  { name: "Low Risk", count: 70 },
];

const fraudInvestigationData = [
  { name: "Resolved", count: 40 },
  { name: "Under Review", count: 25 },
  { name: "Pending", count: 15 },
];

const orderData = [
  { name: "Completed", count: 120 },
  { name: "Processing", count: 60 },
  { name: "Cancelled", count: 20 },
];

const walletData = [
  { name: "Deposits", value: 5000000 },
  { name: "Withdrawals", value: 3200000 },
];

const monthlyOrderData = [
  { month: "Jan", completed: 120, processing: 80, cancelled: 20 },
  { month: "Feb", completed: 150, processing: 70, cancelled: 30 },
  { month: "Mar", completed: 200, processing: 90, cancelled: 25 },
];

const COLORS = ["#FF4D4F", "#FFA940", "#52C41A"];

export default function AdvertiserDashboard() {
  const [current, setCurrent] = useState("dashboard");

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <BarChartOutlined /> },
    { label: "Fraud Rule", key: "fraud-rule", icon: <SafetyOutlined /> },
    { label: "Fraud Investigation", key: "fraud-investigation", icon: <SearchOutlined /> },
    { label: "Order Management", key: "order-management", icon: <ShoppingCartOutlined /> },
    { label: "Wallet", key: "wallet", icon: <BankOutlined /> },
  ];

  const onClick = (e) => setCurrent(e.key);

  // **Dashboard tổng hợp**
  const renderGeneralDashboard = () => (
    <Row gutter={[16, 16]}>
      {renderFraudRule()}
      {renderFraudInvestigation()}
      {renderOrderManagement()}
      {renderWallet()}
    </Row>
  );

  // **Dashboard Fraud Rule**
  const renderFraudRule = () => (
    <>
      <Col xs={24} lg={12}>
        <Card title="Fraud Rule Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fraudRuleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FF4D4F" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Fraud Rule by Risk Level">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={fraudRuleData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {fraudRuleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </>
  );

  // **Dashboard Fraud Investigation**
  const renderFraudInvestigation = () => (
    <>
      <Col xs={24} lg={12}>
        <Card title="Fraud Investigation Status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={fraudInvestigationData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {fraudInvestigationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </>
  );

  // **Dashboard Order Management**
  const renderOrderManagement = () => (
    <>
      <Col xs={24} lg={12}>
        <Card title="Order Status Overview">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1890FF" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Monthly Order Trends">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyOrderData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#52C41A" name="Completed" />
              <Line type="monotone" dataKey="processing" stroke="#FFA940" name="Processing" />
              <Line type="monotone" dataKey="cancelled" stroke="#FF4D4F" name="Cancelled" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </>
  );

  // **Dashboard Wallet**
  const renderWallet = () => (
    <>
      <Col xs={24} lg={12}>
        <Card title="Wallet Transactions">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={walletData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {walletData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </>
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1677ff", borderRadius: 4 } }}>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center px-6 shadow-sm">
          <div className="text-xl font-bold mr-8">AdManager</div>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} className="flex-1 border-b-0" />
        </Header>
        <Content className="p-6 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">{menuItems.find(item => item.key === current)?.label}</h2>
            <Breadcrumb items={[{ title: "Dashboard" }, { title: menuItems.find(item => item.key === current)?.label }]} />
          </div>
          <Row gutter={[16, 16]}>
            {current === "dashboard" ? renderGeneralDashboard() :
              current === "fraud-rule" ? renderFraudRule() :
              current === "fraud-investigation" ? renderFraudInvestigation() :
              current === "order-management" ? renderOrderManagement() :
              renderWallet()}
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
