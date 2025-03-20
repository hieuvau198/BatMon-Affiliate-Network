import { Table, Button, Modal, Input, Select, message, Tag, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilterOutlined,
  SearchOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import getCampaignList from "../../../modules/Campaign/getCampaignList";
import deleteCampaign from "../../../modules/Campaign/deleteCampaign";
import editCampaign from "../../../modules/Campaign/editCampaign";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
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
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa chiến dịch này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteCampaign(id);
          message.success("Chiến dịch đã được xoá thành công!");
          fetchCampaigns();
        } catch (error) {
          message.error("Xóa chiến dịch thất bại!");
        }
      }
    });
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
      message.success("Cập nhật chiến dịch thành công!");
      fetchCampaigns();
    } catch (error) {
      message.error("Cập nhật chiến dịch thất bại!");
    }
  };

  // Lọc dữ liệu theo điều kiện tìm kiếm và trạng thái
  const filteredData = campaigns
    .filter(item => 
      (searchText === "" || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()))
    )
    .filter(item => 
      filterStatus === "All" || item.status === filterStatus
    );

  const columns = [
    {
      title: "STT",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="font-medium text-blue-600">{text}</div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div className="max-w-xs truncate">{text}</div>
      ),
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => (
        <div className="font-medium">{budget?.toLocaleString()} VNĐ</div>
      ),
    },
    {
      title: "Thời gian",
      key: "timeframe",
      render: (_, record) => (
        <div className="text-sm">
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
        <Tag
          color={status === "Active" ? "success" : "warning"}
          className="px-3 py-1"
        >
          {status === "Active" ? "Đang chạy" : "Tạm dừng"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Chi tiết">
            <Link to={`/advertiser/campaignList/campaigndetail/${record.campaignId}`}>
              <Button type="primary" icon={<EyeOutlined />} size="middle" />
            </Link>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="default" icon={<EditOutlined />} size="middle" onClick={() => openEditModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button danger icon={<DeleteOutlined />} size="middle" onClick={() => handleDelete(record.campaignId)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý chiến dịch</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => navigate("/advertiser/campaignList/CampaignCreating")}
          className="flex items-center"
          size="large"
        >
          Tạo chiến dịch
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            {/* Tìm kiếm */}
            <div className="flex-grow max-w-md">
              <Input 
                placeholder="Tìm kiếm chiến dịch..." 
                prefix={<SearchOutlined className="text-gray-400" />} 
                className="rounded-lg"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            {/* Bộ lọc */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 whitespace-nowrap">
                <FilterOutlined /> Lọc:
              </span>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={(value) => setFilterStatus(value)}
                options={[
                  { value: 'All', label: 'Tất cả' },
                  { value: 'Active', label: 'Đang chạy' },
                  { value: 'Paused', label: 'Tạm dừng' },
                ]}
              />
              <Tooltip title="Xuất Excel">
                <Button icon={<FileExcelOutlined />} className="ml-2">
                  Xuất
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="p-5">
          <Table
            columns={columns}
            dataSource={filteredData.map((camp) => ({ ...camp, key: camp.campaignId }))}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} chiến dịch` 
            }}
            bordered={false}
            scroll={{ x: "max-content" }}
            loading={loading}
            className="campaign-table"
          />
        </div>
      </div>

      {/* Modal chỉnh sửa chiến dịch */}
      <Modal 
        title="Chỉnh sửa chiến dịch" 
        open={editModal} 
        onCancel={() => setEditModal(false)} 
        onOk={handleEditSubmit}
        okText="Cập nhật"
        cancelText="Hủy"
        bodyStyle={{ padding: "20px" }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tên chiến dịch</label>
            <Input 
              name="name" 
              placeholder="Tên chiến dịch" 
              value={selectedCampaign?.name} 
              onChange={handleEditChange} 
              className="w-full rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mô tả</label>
            <Input.TextArea 
              name="description" 
              placeholder="Mô tả" 
              value={selectedCampaign?.description} 
              onChange={handleEditChange} 
              className="w-full rounded"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ngân sách</label>
            <Input 
              name="budget" 
              placeholder="Ngân sách" 
              type="number" 
              value={selectedCampaign?.budget} 
              onChange={handleEditChange} 
              className="w-full rounded"
              addonAfter="VNĐ"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Ngày bắt đầu</label>
              <Input 
                name="startDate" 
                placeholder="Ngày bắt đầu" 
                type="date" 
                value={selectedCampaign?.startDate} 
                onChange={handleEditChange} 
                className="w-full rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Ngày kết thúc</label>
              <Input 
                name="endDate" 
                placeholder="Ngày kết thúc" 
                type="date" 
                value={selectedCampaign?.endDate} 
                onChange={handleEditChange} 
                className="w-full rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
            <Select 
              name="status" 
              value={selectedCampaign?.status} 
              onChange={(value) => setSelectedCampaign({ ...selectedCampaign, status: value })} 
              className="w-full"
            >
              <Select.Option value="Active">Đang chạy</Select.Option>
              <Select.Option value="Paused">Tạm dừng</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}