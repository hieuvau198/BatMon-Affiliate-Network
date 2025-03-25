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
import EditCampaignModal from "./partials/CampaignEditModal";

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
      },
    });
  };

  const handleStatusChange = (value) => {
    setSelectedCampaign({ ...selectedCampaign, status: value });
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
      const updatedCampaign = {
        campaignId: selectedCampaign.campaignId,
        name: selectedCampaign.name,
        description: selectedCampaign.description,
        budget: selectedCampaign.budget,
        dailyCap: selectedCampaign.dailyCap || 0,
        monthlyCap: selectedCampaign.monthlyCap || 0,
        startDate: selectedCampaign.startDate,
        endDate: selectedCampaign.endDate,
        targetingCountries: selectedCampaign.targetingCountries || "VN",
        targetingDevices: selectedCampaign.targetingDevices || "Mobile",
        status: selectedCampaign.status,
        isPrivate: selectedCampaign.isPrivate || false,
        conversionRate: selectedCampaign.conversionRate || 0,
        currencyCode: selectedCampaign.currencyCode || "VND"
      };
  
      await editCampaign(selectedCampaign.campaignId, updatedCampaign);
      setEditModal(false);
      message.success("Cập nhật chiến dịch thành công!");
      fetchCampaigns();
    } catch (error) {
      message.error("Cập nhật chiến dịch thất bại!");
    }
  };

  const filteredData = campaigns
    .filter((item) =>
      searchText === "" ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) => filterStatus === "All" || item.status === filterStatus);

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
      render: (text) => <div className="font-medium text-blue-600">{text}</div>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className="max-w-xs truncate">{text}</div>,
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
      render: (budget, record) => (
        <div className="font-medium">
          {budget?.toLocaleString()} {record.currencyCode || "VNĐ"}
        </div>
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
          color={
            status === "Active" ? "success" : status === "Draft" ? "default" : "warning"
          }
          className="px-3 py-1"
        >
          {status === "Active" ? "Đang chạy" : status === "Draft" ? "Nháp" : "Chờ Phê Duyệt"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Chi tiết">
            <Link to={`/advertiser/campaignList/campaigndetail/${record.campaignId}`}>
              <Button type="primary" icon={<EyeOutlined />} size="middle" />
            </Link>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="default"
              icon={<EditOutlined />}
              size="middle"
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="middle"
              onClick={() => handleDelete(record.campaignId)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1100px]">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý chiến dịch</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="flex items-center"
          size="large"
          onClick={() => navigate("/advertiser/campaignList/CampaignCreating")}
        >
          Tạo chiến dịch
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex-grow max-w-md">
              <Input
                placeholder="Tìm kiếm chiến dịch..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-lg"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 whitespace-nowrap">
                <FilterOutlined /> Lọc:
              </span>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={(value) => setFilterStatus(value)}
                options={[
                  { value: "All", label: "Tất cả" },
                  { value: "Active", label: "Đang chạy" },
                  { value: "Paused", label: "Tạm dừng" },
                  { value: "Draft", label: "Nháp" },
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
              showTotal: (total) => `Tổng ${total} chiến dịch`,
            }}
            bordered={false}
            scroll={{ x: "max-content" }}
            loading={loading}
            className="campaign-table"
          />
        </div>
      </div>

      <EditCampaignModal
        visible={editModal}
        campaign={selectedCampaign}
        onCancel={() => setEditModal(false)}
        onSubmit={handleEditSubmit}
        onChange={handleEditChange}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}