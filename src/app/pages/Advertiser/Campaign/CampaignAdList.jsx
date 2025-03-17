import { Table, Button, Modal, Input, Select, message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getCampaignList from "../../../modules/Campaign/getCampaignList";
import deleteCampaign from "../../../modules/Campaign/deleteCampaign";
import editCampaign from "../../../modules/Campaign/editCampaign";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    const data = await getCampaignList();
    setCampaigns(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) {
      try {
        await deleteCampaign(id);
        message.success("Chiến dịch đã được xoá!");
        fetchCampaigns();
      } catch (error) {
        message.error("Xóa chiến dịch thất bại!");
      }
    }
  };

  const openEditModal = (campaign) => {
    setSelectedCampaign({ ...campaign });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedCampaign({ ...selectedCampaign, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await editCampaign(selectedCampaign.campaignId, selectedCampaign);
      setEditModal(false);
      fetchCampaigns();
    } catch (error) {
      message.error("Cập nhật chiến dịch thất bại!");
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Active"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2">
          <Link to={`/advertiser/campaignList/campaigndetail/${record.campaignId}`}>
            <Button type="primary">Chi tiết</Button>
          </Link>
          <Button type="default" onClick={() => openEditModal(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.campaignId)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1200px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        
        {/* Header: Tiêu đề + Nút tạo chiến dịch */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quản lý chiến dịch</h2>
          <Button type="primary" onClick={() => navigate("/advertiser/campaignList/CampaignCreating")}>
            + Tạo chiến dịch
          </Button>
        </div>

        {/* Bảng danh sách chiến dịch */}
        <Table
          columns={columns}
          dataSource={campaigns.map((camp) => ({ ...camp, key: camp.campaignId }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
          loading={loading}
        />
      </div>

      {/* Modal chỉnh sửa chiến dịch */}
      <Modal title="Chỉnh sửa chiến dịch" open={editModal} onCancel={() => setEditModal(false)} onOk={handleEditSubmit}>
        <div className="space-y-4">
          <Input name="name" placeholder="Tên chiến dịch" value={selectedCampaign?.name} onChange={handleEditChange} />
          <Input name="description" placeholder="Mô tả" value={selectedCampaign?.description} onChange={handleEditChange} />
          <Input name="budget" placeholder="Ngân sách" type="number" value={selectedCampaign?.budget} onChange={handleEditChange} />
          <Input name="startDate" placeholder="Ngày bắt đầu" type="date" value={selectedCampaign?.startDate} onChange={handleEditChange} />
          <Input name="endDate" placeholder="Ngày kết thúc" type="date" value={selectedCampaign?.endDate} onChange={handleEditChange} />
          <Select name="status" value={selectedCampaign?.status} onChange={(value) => setSelectedCampaign({ ...selectedCampaign, status: value })} className="w-full">
            <Select.Option value="Active">Đang chạy</Select.Option>
            <Select.Option value="Paused">Tạm dừng</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}
