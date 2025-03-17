import { useState } from "react"
import { Table, Input, Button, DatePicker, Select, Space, Modal, Tooltip, Divider, message } from "antd"
import { SearchOutlined, ReloadOutlined, DownloadOutlined, EyeOutlined, ArrowLeftOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import mockTaxReportingData from "./mock_TaxReporting.json"
const { RangePicker } = DatePicker
const { Option } = Select

export default function TaxReporting() {
  // Sample data for the table
  const [data, setData] = useState(mockTaxReportingData)

  // State for search and filters
  const [searchText, setSearchText] = useState("")
  const [dateRange, setDateRange] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  // State for modals
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)

  // Handle view record
  const handleView = (record) => {
    setCurrentRecord(record)
    setViewModalVisible(true)
  }

  // Handle refresh
  const handleRefresh = () => {
    setSearchText("")
    setDateRange(null)
    setSelectedType(null)
    message.info("Đã làm mới bộ lọc")
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    message.success("Đã xuất dữ liệu ra file Excel")
    console.log("Exporting data to Excel:", data)
  }

  // Filter data based on search and filters
  const getFilteredData = () => {
    let filteredData = [...data]

    // Filter by search text
    if (searchText) {
      filteredData = filteredData.filter(
        (record) =>
          record.tenToKhai.toLowerCase().includes(searchText.toLowerCase()) ||
          record.nguoiGui.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]).getTime()
      const endDate = new Date(dateRange[1]).getTime()

      filteredData = filteredData.filter((record) => {
        const recordDate = new Date(record.ngayGuiFile).getTime()
        return recordDate >= startDate && recordDate <= endDate
      })
    }

    // Filter by type
    if (selectedType) {
      filteredData = filteredData.filter((record) => record.loaiToKhai === selectedType)
    }

    return filteredData
  }

  // Define table columns
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 70,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên tờ khai thuế",
      dataIndex: "tenToKhai",
      key: "tenToKhai",
      sorter: (a, b) => a.tenToKhai.localeCompare(b.tenToKhai),
    },
    {
      title: "Loại tờ khai",
      dataIndex: "loaiToKhai",
      key: "loaiToKhai",
      filters: [
        { text: "Tháng", value: "Tháng" },
        { text: "Quý", value: "Quý" },
        { text: "Năm", value: "Năm" },
      ],
      onFilter: (value, record) => record.loaiToKhai === value,
    },
    {
      title: "Lần nộp",
      dataIndex: "lanNop",
      key: "lanNop",
      sorter: (a, b) => a.lanNop - b.lanNop,
    },
    {
      title: "Ngày gửi file",
      dataIndex: "ngayGuiFile",
      key: "ngayGuiFile",
      sorter: (a, b) => new Date(a.ngayGuiFile) - new Date(b.ngayGuiFile),
      render: (text) => {
        const date = new Date(text)
        return date.toLocaleDateString("vi-VN")
      },
    },
    {
      title: "Tên người gửi",
      dataIndex: "nguoiGui",
      key: "nguoiGui",
      sorter: (a, b) => a.nguoiGui.localeCompare(b.nguoiGui),
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
  ]
  return (
    <div className="p-6 max-w-7xl mx-auto">
    <div className="mb-6">
    <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">Báo cáo tuân thủ thuế</h1>
    <Space>
      <Link to="../TaxDashboard">
        <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
          Tax Dashboard
        </Button>
      </Link>
          <Link to="../TaxPayment">
              <Button type="primary" className="bg-green-600 hover:bg-green-700">
                Payment Transaction History
              </Button>
         </Link>
    </Space>
    </div>
  </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm tờ khai" prefix={<SearchOutlined />}className="w-full"value={searchText} onChange={(e) => setSearchText(e.target.value)} allowClear
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
              placeholder="Loại tờ khai"
              className="w-full"
              allowClear
              value={selectedType}
              onChange={(value) => setSelectedType(value)}
            >
              <Option value="Tháng">Tháng</Option>
              <Option value="Quý">Quý</Option>
              <Option value="Năm">Năm</Option>
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
          rowClassName="hover:bg-gray-50"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} bản ghi`,
          }}
          className="border border-gray-200 rounded"
        />
      </div>

      {/* View Modal */}
      <Modal
        title="Chi tiết tờ khai thuế"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Tên tờ khai thuế</p>
                <p className="font-medium">{currentRecord.tenToKhai}</p>
              </div>
              <div>
                <p className="text-gray-500">Loại tờ khai</p>
                <p className="font-medium">{currentRecord.loaiToKhai}</p>
              </div>
              <div>
                <p className="text-gray-500">Lần nộp</p>
                <p className="font-medium">{currentRecord.lanNop}</p>
              </div>
              <div>
                <p className="text-gray-500">Ngày gửi file</p>
                <p className="font-medium">{new Date(currentRecord.ngayGuiFile).toLocaleDateString("vi-VN")}</p>
              </div>
              <div>
                <p className="text-gray-500">Người gửi</p>
                <p className="font-medium">{currentRecord.nguoiGui}</p>
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-medium mb-2">Thông tin bổ sung</h3>
              <p className="text-gray-600">
                Tờ khai đã được gửi và xác nhận bởi cơ quan thuế. Mã xác nhận:{" "}
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
