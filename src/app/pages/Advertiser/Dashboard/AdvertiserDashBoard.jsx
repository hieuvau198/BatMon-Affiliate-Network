"use client";

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, ConfigProvider } from "antd";
import {
  BarChartOutlined,
  SafetyOutlined,
  UserOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  BankOutlined,
} from "@ant-design/icons";
import FraudRule from "./partials/FraudRule";
import FraudInvestigation from "./partials/FraudInvestigation";
import OrderManagement from "./partials/OrderManagement";
import AdvertiserBalance from "./partials/Wallet";

const { Header, Content } = Layout;

export default function AdvertiserDashboard() {
  const [current, setCurrent] = useState("dashboard");

  const items = [
    { label: "Dashboard", key: "dashboard", icon: <BarChartOutlined /> },
    { label: "Fraud Rule", key: "fraud-rule", icon: <SafetyOutlined /> },
    { label: "Fraud Investigation", key: "fraud-investigation", icon: <SearchOutlined /> },
    { label: "Order Management", key: "order-management", icon: <ShoppingCartOutlined /> },
    { label: "Wallet", key: "wallet", icon: <BankOutlined /> },
  ];

  const onClick = (e) => setCurrent(e.key);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1677ff", borderRadius: 4 } }}>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center px-6 shadow-sm">
          <div className="text-xl font-bold mr-8">AdManager</div>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="flex-1 border-b-0" />
        </Header>
        <Content className="p-6 bg-gray-50">
          <div className="mb-6">
            <div className="text-2xl font-semibold mb-2">Dashboard Management</div>
            <Breadcrumb items={[{ title: "Dashboard" }, { title: "Dashboard Management" }]} />
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}><FraudRule /></Col>
            <Col xs={24} lg={12}><FraudInvestigation /></Col>
            <Col xs={24} lg={12}><OrderManagement /></Col>
            <Col xs={24} lg={12}><AdvertiserBalance /></Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}