"use client"

import { useState } from "react"
import { 
  Layout, 
  Menu, 
  Typography, 
  Card, 
  Table, 
  Tag, 
  Button, 
  Input, 
  Space, 
  Select,
  Tooltip,
  Badge,
  Divider,
  Row,
  Col
} from "antd"
import {
  BarChartOutlined,
  AimOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  WalletOutlined,
  WarningOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  MobileOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Option } = Select

export default function CampaignList() {
  const [selectedKey, setSelectedKey] = useState("campaigns")
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const menuItems = [
    {
      key: "overview",
      icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
      label: "Tổng quan",
    },
    {
      key: "campaigns",
      icon: <AimOutlined style={{ fontSize: "20px" }} />,
      label: "Chiến dịch",
    },
    {
      key: "reports",
      icon: <ClockCircleOutlined style={{ fontSize: "20px" }} />,
      label: "Báo cáo",
    },
    {
      key: "tools",
      icon: <ToolOutlined style={{ fontSize: "20px" }} />,
      label: "Tool",
    },
    {
      key: "payments",
      icon: <WalletOutlined style={{ fontSize: "20px" }} />,
      label: "Thanh toán",
    },
    {
      key: "violations",
      icon: <WarningOutlined style={{ fontSize: "20px" }} />,
      label: "Vi Phạm",
    },
  ]

  const campaigns = [
    {
      key: "1",
      name: "Shopee Siêu Sale 12.12",
      merchant: "Shopee",
      category: "E-commerce",
      commission: "Lên đến 12%",
      status: "Đang chạy",
      type: "CPS",
      platform: ["web", "mobile"],
      startDate: "01/12/2023",
      endDate: "12/12/2023",
      description: "Chương trình khuyến mãi lớn nhất năm của Shopee",
      earnings: "5,680,000đ",
      orders: 245,
    },
    {
      key: "2",
      name: "Lazada Khuyến Mãi Tết",
      merchant: "Lazada",
      category: "E-commerce",
      commission: "15% mọi đơn hàng",
      status: "Sắp diễn ra",
      type: "CPA",
      platform: ["web"],
      startDate: "15/12/2023",
      endDate: "31/12/2023",
      description: "Chương trình khuyến mãi Tết Nguyên Đán",
      earnings: "0đ",
      orders: 0,
    },
    {
      key: "3",
      name: "Tiki Săn Sale",
      merchant: "Tiki",
      category: "E-commerce",
      commission: "10% + 50k/đơn",
      status: "Đang chạy",
      type: "Hybrid",
      platform: ["web", "mobile"],
      startDate: "01/12/2023",
      endDate: "31/12/2023",
      description: "Chương trình khuyến mãi cuối năm",
      earnings: "2,890,000đ",
      orders: 156,
    },
    {
      key: "4",
      name: "Grab Food Delivery",
      merchant: "Grab",
      category: "Food & Beverage",
      commission: "25k/đơn thành công",
      status: "Tạm dừng",
      type: "CPA",
      platform: ["mobile"],
      startDate: "01/11/2023",
      endDate: "31/12/2023",
      description: "Chương trình đối tác giao đồ ăn",
      earnings: "1,250,000đ",
      orders: 50,
    },
  ]

  const columns = [
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space direction="vertical" size={1}>
          <Text strong>{text}</Text>
          <Space size={4}>
            {record.platform.includes("web") && (
              <Tooltip title="Web">
                <GlobalOutlined style={{ color: "#666" }} />
              </Tooltip>
            )}
            {record.platform.includes("mobile") && (
              <Tooltip title="Mobile">
                <MobileOutlined style={{ color: "#666" }} />
              </Tooltip>
            )}
          </Space>
        </Space>
      ),
    },
    {
      title: "Merchant",
      dataIndex: "merchant",
      key: "merchant",
      render: (text) => (
        <Space>
          <ShoppingOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      render: (text, record) => (
        <Space direction="vertical" size={1}>
          <Text strong style={{ color: "#3a7bd5" }}>{text}</Text>
          <Tag color="blue">{record.type}</Tag>
        </Space>
      ),
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <Space direction="vertical" size={1}>
          <Text>Bắt đầu: {record.startDate}</Text>
          <Text>Kết thúc: {record.endDate}</Text>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default"
        let icon = null
        
        switch (status) {
          case "Đang chạy":
            color = "success"
            icon = <CheckCircleOutlined />
            break
          case "Sắp diễn ra":
            color = "processing"
            icon = <ClockCircleOutlined />
            break
          case "Tạm dừng":
            color = "warning"
            icon = <WarningOutlined />
            break
          default:
            break
        }
        
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        )
      },
    },
    {
      title: "Thống kê",
      key: "stats",
      render: (_, record) => (
        <Space direction="vertical" size={1}>
          <Text>
            <DollarOutlined /> Doanh thu: {record.earnings}
          </Text>
          <Text>
            <ShoppingOutlined /> Đơn hàng: {record.orders}
          </Text>
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Link to={`/publisher/campaignlist/campaigndetail`}>
              <Button type="primary" icon={<EyeOutlined />} size="small">
                Chi tiết
              </Button>
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Card bordered={false} style={{ borderRadius: "12px" }}>
            <div style={{ marginBottom: "24px" }}>
              <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    Danh sách chiến dịch
                  </Title>
                </Col>
                <Col>
                  <Space size="middle">
                    <Input
                      placeholder="Tìm kiếm chiến dịch..."
                      prefix={<SearchOutlined />}
                      style={{ width: 250 }}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Select
                      defaultValue="all"
                      style={{ width: 150 }}
                      onChange={(value) => setFilterStatus(value)}
                    >
                      <Option value="all">Tất cả trạng thái</Option>
                      <Option value="running">Đang chạy</Option>
                      <Option value="upcoming">Sắp diễn ra</Option>
                      <Option value="paused">Tạm dừng</Option>
                    </Select>
                    <Select
                      defaultValue="all"
                      style={{ width: 150 }}
                      onChange={(value) => setFilterCategory(value)}
                    >
                      <Option value="all">Tất cả danh mục</Option>
                      <Option value="ecommerce">E-commerce</Option>
                      <Option value="food">Food & Beverage</Option>
                      <Option value="travel">Travel</Option>
                    </Select>
                    <Tooltip title="Lọc nâng cao">
                      <Button icon={<FilterOutlined />}>Lọc</Button>
                    </Tooltip>
                  </Space>
                </Col>
              </Row>
            </div>

            <Table
              columns={columns}
              dataSource={campaigns}
              pagination={{
                total: campaigns.length,
                pageSize: 10,
                showTotal: (total) => `Tổng ${total} chiến dịch`,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              style={{ marginTop: "8px" }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  )
}