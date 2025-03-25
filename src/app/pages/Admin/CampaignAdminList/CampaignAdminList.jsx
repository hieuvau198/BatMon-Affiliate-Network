"use client"

import { ArrowLeftOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Drawer, Input, Row, Select, Table, Tag, Typography } from "antd"
import locale from "antd/es/date-picker/locale/vi_VN"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getCampaignList from "../../../modules/Campaign/getCampaignList"
import mock_campaignAdmin from "./mock_campaignAdmin"
import CampaignDetails from "./partials/CampaignDetails"

const { Title, Text, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const CampaignList = () => {
  const [dataSource, setDataSource] = useState(mock_campaignAdmin)
  const [searchText, setSearchText] = useState("")
  const [dateRange, setDateRange] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [filteredData, setFilteredData] = useState(dataSource)

  // Chi tiết chiến dịch
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false)
  const [campaignDetail, setCampaignDetail] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCampaignList()
        setDataSource(data)
      } catch (error) {
        console.error("Error fetching campaign list:", error)
      }
    }
    fetchData()
  }, [])

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

      <Drawer
        title="Chi tiết chiến dịch"
        placement="right"
        width={600}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
      >
        {campaignDetail && (
          <CampaignDetails
            campaignDetail={campaignDetail}
            getStatusTag={getStatusTag}
          />
        )}
      </Drawer>
    </div>
  )
}

export default CampaignList

