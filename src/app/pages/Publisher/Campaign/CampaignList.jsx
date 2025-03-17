"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Select, Table, Tag, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import mockData from "../../Publisher/Campaign/partials/mockdata.json";

const { Option } = Select;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCampaigns(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/campaigndetail/${String(record.campaignId)}`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => `${budget.toLocaleString()} VND`,
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <div>
          <div>Bắt đầu: {record.startDate}</div>
          <div>Kết thúc: {record.endDate}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đang hoạt động" ? "green" : "yellow"}>{status}</Tag>
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
        Featured Campaigns
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Input
          placeholder="Tìm kiếm chiến dịch..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="md:w-64"
        />
        <Select value={filterStatus} onChange={setFilterStatus} className="md:w-40">
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="Đang hoạt động">Đang hoạt động</Option>
          <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
        </Select>
      </div>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCampaigns}
          rowKey="campaignId"
          pagination={{ pageSize: 5 }}
          rowClassName="hover:bg-gray-50 transition-colors duration-200"
        />
      )}
    </motion.div>
  );
}
