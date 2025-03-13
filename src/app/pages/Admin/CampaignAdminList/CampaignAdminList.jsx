"use client"

import { useState, useEffect } from "react"
import { Table,  Typography,  Tag,  Card,  Input,  Button,  DatePicker,  Select,  Row,  Col,  Drawer,  Descriptions,  Divider,  Avatar,} from "antd"
import {  SearchOutlined,  ArrowLeftOutlined,  EyeOutlined,  FileTextOutlined,  UserOutlined,  CalendarOutlined,} from "@ant-design/icons"
import { Link } from "react-router-dom"
import locale from "antd/es/date-picker/locale/vi_VN"
import mock_campaignAdmin from "./mock_campaignAdmin" // Import mock data

const { Title, Text, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const CampaignList = () => {
  const [dataSource] = useState(mock_campaignAdmin)
  const [searchText, setSearchText] = useState("")
  const [dateRange, setDateRange] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [filteredData, setFilteredData] = useState(dataSource)

  // Chi tiết chiến dịch
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false)
  const [campaignDetail, setCampaignDetail] = useState(null)

  // Effect để lọc dữ liệu khi bất kỳ filter nào thay đổi
  useEffect(() => {
    let filtered = [...dataSource]

    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.advertiser && item.advertiser.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchText.toLowerCase())),
      )
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf("day").toDate()
      const endDate = dateRange[1].endOf("day").toDate()

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.createdDate)
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    setFilteredData(filtered)
  }, [searchText, dateRange, statusFilter, dataSource])

  const resetFilters = () => {
    setSearchText("")
    setDateRange(null)
    setStatusFilter(null)
  }

  const showCampaignDetail = (record) => {
    setCampaignDetail(record)
    setDetailDrawerVisible(true)
  }

  // Add the missing getStatusTag function
  const getStatusTag = (status) => {
    const statusMapping = {
      active: { color: "green", text: "Đang hoạt động" },
      pending: { color: "gold", text: "Chờ xác nhận" },
      rejected: { color: "red", text: "Bị từ chối" },
      paused: { color: "blue", text: "Tạm ngừng" },
      deleted: { color: "gray", text: "Đã xóa" },
      running: { color: "green", text: "Đang chạy" },
      approved: { color: "blue", text: "Đã Xác nhận" },
    }
    const { color, text } = statusMapping[status] || { color: "default", text: status }
    return <Tag color={color}>{text}</Tag>
  }

    const columns = [
      {
        title: "STT",
        dataIndex: "campaignId",
        key: "campaignId",
        width: 70,
      },
      {
        title: "Tên Chiến Dịch",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <a className="font-medium text-blue-600 hover:text-blue-800" onClick={() => showCampaignDetail(record)}>
            {text}
          </a>
        ),
      },
      {
        title: "Advertiser",
        dataIndex: "advertiserName",
        key: "advertiserName",
      },
      {
        title: "Ngày Tạo",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (date) => {
          const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          return formattedDate
        },
      },
      {
        title: "Mô Tả",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        width: 150,
        render: (_, record) => (
          <Button type="default" icon={<EyeOutlined />} onClick={() => showCampaignDetail(record)}>
            Chi tiết
          </Button>
        ),
      },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Title level={2}>Danh Sách Chiến Dịch</Title>
          <Link to="../AdminCampaignApproval">
            <Button icon={<ArrowLeftOutlined />} className="hover:bg-gray-100">
              Quay lại phê duyệt
            </Button>
          </Link>
        </div>

        <Card className="mb-4 bg-gray-50">
          <Row gutter={16} align="bottom">
            <Col xs={24} md={8} lg={6}>
              <Text strong className="block mb-2">
                Tìm kiếm:
              </Text>
              <Input.Search
                placeholder="Tìm theo tên, advertiser, mô tả..."
                allowClear
                enterButton={<SearchOutlined />}
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full"
              />
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Text strong className="block mb-2">
                Lọc theo ngày tạo:
              </Text>
              <RangePicker
                className="w-full"
                locale={locale}
                format="DD/MM/YYYY"
                placeholder={["Từ ngày", "Đến ngày"]}
                value={dateRange}
                onChange={setDateRange}
                size="small"
              />
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Text strong className="block mb-2">
                Trạng thái:
              </Text>
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                className="w-full"
                size="small"
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="active">Đang hoạt động</Option>
                <Option value="pending">Chờ xác nhận</Option>
                <Option value="rejected">Bị từ chối</Option>
                <Option value="paused">Tạm ngừng</Option>
                <Option value="deleted">Đã xóa</Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowClassName="hover:bg-gray-50"
        className="shadow-md rounded-md"
      />

      {/* Drawer xem chi tiết chiến dịch */}
      <Drawer
        title="Chi tiết chiến dịch"
        placement="right"
        width={600}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
      >
        {campaignDetail && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar size={64} icon={<FileTextOutlined />} className="bg-blue-500" />
              <div>
                <Title level={4} className="m-0">
                  {campaignDetail.name}
                </Title>
                {getStatusTag(campaignDetail.status)}
              </div>
            </div>

            <Divider />

<Descriptions bordered column={1} size="small">
  <Descriptions.Item label="Advertiser">
    <div className="flex items-center">
      <UserOutlined className="mr-2" /> {campaignDetail.advertiserName}
    </div>
  </Descriptions.Item>
  <Descriptions.Item label="Ngày tạo">
    <div className="flex items-center">
      <CalendarOutlined className="mr-2" />
      {new Date(campaignDetail.createdDate).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
  </Descriptions.Item>
  <Descriptions.Item label="Ngân sách">
    {campaignDetail.budget} {campaignDetail.currencyCode}
  </Descriptions.Item>
  <Descriptions.Item label="Thời gian thực hiện">
    {new Date(campaignDetail.startDate).toLocaleDateString("vi-VN")} -{" "}
    {new Date(campaignDetail.endDate).toLocaleDateString("vi-VN")}
  </Descriptions.Item>
  <Descriptions.Item label="Quốc gia mục tiêu">{campaignDetail.targetingCountries}</Descriptions.Item>
  <Descriptions.Item label="Thiết bị mục tiêu">{campaignDetail.targetingDevices}</Descriptions.Item>
  <Descriptions.Item label="Giới hạn ngày">
    {campaignDetail.dailyCap} {campaignDetail.currencyCode}
  </Descriptions.Item>
  <Descriptions.Item label="Giới hạn tháng">
    {campaignDetail.monthlyCap} {campaignDetail.currencyCode}
  </Descriptions.Item>
  <Descriptions.Item label="Tỷ lệ chuyển đổi">{campaignDetail.conversionRate}%</Descriptions.Item>
  <Descriptions.Item label="Cập nhật lần cuối">
    {new Date(campaignDetail.lastUpdated).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </Descriptions.Item>
  <Descriptions.Item label="Chiến dịch riêng tư">
    {campaignDetail.isPrivate ? "Có" : "Không"}
  </Descriptions.Item>
</Descriptions>

<Divider orientation="left">Thông tin chi tiết</Divider>

<Card title="Mô tả" size="small" className="bg-gray-50">
  <Paragraph>{campaignDetail.description}</Paragraph>
</Card>
</div>
)}
</Drawer>
</div>
)
}

export default CampaignList

