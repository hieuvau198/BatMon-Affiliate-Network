import { Table, Button, Modal, Input, Select, Card, Tabs, Tooltip, Badge } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, PieChart, BarChart, SearchOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import publishersData from "./mock_pubmanagement.json";

export default function PublisherManagement() {
  const [publishers, setPublishers] = useState(publishersData);
  const [viewModal, setViewModal] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [activeTabKey, setActiveTabKey] = useState("all");
  const { TabPane } = Tabs;

  const openViewModal = (publisher) => {
    setSelectedPublisher({ ...publisher });
    setViewModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const filteredPublishers = publishers.filter(
    (publisher) => {
      return (
        (searchTerm === "" ||
          publisher.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "Tất cả" || publisher.status === statusFilter)
      );
    }
  );

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  // Stats for dashboard cards
  const totalPublishers = publishers.length;
  const activePublishers = publishers.filter(p => p.status === "Hoạt động").length;
  const totalTraffic = publishers.reduce((acc, curr) => acc + curr.traffic, 0);
  const totalConversions = publishers.reduce((acc, curr) => acc + curr.conversions, 0);
  const totalRevenue = "36.250.000đ";

  const columns = [
    {
      title: "STT",
      key: "no",
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nhà phát hành",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">ID: {record.id}</div>
        </div>
      ),
    },
    {
      title: "Lưu lượng",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic) => (
        <div className="text-right">{traffic.toLocaleString()}</div>
      ),
    },
    {
      title: "Chuyển đổi",
      dataIndex: "conversions",
      key: "conversions",
      render: (conversions) => (
        <div className="text-right">{conversions.toLocaleString()}</div>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => (
        <div className="text-right font-medium">{revenue}</div>
      ),
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      render: (commission) => (
        <div className="text-right text-orange-500">{commission}</div>
      ),
    },
    {
      title: "CTR",
      dataIndex: "ctr",
      key: "ctr",
      render: (ctr) => (
        <div className="text-right">{ctr}</div>
      ),
    },
  
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "Hoạt động"
              ? "bg-green-100 text-green-800"
              : status === "Đang chờ"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
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
          <Link to={`/advertiser/publisher-management/publisherdetail/${record.id}`}>
            <Button size="small">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1500px]">
      <h1 className="text-2xl font-bold mb-6">Quản lý nhà phát hành</h1>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Tổng số nhà phát hành</div>
          <div className="text-2xl font-bold mt-1">{totalPublishers}</div>
          <div className="text-xs text-green-500 mt-1">
            <Badge status="success" /> {activePublishers} Đang hoạt động
          </div>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Tổng lưu lượng</div>
          <div className="text-2xl font-bold mt-1">{totalTraffic.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">30 ngày qua</div>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Chuyển đổi</div>
          <div className="text-2xl font-bold mt-1">{totalConversions.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">30 ngày qua</div>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Doanh thu</div>
          <div className="text-2xl font-bold mt-1 text-green-600">{totalRevenue}</div>
          <div className="text-xs text-gray-500 mt-1">30 ngày qua</div>
        </Card>

        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Tỷ lệ chuyển đổi trung bình</div>
          <div className="text-2xl font-bold mt-1">{((totalConversions / totalTraffic) * 100).toFixed(2)}%</div>
          <div className="text-xs text-gray-500 mt-1">30 ngày qua</div>
        </Card>

      </div>
      
      <div className="bg-white rounded-md shadow-md min-h-[640px]">
        <Tabs 
          activeKey={activeTabKey} 
          onChange={handleTabChange}
          className="px-6 pt-4"
        >
          <TabPane tab="Tất cả nhà phát hành" key="all">
            <div className="p-6 pt-2">
              {/* Filters */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Tìm kiếm nhà phát hành..."
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    style={{ width: 250 }}
                  />
                  <Select
                    defaultValue="Tất cả"
                    style={{ width: 150 }}
                    onChange={handleStatusChange}
                  >
                    <Select.Option value="Tất cả">Tất cả trạng thái</Select.Option>
                    <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                    <Select.Option value="Đang chờ">Đang chờ</Select.Option>
                    <Select.Option value="Không hoạt động">Không hoạt động</Select.Option>
                  </Select>
                </div>       
              </div>              
              {/* Publishers Table */}
              <Table
                columns={columns}
                dataSource={filteredPublishers.map((publisher) => ({ ...publisher, key: publisher.id }))}
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: "max-content" }}
              />
            </div>
          </TabPane>     
        </Tabs>
      </div>
    </div>
  );
}