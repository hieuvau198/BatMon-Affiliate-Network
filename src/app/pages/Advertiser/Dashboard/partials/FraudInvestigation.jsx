import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Tag, Tooltip, Spin, Empty, Input, Badge, Tabs } from "antd";
import { 
  InfoCircleOutlined, 
  SearchOutlined, 
  EyeOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  FilterOutlined
} from "@ant-design/icons";

const { TabPane } = Tabs;

export default function FraudInvestigation() {
  const [investigations, setInvestigations] = useState([
    {
      id: "1",
      caseName: "Điều Tra Gian Lận Nhấp Chuột",
      status: "Đang Xem Xét",
      severity: "Cao",
      description: "Phát hiện tỷ lệ nhấp chuột cao bất thường từ nhiều IP trong thời gian ngắn. Mẫu hình cho thấy sử dụng công cụ tự động.",
      reportedDate: "2025-03-10",
      affectedCampaigns: ["Khuyến Mãi Mùa Hè", "Đăng Ký Người Dùng Mới"],
      reportedBy: "Hệ Thống Giám Sát",
      expectedResolution: "2025-03-28",
      activityLog: [
        { date: "2025-03-10", action: "Mở vụ việc", user: "Hệ Thống" },
        { date: "2025-03-12", action: "Hoàn thành phân tích ban đầu", user: "John (Đội Chống Gian Lận)" },
        { date: "2025-03-15", action: "Yêu cầu thêm dữ liệu", user: "Sarah (Đội Chống Gian Lận)" },
        { date: "2025-03-18", action: "Đang tiến hành phân tích", user: "John (Đội Chống Gian Lận)" }
      ]
    },
    {
      id: "2",
      caseName: "Lạm Dụng Nhiều Tài Khoản",
      status: "Đã Giải Quyết",
      severity: "Trung Bình",
      description: "Nghi ngờ người dùng sử dụng nhiều tài khoản để gian lận. Phân tích IP xác nhận cùng một thiết bị tạo nhiều tài khoản để nhận thưởng.",
      reportedDate: "2025-02-25",
      affectedCampaigns: ["Chương Trình Giới Thiệu"],
      reportedBy: "Kiểm Tra Thủ Công",
      expectedResolution: "2025-03-10",
      resolvedDate: "2025-03-08",
      resolution: "Các tài khoản bị chấm dứt, các chuyển đổi gian lận đã bị đảo ngược",
      activityLog: [
        { date: "2025-02-25", action: "Mở vụ việc", user: "Melissa (Tuân Thủ)" },
        { date: "2025-02-27", action: "Bắt đầu điều tra", user: "John (Đội Chống Gian Lận)" },
        { date: "2025-03-02", action: "Thu thập bằng chứng", user: "John (Đội Chống Gian Lận)" },
        { date: "2025-03-05", action: "Quyết định chấm dứt tài khoản", user: "David (Quản Lý)" },
        { date: "2025-03-08", action: "Giải quyết vụ việc", user: "John (Đội Chống Gian Lận)" }
      ]
    },
    {
      id: "3",
      caseName: "Thao Túng Ghi Công Chuyển Đổi",
      status: "Đang Xem Xét",
      severity: "Cao",
      description: "Nghi ngờ thao túng các tham số theo dõi để yêu cầu ghi công cho các chuyển đổi không do đơn vị liên kết mang lại.",
      reportedDate: "2025-03-15",
      affectedCampaigns: ["Ra Mắt Sản Phẩm Cao Cấp", "Ưu Đãi Đặc Biệt Ngày Lễ"],
      reportedBy: "Đội Phân Tích Dữ Liệu",
      expectedResolution: "2025-04-05",
      activityLog: [
        { date: "2025-03-15", action: "Mở vụ việc", user: "Emily (Phân Tích)" },
        { date: "2025-03-17", action: "Xem xét bằng chứng ban đầu", user: "Michael (Đội Chống Gian Lận)" },
        { date: "2025-03-20", action: "Bắt đầu phân tích kỹ thuật", user: "Michael (Đội Chống Gian Lận)" }
      ]
    },
    {
      id: "4",
      caseName: "Phát Hiện Nhồi Cookie",
      status: "Đã Đóng",
      severity: "Trung Bình",
      description: "Nghi ngờ đơn vị liên kết đặt nhiều cookie theo dõi mà không có sự đồng ý của người dùng để yêu cầu hoa hồng từ các giao dịch sau này.",
      reportedDate: "2025-01-18",
      affectedCampaigns: ["Giảm Giá Mùa Đông"],
      reportedBy: "Giám Sát Kỹ Thuật",
      expectedResolution: "2025-02-10",
      resolvedDate: "2025-02-07",
      resolution: "Điều tra xác nhận. Đơn vị liên kết bị xóa khỏi chương trình và giữ lại các khoản thanh toán.",
      activityLog: [
        { date: "2025-01-18", action: "Mở vụ việc", user: "Hệ Thống" },
        { date: "2025-01-20", action: "Thu thập bằng chứng kỹ thuật", user: "Alex (Đội Kỹ Thuật)" },
        { date: "2025-01-28", action: "Thông báo cho đơn vị liên kết", user: "Sarah (Tuân Thủ)" },
        { date: "2025-02-05", action: "Xem xét phản hồi", user: "Sarah (Tuân Thủ)" },
        { date: "2025-02-07", action: "Đóng vụ việc với biện pháp xử lý", user: "David (Quản Lý)" }
      ]
    },
    {
      id: "5",
      caseName: "Vi Phạm Lưu Lượng Khuyến Khích",
      status: "Đã Giải Quyết",
      severity: "Thấp",
      description: "Đơn vị liên kết có khả năng sử dụng nguồn lưu lượng khuyến khích không được phép theo điều khoản chiến dịch.",
      reportedDate: "2025-03-05",
      affectedCampaigns: ["Chiến Dịch Cài Đặt Ứng Dụng"],
      reportedBy: "Đội Kiểm Soát Chất Lượng",
      expectedResolution: "2025-03-20",
      resolvedDate: "2025-03-18",
      resolution: "Đơn vị liên kết được cảnh báo và cung cấp thêm đào tạo về nguồn lưu lượng được phép.",
      activityLog: [
        { date: "2025-03-05", action: "Mở vụ việc", user: "Tina (Đội QA)" },
        { date: "2025-03-08", action: "Phân tích nguồn lưu lượng", user: "Michael (Đội Chống Gian Lận)" },
        { date: "2025-03-12", action: "Liên hệ đơn vị liên kết để giải thích", user: "Sarah (Tuân Thủ)" },
        { date: "2025-03-15", action: "Nhận và xem xét phản hồi", user: "Sarah (Tuân Thủ)" },
        { date: "2025-03-18", action: "Giải quyết vụ việc với cảnh báo", user: "Sarah (Tuân Thủ)" }
      ]
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  // Mô phỏng tải dữ liệu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Lọc các vụ điều tra dựa trên tìm kiếm và tab hoạt động
  const filteredInvestigations = investigations.filter(
    caseItem => 
      (caseItem.caseName.toLowerCase().includes(searchText.toLowerCase()) ||
       caseItem.description.toLowerCase().includes(searchText.toLowerCase())) &&
      (activeTab === "all" || 
       (activeTab === "active" && (caseItem.status === "Đang Xem Xét")) ||
       (activeTab === "resolved" && (caseItem.status === "Đã Giải Quyết" || caseItem.status === "Đã Đóng")))
  );

  // Hàm hỗ trợ màu sắc cho trạng thái và mức độ nghiêm trọng
  const getStatusColor = (status) => {
    switch(status) {
      case 'Đang Xem Xét': return 'blue';
      case 'Đã Giải Quyết': return 'green';
      case 'Đã Đóng': return 'gray';
      default: return 'default';
    }
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Cao': return 'red';
      case 'Trung Bình': return 'orange';
      case 'Thấp': return 'green';
      default: return 'blue';
    }
  };
  
  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Xem chi tiết vụ việc
  const handleViewDetails = (caseItem) => {
    navigate(`${caseItem.id}`, { state: { caseData: caseItem } });
  };

  // Biểu tượng trạng thái
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Đang Xem Xét': return <ClockCircleOutlined className="text-blue-500" />;
      case 'Đã Giải Quyết': return <CheckCircleOutlined className="text-green-500" />;
      case 'Đã Đóng': return <CheckCircleOutlined className="text-gray-500" />;
      default: return <InfoCircleOutlined />;
    }
  };
  
  const columns = [
    {
      title: "Số.",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (id) => <span className="text-gray-500">{id}</span>,
    },
    {
      title: "Vụ Việc",
      dataIndex: "caseName",
      key: "caseName",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500 mt-1">
            Báo cáo: {formatDate(record.reportedDate)}
          </div>
        </div>
      )
    },
    {
      title: "Mức Độ Nghiêm Trọng",
      dataIndex: "severity",
      key: "severity",
      width: 120,
      render: (severity) => (
        <Tag color={getSeverityColor(severity)} className="capitalize">
          {severity}
        </Tag>
      )
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <div className="flex items-center">
          {getStatusIcon(status)}
          <span className="ml-2">{status}</span>
        </div>
      )
    },
    {
      title: "Chiến Dịch Bị Ảnh Hưởng",
      dataIndex: "affectedCampaigns",
      key: "affectedCampaigns",
      render: (campaigns) => (
        <div className="flex flex-col gap-1">
          {campaigns.map((campaign, index) => (
            <Tag key={index} className="w-fit">{campaign}</Tag>
          ))}
        </div>
      )
    },    
    {
      title: "Ngày Dự Kiến Giải Quyết",
      dataIndex: "expectedResolution",
      key: "expectedResolution",
      width: 150,
      render: (date, record) => (
        <span>
          {record.resolvedDate ? (
            <span className="text-green-600">
              {formatDate(record.resolvedDate)}
            </span>
          ) : (
            formatDate(date)
          )}
        </span>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 70,
      render: (text, record) => (
        <Tooltip title="Xem Chi Tiết">
          <button 
            onClick={() => handleViewDetails(record)}
            className="text-blue-500 hover:text-blue-700 flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 transition-all"
            aria-label="Xem chi tiết vụ việc"
          >
            <EyeOutlined />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1120px]">
      <div className="shadow-lg rounded-lg overflow-hidden p-0">
        {/* Gradient tiêu đề */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-800 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AuditOutlined className="text-white text-2xl mr-3" />
              <h1 className="text-xl font-bold text-white m-0">Các Vụ Điều Tra Gian Lận</h1>
            </div>
            <Tooltip title="Đây là các cuộc điều tra về các hoạt động gian lận tiềm ẩn ảnh hưởng đến chiến dịch của bạn.">
              <InfoCircleOutlined className="text-white text-lg cursor-pointer" />
            </Tooltip>
          </div>
          <p className="text-indigo-100 mt-2 mb-0">
            Xem các cuộc điều tra gian lận đang diễn ra và đã qua có thể ảnh hưởng đến chiến dịch quảng cáo của bạn.
          </p>  
        </div>

        {/* Nội dung */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="fraud-tabs"
            >
              <TabPane tab="Tất Cả Vụ Việc" key="all" />
              <TabPane 
                tab={
                  <span>
                    Điều Tra Đang Hoạt Động <Badge 
                      count={investigations.filter(c => c.status === "Đang Xem Xét").length} 
                      style={{ backgroundColor: '#1890ff' }} 
                    />
                  </span>
                } 
                key="active" 
              />
              <TabPane 
                tab={
                  <span>
                    Vụ Việc Đã Giải Quyết <Badge 
                      count={investigations.filter(c => c.status === "Đã Giải Quyết" || c.status === "Đã Đóng").length}
                      style={{ backgroundColor: '#52c41a' }} 
                    />
                  </span>
                } 
                key="resolved" 
              />
            </Tabs>

            <div className="flex items-center w-full md:w-auto">
              <Input
                placeholder="Tìm kiếm vụ việc"
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full md:w-64"
                allowClear
              />
              <Tooltip title="Tùy Chọn Lọc">
                <button className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <FilterOutlined />
                </button>
              </Tooltip>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Đang tải các vụ điều tra..." />
            </div>
          ) : filteredInvestigations.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredInvestigations.map((caseItem) => ({ ...caseItem, key: caseItem.id }))}
              pagination={{ 
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total) => `Tổng cộng ${total} vụ việc`,
                className: "mb-0"
              }}
              bordered={true}
              scroll={{ x: "max-content" }}
              rowClassName="border border-gray-200 hover:bg-gray-50"
            />
          ) : (
            <Empty 
              description="Không tìm thấy vụ điều tra nào phù hợp" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </div>
  );
}