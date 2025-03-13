"use client"

import { useState, useEffect } from "react"
import {  Table,  Button,  Space,  Typography,  Tag,  Modal,  message,  Input,  DatePicker,  Drawer,  Descriptions,  Divider,  Card,  Row,  Col,  Avatar,} from "antd"
import {  SearchOutlined,  CalendarOutlined,  UserOutlined,  FileTextOutlined,  EyeOutlined,  UnorderedListOutlined,} from "@ant-design/icons"
import locale from "antd/es/date-picker/locale/vi_VN"
import { Link } from "react-router-dom"

const { Title, Paragraph, Text } = Typography
const { RangePicker } = DatePicker

import mockCampaignData from "./mock_CampaignApproval.json"

const CampaignApproval = () => {
  const [dataSource, setDataSource] = useState(mockCampaignData)

  const [modalVisible, setModalVisible] = useState(false)
  const [currentCampaign, setCurrentCampaign] = useState(null)
  const [actionType, setActionType] = useState("")
  const [searchText, setSearchText] = useState("")
  const [dateRange, setDateRange] = useState(null)
  const [filteredData, setFilteredData] = useState(dataSource)
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false)
  const [campaignDetail, setCampaignDetail] = useState(null)

  useEffect(() => {
    applyFilters()
  }, [searchText, dateRange, dataSource])

  const applyFilters = () => {
    let filtered = [...dataSource].filter((item) => item.status === "pending")
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.advertiserName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase()),
      )
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf("day")
      const endDate = dateRange[1].endOf("day")

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.createdDate)
        return itemDate >= startDate.toDate() && itemDate <= endDate.toDate()
      })
    }

    setFilteredData(filtered)
  }

  const showModal = (record, type) => {
    setCurrentCampaign(record)
    setActionType(type)
    setModalVisible(true)
  }

  const handleOk = () => {
    const newData = dataSource.map((item) => {
      if (item.campaignId === currentCampaign.campaignId) {
        return {
          ...item,
          status: actionType === "approve" ? "approved" : "rejected",
        }
      }
      return item
    })

    setDataSource(newData)
    setModalVisible(false)

    message.success(`Đã ${actionType === "approve" ? "duyệt" : "từ chối"} chiến dịch "${currentCampaign.name}"`)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
  }

  const resetFilters = () => {
    setSearchText("")
    setDateRange(null)
    setFilteredData(dataSource)
  }

  const showCampaignDetail = (record) => {
    setCampaignDetail(record)
    setDetailDrawerVisible(true)
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
      render: (status) => {
        let color = "gold"
        let text = "Chờ duyệt"

        if (status === "approved") {
          color = "green"
          text = "Đã duyệt"
        } else if (status === "rejected") {
          color = "red"
          text = "Không duyệt"
        }

        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => showModal(record, "approve")}
          >
            Duyệt
          </Button>
          <Button danger onClick={() => showModal(record, "reject")}>
            Không duyệt
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Title level={2}>Phê Duyệt Chiến Dịch</Title>
          <Space>
            <Link to="../CampaignAdminList">
              <Button type="primary" icon={<UnorderedListOutlined />} className="bg-blue-600 hover:bg-blue-700">
                Campaign List
              </Button>
            </Link>
            <Link to="../CompliancePolicy">
              <Button type="primary" icon={<FileTextOutlined />} className="bg-purple-600 hover:bg-purple-700">
                Compliance Policy
              </Button>
            </Link>
          </Space>
        </div>

        <Card className="mb-4 bg-gray-50">
          <Row gutter={16} align="bottom">
            <Col xs={24} md={12} lg={8}>
              <div className="mb-0">
                <Text strong className="block mb-2">
                  Tìm kiếm:
                </Text>
                <Input.Search
                  placeholder="Tìm theo tên, người tạo, mô tả..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="small"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full"
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="mb-0">
                <Text strong className="block mb-2">
                  Lọc theo ngày tạo:
                </Text>
                <RangePicker
                  className="w-full"
                  locale={locale}
                  format="DD/MM/YYYY"
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  size="small"
                />
              </div>
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

      {/* Modal xác nhận duyệt/từ chối */}
      <Modal
        title={actionType === "approve" ? "Xác nhận duyệt chiến dịch" : "Xác nhận từ chối chiến dịch"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={actionType === "approve" ? "Duyệt" : "Từ chối"}
        cancelText="Hủy"
        okButtonProps={{
          className: actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700",
        }}
      >
        <p>
          Bạn có chắc chắn muốn {actionType === "approve" ? "duyệt" : "từ chối"} chiến dịch "{currentCampaign?.name}"?
        </p>
      </Modal>

      {/* Drawer xem chi tiết chiến dịch */}
      <Drawer
        title="Chi tiết chiến dịch"
        placement="right"
        width={600}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
        extra={
          <Space>
            {campaignDetail?.status === "pending" && (
              <>
                <Button
                  type="primary"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setDetailDrawerVisible(false)
                    showModal(campaignDetail, "approve")
                  }}
                >
                  Duyệt
                </Button>
                <Button
                  danger
                  onClick={() => {
                    setDetailDrawerVisible(false)
                    showModal(campaignDetail, "reject")
                  }}
                >
                  Không duyệt
                </Button>
              </>
            )}
          </Space>
        }
      >
        {campaignDetail && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar size={64} icon={<FileTextOutlined />} className="bg-blue-500" />
              <div>
                <Title level={4} className="m-0">
                  {campaignDetail.name}
                </Title>
                <Tag
                  color={
                    campaignDetail.status === "approved"
                      ? "green"
                      : campaignDetail.status === "rejected"
                        ? "red"
                        : "gold"
                  }
                >
                  {campaignDetail.status === "approved"
                    ? "Đã duyệt"
                    : campaignDetail.status === "rejected"
                      ? "Không duyệt"
                      : "Chờ duyệt"}
                </Tag>
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
              {/* <Descriptions.Item label="Cập nhật lần cuối">
                {new Date(campaignDetail.lastUpdated).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Descriptions.Item> */}
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

export default CampaignApproval

