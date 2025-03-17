"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Select, Table, Tag, Button, Spin, message } from "antd";
import { EyeOutlined, LinkOutlined } from "@ant-design/icons";
import getCampaignList from "../../../modules/Campaign/getCampaignList";

const { Option } = Select;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaignList();
        setCampaigns(data);
      } catch (error) {
        message.error("Không thể tải danh sách chiến dịch.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleCreateLink = (campaignId) => {
    // Placeholder for link creation logic
    message.success(`Đã tạo link cho chiến dịch ID: ${campaignId}`);
    // Add your link creation logic here, e.g., navigating to a new page or generating a URL
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      campaign.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
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
        <Tag color={status === "Active" ? "green" : "yellow"}>{status}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link to={`/publisher/campaignlist/campaigndetail/${record.campaignId}`}>
            <Button icon={<EyeOutlined />} type="primary">
              Xem Chi tiết
            </Button>
          </Link>
          <Button
            icon={<LinkOutlined />}
            onClick={() => handleCreateLink(record.campaignId)}
          >
            Tạo Link
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Danh sách chiến dịch</h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <Input
              placeholder="Tìm kiếm chiến dịch..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="md:w-64"
            />

            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              className="md:w-40"
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="Active">Đang chạy</Option>
              <Option value="Draft">Tạm dừng</Option>
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
            />
          )}
        </div>
      </div>
    </div>
  );
}