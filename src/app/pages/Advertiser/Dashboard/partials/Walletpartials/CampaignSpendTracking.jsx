import React, { useState } from "react";
import { Table, Card, Typography, Tag } from "antd";
import { LineChartOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CampaignSpendTracking = ({ campaignSpend, formatCurrency }) => {
  const campaignColumns = [
    {
      title: "Campaign ID",
      dataIndex: "campaignId",
      key: "campaignId",
    },
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Total Spend",
      dataIndex: "spend",
      key: "spend",
      render: (spend) => formatCurrency(spend),
    },
  ];

  return (
    <>
      <div className="flex items-center mb-4">
        <LineChartOutlined className="mr-2" />
        <Title level={5} style={{ margin: 0 }}>Chi tiêu theo chiến dịch</Title>
      </div>
      
      <Table
        dataSource={campaignSpend}
        columns={campaignColumns}
        rowKey="campaignId"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};
export default CampaignSpendTracking;