"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Select, Table, Tag, Button, Spin, message, Modal, Form } from "antd";
import { EyeOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import getCampaignList from "../../../modules/Publisher/getCampaignList";
import createCampaign from "../../../modules/Publisher/createCampaign";
import deleteCampaign from "../../../modules/Publisher/deleteCampaign";

const { Option } = Select;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading,] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
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

  const handleCreateCampaign = async (values) => {
    try {
      await createCampaign(values);
      message.success("Chiến dịch đã được tạo thành công!");
      setIsModalOpen(false);
      navigate(0);
    } catch (error) {
      message.error("Không thể tạo chiến dịch.");
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await deleteCampaign(campaignId);
      message.success("Chiến dịch đã được xóa thành công!");
      setCampaigns((prev) => prev.filter((campaign) => campaign.campaignId !== campaignId));
    } catch (error) {
      message.error("Không thể xóa chiến dịch.");
    }
  };

  const openCreateModal = () => setIsModalOpen(true);
  const closeCreateModal = () => setIsModalOpen(false);

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
            icon={<EditOutlined />}
            onClick={() => navigate(`/publisher/campaignlist/edit/${record.campaignId}`)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteCampaign(record.campaignId)}
          >
            Xóa
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
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
              Tạo Chiến Dịch
            </Button>
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

      <Modal
        title="Tạo Chiến Dịch"
        open={isModalOpen}
        onCancel={closeCreateModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateCampaign}>
          <Form.Item name="advertiserId" label="ID Nhà Quảng Cáo" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="name" label="Tên chiến dịch" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="description" label="Mô tả"> <Input /> </Form.Item>
          <Form.Item name="budget" label="Ngân sách" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="dailyCap" label="Hạn mức hàng ngày"> <Input type="number" /> </Form.Item>
          <Form.Item name="monthlyCap" label="Hạn mức hàng tháng"> <Input type="number" /> </Form.Item>
          <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}> <Input type="date" /> </Form.Item>
          <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}> <Input type="date" /> </Form.Item>
          <Form.Item name="targetingCountries" label="Quốc gia mục tiêu"> <Input /> </Form.Item>
          <Form.Item name="targetingDevices" label="Thiết bị mục tiêu"> <Input /> </Form.Item>
          <Form.Item name="isPrivate" label="Riêng tư" valuePropName="checked"> <Input type="checkbox" /> </Form.Item>
          <Form.Item name="conversionRate" label="Tỉ lệ chuyển đổi"> <Input type="number" /> </Form.Item>
          <Form.Item name="currencyCode" label="Mã tiền tệ"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}