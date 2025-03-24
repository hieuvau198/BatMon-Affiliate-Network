import React, { useState, useEffect } from "react";
import { Table, Card, Tag, Tooltip, Spin, Empty, Input, Badge } from "antd";
import { InfoCircleOutlined, SafetyOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FraudRule = () => {
  const [rules, setRules] = useState([
    { 
      id: 1, 
      ruleName: "Chặn IP Rủi Ro Cao", 
      description: "Chặn các IP có lịch sử hoạt động gian lận hoặc từ các vị trí đáng ngờ.",
      severity: "cao",
      status: "hoạt động",
      lastUpdated: "2025-03-10T14:30:00",
      category: "Lọc IP"
    },
    { 
      id: 2, 
      ruleName: "Phát Hiện Nhiều Tài Khoản", 
      description: "Phát hiện nhiều tài khoản được tạo từ cùng một địa chỉ IP hoặc dấu vân tay thiết bị.",
      severity: "trung bình",
      status: "hoạt động",
      lastUpdated: "2025-03-12T09:15:00",
      category: "Bảo Mật Tài Khoản"
    },
    { 
      id: 3, 
      ruleName: "Ngăn Chặn Nhấp Chuột Gian Lận", 
      description: "Ngăn chặn số lượng nhấp chuột quá mức trong một khoảng thời gian ngắn từ cùng một nguồn.",
      severity: "cao",
      status: "hoạt động",
      lastUpdated: "2025-03-15T16:45:00",
      category: "Gian Lận Nhấp Chuột"
    },
    { 
      id: 4, 
      ruleName: "Xác Thực Thời Gian Chuyển Đổi", 
      description: "Đánh dấu các chuyển đổi xảy ra quá nhanh sau nhấp chuột là có khả năng gian lận.",
      severity: "trung bình",
      status: "hoạt động", 
      lastUpdated: "2025-03-20T11:20:00",
      category: "Xác Thực Chuyển Đổi"
    },
    { 
      id: 5, 
      ruleName: "Dấu Vân Tay Thiết Bị", 
      description: "Xác định và đánh dấu các thiết bị đáng ngờ dựa trên đặc điểm trình duyệt và phần cứng.",
      severity: "thấp",
      status: "hoạt động",
      lastUpdated: "2025-03-22T08:30:00",
      category: "Lọc Thiết Bị"
    }
  ]);
  
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedRule, setSelectedRule] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const navigate = useNavigate();

  // Mô phỏng tải dữ liệu
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Lọc quy tắc dựa trên tìm kiếm
  const filteredRules = rules.filter(
    rule => 
      rule.ruleName.toLowerCase().includes(searchText.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchText.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // Lấy màu cho thẻ mức độ nghiêm trọng
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'cao': return 'red';
      case 'trung bình': return 'orange';
      case 'thấp': return 'green';
      default: return 'blue';
    }
  };
  
  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Xem chi tiết quy tắc
  const handleViewDetails = (rule) => {
    navigate(`/advertiser/fraud-rule/${rule.id}`, { state: { rule } });
  };
  
  // Đóng chế độ xem chi tiết
  const handleCloseDetails = () => {
    setIsDetailsVisible(false);
    setTimeout(() => setSelectedRule(null), 300);
  };
  
  const columns = [
    {
      title: "Số.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Quy Tắc",
      dataIndex: "ruleName",
      key: "ruleName",
      render: (text, record) => (
        <div className="font-medium">{text}</div>
      )
    },
    {
      title: "Danh Mục",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color="blue">{category}</Tag>
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
      width: 120,
      render: (status) => (
        <Badge 
          status={status === "hoạt động" ? "success" : "default"} 
          text={<span className="capitalize">{status}</span>} 
        />
      )
    },
    {
      title: "Cập Nhật Lần Cuối",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      width: 200,
      render: (date) => formatDate(date)
    },
    {
      title: "Hành Động",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <Tooltip title="Xem Chi Tiết">
          <button 
            onClick={() => handleViewDetails(record)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-all"
          >
            <EyeOutlined className="text-lg" />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1200px]">
      <div className="shadow-lg rounded-lg overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SafetyOutlined className="text-white text-2xl mr-3" />
              <h1 className="text-xl font-bold text-white m-0">Quy Tắc Bảo Vệ Chống Gian Lận</h1>
            </div>
            <Tooltip title="Các quy tắc này được cấu hình bởi quản trị viên mạng để bảo vệ chống lại các hoạt động gian lận.">
              <InfoCircleOutlined className="text-white text-lg cursor-pointer" />
            </Tooltip>
          </div>
          <p className="text-blue-100 mt-2 mb-0">
            Các quy tắc này xác định cách hệ thống nhận diện và ngăn chặn các hoạt động gian lận trong chiến dịch quảng cáo của bạn.
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Tìm kiếm quy tắc theo tên, danh mục hoặc mô tả"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full max-w-md"
              allowClear
            />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Đang tải các quy tắc chống gian lận..." />
            </div>
          ) : filteredRules.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredRules.map((rule) => ({ ...rule, key: rule.id }))}
              pagination={{ 
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total) => `Tổng cộng ${total} quy tắc`,
                className: "mb-0"
              }}
              bordered={false}
              className="fraud-rules-table"
              scroll={{ x: "max-content" }}
              rowClassName="hover:bg-gray-50"
            />
          ) : (
            <Empty 
              description="Không tìm thấy quy tắc phù hợp" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
      
      {/* Drawer/Modal Chi Tiết Quy Tắc */}
      {selectedRule && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity ${isDetailsVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleCloseDetails}>
          <div 
            className={`bg-white rounded-lg w-full max-w-2xl transform transition-transform ${isDetailsVisible ? 'scale-100' : 'scale-95'} overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
              <h2 className="text-white font-bold text-lg m-0">{selectedRule.ruleName}</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Danh Mục</p>
                  <p className="font-medium">{selectedRule.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Mức Độ Nghiêm Trọng</p>
                  <Tag color={getSeverityColor(selectedRule.severity)} className="capitalize">
                    {selectedRule.severity}
                  </Tag>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Trạng Thái</p>
                  <Badge 
                    status={selectedRule.status === "hoạt động" ? "success" : "default"} 
                    text={<span className="capitalize">{selectedRule.status}</span>} 
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Cập Nhật Lần Cuối</p>
                  <p className="font-medium">{formatDate(selectedRule.lastUpdated)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-1">Mô Tả</p>
                <p className="text-gray-800">{selectedRule.description}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
                  <p className="text-blue-800 text-sm m-0">
                    Quy tắc này được quản lý bởi quản trị viên mạng. Nếu bạn cho rằng quy tắc này đang ảnh hưởng đến lưu lượng hợp pháp của bạn, vui lòng liên hệ với bộ phận hỗ trợ.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-end">
              <button 
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudRule;