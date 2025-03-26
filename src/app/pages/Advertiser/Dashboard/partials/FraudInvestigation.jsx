import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Tag, Tooltip, Spin, Empty, Input, Badge, Tabs } from "antd";
import { SearchOutlined, EyeOutlined, ClockCircleOutlined, CheckCircleOutlined, AuditOutlined } from "@ant-design/icons";
import getFraudCase from "../../../../modules/FraudCase/getFraudCase";

const { TabPane } = Tabs;

export default function FraudInvestigation() {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // Gọi API khi component mount
  useEffect(() => {
    const fetchFraudCases = async () => {
      try {
        const data = await getFraudCase();
        if (data) {
          setInvestigations(data);
        } else {
          setInvestigations([]);
        }
      } catch (error) {
        console.error("Error fetching fraud cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFraudCases();
  }, []);

  // Lọc dữ liệu dựa trên tìm kiếm và tab
  const filteredInvestigations = investigations.filter(
    (caseItem) =>
      (caseItem.fraudTypeName.toLowerCase().includes(searchText.toLowerCase()) ||
        caseItem.evidence.toLowerCase().includes(searchText.toLowerCase())) &&
      (activeTab === "all" ||
        (activeTab === "active" && caseItem.status === "Under Review") ||
        (activeTab === "resolved" && caseItem.status === "Confirmed Fraud"))
  );

  // Hàm hỗ trợ màu sắc và biểu tượng
  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review": return "blue";
      case "Confirmed Fraud": return "red";
      default: return "gray";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Under Review": return <ClockCircleOutlined className="text-blue-500" />;
      case "Confirmed Fraud": return <CheckCircleOutlined className="text-red-500" />;
      default: return <ClockCircleOutlined className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetails = (caseItem) => {
    navigate(`${caseItem.caseId}`, { state: { caseData: caseItem } });
  };

  const columns = [
    { 
      title: "ID", 
      dataIndex: "caseId", 
      key: "caseId", 
      width: 70, 
      render: (id) => <span className="text-gray-500">{id}</span> 
    },
    {
      title: "Loại Gian Lận",
      dataIndex: "fraudTypeName",
      key: "fraudTypeName",
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <div className="flex items-center">
          {getStatusIcon(status)}
          <Tag color={getStatusColor(status)} className="ml-2">
            {status === "Under Review" ? "Đang Xem Xét" : "Xác Nhận Gian Lận"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Ngày Phát Hiện",
      dataIndex: "detectionDate",
      key: "detectionDate",
      width: 150,
      render: (date) => formatDate(date),
    },
    {
      title: "Bằng Chứng",
      dataIndex: "evidence",
      key: "evidence",
      render: (text) => (
        <Tooltip title={text}>
          <span className="line-clamp-2">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 70,
      render: (_, record) => (
        <Tooltip title="Xem Chi Tiết">
          <button
            onClick={() => handleViewDetails(record)}
            className="text-blue-500 hover:text-blue-700 flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 transition-all"
          >
            <EyeOutlined />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <AuditOutlined className="text-white text-2xl" />
              <h1 className="text-xl font-bold text-white m-0">Điều Tra Gian Lận</h1>
            </div>
          </div>
          <p className="text-indigo-100 mt-2 mb-0 text-sm">
            Theo dõi và quản lý các trường hợp gian lận trong hệ thống
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Tất Cả" key="all" />
              <TabPane
                tab={
                  <span>
                    Đang Xem Xét{" "}
                    <Badge
                      count={investigations.filter((c) => c.status === "Under Review").length}
                      style={{ backgroundColor: "#1890ff" }}
                    />
                  </span>
                }
                key="active"
              />
              <TabPane
                tab={
                  <span>
                    Đã Xác Nhận{" "}
                    <Badge
                      count={investigations.filter((c) => c.status === "Confirmed Fraud").length}
                      style={{ backgroundColor: "#ff4d4f" }}
                    />
                  </span>
                }
                key="resolved"
              />
            </Tabs>

            <Input
              placeholder="Tìm kiếm loại gian lận hoặc bằng chứng"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full md:w-64"
              allowClear
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
          ) : filteredInvestigations.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredInvestigations.map((caseItem) => ({ ...caseItem, key: caseItem.caseId }))}
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Tổng cộng ${total} vụ việc`,
              }}
              bordered
              scroll={{ x: "max-content" }}
              rowClassName="hover:bg-gray-50"
            />
          ) : (
            <Empty description="Không tìm thấy vụ điều tra nào" />
          )}
        </div>
      </div>
    </div>
  );
}