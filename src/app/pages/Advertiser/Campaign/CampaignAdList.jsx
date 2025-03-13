import { Table, Button, Modal, Input, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      name: "Shopee Super Sale 12.12",
      category: "E-commerce",
      status: "Đang chạy",
      budget: "50,000,000đ",
      impressions: 120000,
      clicks: 8500,
      conversions: 450,
      revenue: "12,500,000đ",
      startDate: "01/12/2023",
      endDate: "12/12/2023",
    },
    {
      id: "2",
      name: "Lazada Tết Sale",
      category: "E-commerce",
      status: "Sắp diễn ra",
      budget: "30,000,000đ",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: "0đ",
      startDate: "15/12/2023",
      endDate: "31/12/2023",
    },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const openEditModal = (campaign) => {
    setSelectedCampaign({ ...campaign });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedCampaign({ ...selectedCampaign, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setCampaigns(
      campaigns.map((camp) => (camp.id === selectedCampaign.id ? selectedCampaign : camp))
    );
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) {
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    }
  };

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Đang chạy"
              ? "bg-green-200 text-green-800"
              : status === "Sắp diễn ra"
              ? "bg-blue-200 text-blue-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2">
          <Link to={`/advertiser/campaignList/campaigndetail`}>
            <Button type="primary">Chi tiết</Button>
          </Link>
          <Button type="default" onClick={() => openEditModal(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quản lý chiến dịch</h2>
          <Link to={`/advertiser/campaignList/CampaignCreating`}>
            <Button type="primary">+ Tạo chiến dịch</Button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={campaigns.map((camp) => ({ ...camp, key: camp.id }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa chiến dịch"
        visible={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Tên chiến dịch</label>
            <Input
              name="name"
              value={selectedCampaign?.name}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Ngân sách</label>
            <Input
              name="budget"
              type="number"
              value={selectedCampaign?.budget}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Trạng thái</label>
            <Select
              name="status"
              value={selectedCampaign?.status}
              onChange={(value) => setSelectedCampaign({ ...selectedCampaign, status: value })}
              className="w-full"
            >
              <Select.Option value="Đang chạy">Đang chạy</Select.Option>
              <Select.Option value="Sắp diễn ra">Sắp diễn ra</Select.Option>
              <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
