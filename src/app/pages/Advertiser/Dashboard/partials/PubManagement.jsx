import { Table, Button, Input, Select, Card, Tabs, Tooltip, Badge, message } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import getAllPublisher from "../../../../modules/Publisher/getAllPublisher";

export default function PublisherManagement() {
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [activeTabKey, setActiveTabKey] = useState("all");
  const { TabPane } = Tabs;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllPublisher();
        setPublishers(data);
      } catch (error) {
        message.error("Không thể tải danh sách nhà phát hành.");
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const filteredPublishers = publishers.filter(
    (publisher) => {
      return (
        (searchTerm === "" ||
          publisher.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          publisher.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "Tất cả" || (publisher.isActive ? "Hoạt động" : "Không hoạt động") === statusFilter)
      );
    }
  );

  const totalPublishers = publishers.length;
  const activePublishers = publishers.filter(p => p.isActive).length;

  const columns = [
    {
      title: "STT",
      key: "no",
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <div>
          <div className="font-medium text-blue-700">{text}</div>
          <div className="text-xs text-gray-500">ID: {record.publisherId}</div>
        </div>
      ),
    },
    {
      title: "Công ty",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Người liên hệ",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2">    
          <Link to={`/advertiser/publisher-management/publisherdetail/${record.publisherId}`}>
            <Button size="small">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1100px]">
      <h1 className="text-2xl font-bold mb-6">Quản lý nhà phát hành</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <div className="text-gray-500 text-sm">Tổng số nhà phát hành</div>
          <div className="text-2xl font-bold mt-1">{totalPublishers}</div>
          <div className="text-xs text-green-500 mt-1">
            <Badge status="success" /> {activePublishers} Đang hoạt động
          </div>
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
                    placeholder="Tìm kiếm..."
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    style={{ width: 250 }}
                  />
                  <Select
                    defaultValue="Tất cả"
                    style={{ width: 180 }}
                    onChange={handleStatusChange}
                  >
                    <Select.Option value="Tất cả">Tất cả trạng thái</Select.Option>
                    <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                    <Select.Option value="Không hoạt động">Không hoạt động</Select.Option>
                  </Select>
                </div>       
              </div>              
              {/* Publishers Table */}
              <Table
                columns={columns}
                dataSource={filteredPublishers.map((publisher) => ({ ...publisher, key: publisher.publisherId }))}
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
