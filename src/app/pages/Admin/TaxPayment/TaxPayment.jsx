import { useState } from "react";
import { Link } from "react-router-dom";
import {   Layout,   Card,   Typography,   Table,   Button,   Input,   DatePicker,   Select,   Space,   Tag,   Modal,   Divider,   Statistic,   Tooltip,  message } from "antd";
import {   SearchOutlined,   ReloadOutlined,   DownloadOutlined,   EyeOutlined,   ArrowLeftOutlined,  CheckCircleOutlined,  CloseCircleOutlined,  ClockCircleOutlined,  DollarOutlined} from "@ant-design/icons";
import mockPaymentData from "./mock_TaxPayment.json"

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

export default function TaxPayment() {
  const [data, setData] = useState(mockPaymentData);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Handle view record
  const handleView = (record) => {
    setCurrentRecord(record);
    setViewModalVisible(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    setSearchText("");
    setDateRange(null);
    setSelectedStatus(null);
    setSelectedType(null);
    message.info("Đã làm mới bộ lọc");
  };

  // Handle export to Excel
  const handleExportExcel = () => {
    message.success("Đã xuất dữ liệu ra file Excel");
    console.log("Exporting data to Excel:", getFilteredData());
  };

  // Get status tag
  const getStatusTag = (status) => {
    switch(status) {
      case "Completed":
        return <Tag icon={<CheckCircleOutlined />} color="success">Hoàn thành</Tag>;
      case "Pending":
        return <Tag icon={<ClockCircleOutlined />} color="warning">Đang xử lý</Tag>;
      case "Processing":
        return <Tag icon={<ClockCircleOutlined />} color="processing">Đang xử lý</Tag>;
      case "Failed":
        return <Tag icon={<CloseCircleOutlined />} color="error">Thất bại</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // Filter data based on search and filters
  const getFilteredData = () => {
    let filteredData = [...data];

    // Filter by search text
    if (searchText) {
      filteredData = filteredData.filter(
        (record) =>
          record.requestId.toLowerCase().includes(searchText.toLowerCase()) ||
          record.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
          record.notes.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]).getTime();
      const endDate = new Date(dateRange[1]).getTime();

      filteredData = filteredData.filter((record) => {
        const recordDate = new Date(record.paymentDate).getTime();
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    // Filter by status
    if (selectedStatus) {
      filteredData = filteredData.filter((record) => record.status === selectedStatus);
    }

    // Filter by type
    if (selectedType) {
      filteredData = filteredData.filter((record) => record.requestType === selectedType);
    }

    return filteredData;
  };

  // Calculate summary statistics
  const filteredData = getFilteredData();
  const totalTransactions = filteredData.length;
  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const completedTransactions = filteredData.filter(item => item.status === "Completed").length;
  const completedAmount = filteredData.filter(item => item.status === "Completed").reduce((sum, item) => sum + item.amount, 0);

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
    },
    {
      title: "Loại thuế",
      dataIndex: "requestType",
      key: "requestType",
      filters: [
        { text: "GTGT", value: "GTGT" },
        { text: "TNDN", value: "TNDN" },
        { text: "TNCN", value: "TNCN" },
        { text: "Phí", value: "Phí" },
      ],
      onFilter: (value, record) => record.requestType === value,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
    },
   
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
      filters: [
        { text: "Hoàn thành", value: "Completed" },
        { text: "Đang xử lý", value: "Pending" },
        { text: "Đang xử lý", value: "Processing" },
        { text: "Thất bại", value: "Failed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleView(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Title level={2}>Lịch sử giao dịch thanh toán thuế</Title>
          <Space>
            <Link to="../TaxDashboard">
              <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
                Tax Dashboard
              </Button>
            </Link>
            <Link to="../TaxReporting">
              <Button type="primary" className="bg-green-600 hover:bg-green-700">
                Tax Compliance Report
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card bordered={false} className="shadow-sm">
          <Statistic
            title="Tổng số giao dịch"
            value={totalTransactions}
            valueStyle={{ color: "#1890ff" }}
            prefix={<DollarOutlined />}
          />
        </Card>
        <Card bordered={false} className="shadow-sm">
          <Statistic
            title="Tổng số tiền"
            value={totalAmount}
            precision={0}
            formatter={(value) => formatCurrency(value)}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>

        <Card bordered={false} className="shadow-sm">
          <Statistic
            title="Số tiền đã thanh toán"
            value={completedAmount}
            precision={0}
            formatter={(value) => formatCurrency(value)}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm giao dịch"
              prefix={<SearchOutlined />}
              className="w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          <div className="flex-1">
            <RangePicker
              className="w-full"
              placeholder={["Từ ngày", "Đến ngày"]}
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
            />
          </div>
         
          <div className="flex-1">
            <Select
              placeholder="Loại thuế"
              className="w-full"
              allowClear
              value={selectedType}
              onChange={(value) => setSelectedType(value)}
            >
              <Option value="GTGT">GTGT</Option>
              <Option value="TNDN">TNDN</Option>
              <Option value="TNCN">TNCN</Option>
              <Option value="Phí">Phí</Option>
            </Select>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Làm mới
            </Button>
            <Button
              icon={<DownloadOutlined />}
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleExportExcel}
            >
              Xuất Excel
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={getFilteredData()}
          rowClassName={(record) => 
            record.status === "Failed" 
              ? "bg-red-50" 
              : record.status === "Completed" 
                ? "bg-green-50" 
                : ""
          }
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} giao dịch`,
          }}
          summary={(pageData) => {
            const pageTotal = pageData.reduce((sum, item) => sum + item.amount, 0);
            
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <strong>Tổng cộng trang hiện tại</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <strong>{formatCurrency(pageTotal)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} colSpan={4}></Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
          className="border border-gray-200 rounded"
        />
      </div>

      {/* View Modal */}
      <Modal
        title="Chi tiết giao dịch thanh toán"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        {currentRecord && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Title level={4}>{currentRecord.requestType}</Title>
              {getStatusTag(currentRecord.status)}
            </div>
            
            <Divider />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-gray-500">Mã giao dịch</Text>
                <p className="font-medium">{currentRecord.transactionId}</p>
              </div>
              <div>
                <Text className="text-gray-500">Mã yêu cầu</Text>
                <p className="font-medium">{currentRecord.requestId}</p>
              </div>
              <div>
                <Text className="text-gray-500">Số tiền</Text>
                <p className="font-medium">{formatCurrency(currentRecord.amount)}</p>
              </div>
              <div>
                <Text className="text-gray-500">Ngày giao dịch</Text>
                <p className="font-medium">{formatDate(currentRecord.paymentDate)}</p>
              </div>
              <div>
                <Text className="text-gray-500">Loại tiền tệ</Text>
                <p className="font-medium">{currentRecord.currencyCode}</p>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <Text className="text-gray-500">Ghi chú</Text>
              <p className="font-medium">{currentRecord.notes}</p>
            </div>
            
          </div>
        )}
      </Modal>
    </div>
  );
}