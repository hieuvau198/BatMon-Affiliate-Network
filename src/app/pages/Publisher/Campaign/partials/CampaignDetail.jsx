"use client"

import { useState } from "react"
import {
  Layout,
  Menu,
  Typography,
  Card,
  Button,
  Space,
  Tag,
  Divider,
  Row,
  Col,
  Tabs,
  Descriptions,
  Image,
  Statistic,
  Timeline,
  List,
  Avatar,
  Tooltip,
  Modal,
  Form,
  Checkbox,
  Alert,
  Progress
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
  ArrowLeftOutlined,
  ShoppingOutlined,
  DollarOutlined,
  CalendarOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  MobileOutlined,
  LikeOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarFilled,
  RightOutlined,
  LeftOutlined
} from "@ant-design/icons"

const { Header, Content } = Layout
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

export default function CampaignDetail() {
  const [selectedKey, setSelectedKey] = useState("campaigns")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

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

  // Sample campaign data
  const campaign = {
    id: "SHOP12122023",
    name: "Shopee Siêu Sale 12.12",
    merchant: "Shopee",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png",
    banner: "https://tse2.mm.bing.net/th?id=OIP.igJLABRafUEUJWTjs0sc6gHaEK&pid=Api&P=0&h=180",
    category: "E-commerce",
    commission: {
      type: "CPS",
      rate: "Lên đến 12%",
      details: [
        { category: "Thời trang", rate: "12%" },
        { category: "Điện tử", rate: "8%" },
        { category: "Gia dụng", rate: "10%" },
        { category: "Mỹ phẩm", rate: "15%" },
      ]
    },
    status: "Đang chạy",
    platform: ["web", "mobile"],
    startDate: "01/12/2023",
    endDate: "12/12/2023",
    description: "Chương trình khuyến mãi lớn nhất năm của Shopee với hàng ngàn sản phẩm giảm giá sốc và miễn phí vận chuyển toàn quốc.",
    longDescription: `
      Shopee 12.12 Birthday Sale là sự kiện mua sắm lớn nhất năm của Shopee, diễn ra từ ngày 01/12/2023 đến ngày 12/12/2023. 
      
      Trong thời gian diễn ra chương trình, khách hàng có thể tận hưởng nhiều ưu đãi hấp dẫn như:
      - Giảm giá lên đến 50% cho tất cả các sản phẩm
      - Miễn phí vận chuyển toàn quốc với đơn hàng từ 0đ
      - Flash Sale hàng ngày với giá sốc
      - Mã giảm giá độc quyền lên đến 100K
      - Hoàn xu 15% cho mọi đơn hàng
      
      Đây là cơ hội tuyệt vời để các Publisher tăng doanh thu cuối năm với mức hoa hồng hấp dẫn lên đến 12% tùy theo danh mục sản phẩm.
    `,
    rules: [
      "Không được sử dụng từ khóa thương hiệu để chạy quảng cáo Google, Facebook",
      "Không được sử dụng hình ảnh gây hiểu nhầm về chương trình khuyến mãi",
      "Không được tự ý tạo mã giảm giá hoặc khuyến mãi giả mạo",
      "Thời gian cookie: 30 ngày",
      "Thời gian duyệt đơn: 45-60 ngày sau khi đơn hàng hoàn thành",
    ],
    stats: {
      publishers: 1245,
      orders: 45678,
      revenue: "12,345,678,000đ",
      conversion: "3.5%"
    },
    materials: [
      { type: "Banner", size: "728x90", url: "https://example.com/banner1.jpg" },
      { type: "Banner", size: "300x250", url: "https://example.com/banner2.jpg" },
      { type: "Banner", size: "160x600", url: "https://example.com/banner3.jpg" },
      { type: "Social Media", size: "1200x628", url: "https://example.com/social1.jpg" },
    ],
    relatedCampaigns: [
      { id: "2", name: "Lazada Khuyến Mãi Tết", merchant: "Lazada", commission: "15% mọi đơn hàng" },
      { id: "3", name: "Tiki Săn Sale", merchant: "Tiki", commission: "10% + 50k/đơn" },
    ]
  }

  const handleRegister = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values)
      setIsModalVisible(false)
      // Show success message or redirect
    })
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>

      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumb and back button */}
          <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              style={{ marginRight: "16px", background: "blue" }}
              onClick={() => window.history.back()}
            >
              Quay lại danh sách
            </Button>
            <Text type="secondary">
              Chiến dịch / Chi tiết / {campaign.name}
            </Text>
          </div>

          {/* Campaign Banner */}
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              marginBottom: "24px",
              padding: 0,
              overflow: "hidden"
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ position: "relative" }}>
              <Image
                src={campaign.banner || "/placeholder.svg"}
                alt={campaign.name}
                preview={false}
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                padding: "40px 24px 24px",
                color: "white"
              }}>
                <Row align="middle" gutter={24}>
                  <Col>
                    <Avatar
                      src={campaign.logo}
                      size={80}
                      style={{
                        background: "white",
                        padding: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                    />
                  </Col>
                  <Col flex="1">
                    <Title level={2} style={{ color: "white", margin: 0 }}>
                      {campaign.name}
                    </Title>
                    <Space size="middle" style={{ marginTop: "8px" }}>
                      <Tag color="blue" icon={<ShoppingOutlined />}>{campaign.merchant}</Tag>
                      <Tag color="green" icon={<CheckCircleOutlined />}>{campaign.status}</Tag>
                      <Tag color="orange" icon={<DollarOutlined />}>{campaign.commission.type}</Tag>
                      {campaign.platform.includes("web") && (
                        <Tag icon={<GlobalOutlined />}>Web</Tag>
                      )}
                      {campaign.platform.includes("mobile") && (
                        <Tag icon={<MobileOutlined />}>Mobile</Tag>
                      )}
                    </Space>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleRegister}
                      style={{
                        background: "#ff4d4f",
                        borderColor: "#ff4d4f",
                        boxShadow: "0 4px 12px rgba(255,77,79,0.3)"
                      }}
                    >
                      Đăng ký tham gia
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>

          <Row gutter={24}>
            {/* Main Content */}
            <Col xs={24} lg={16}>
              <Card bordered={false} style={{ borderRadius: "12px", marginBottom: "24px" }}>
                <Tabs defaultActiveKey="overview">
                  <TabPane
                    tab={<span><InfoCircleOutlined /> Tổng quan</span>}
                    key="overview"
                  >
                    <div style={{ marginBottom: "24px" }}>
                      <Title level={4}>Mô tả chiến dịch</Title>
                      <Paragraph>
                        {campaign.description}
                      </Paragraph>
                      <Paragraph style={{ whiteSpace: "pre-line" }}>
                        {campaign.longDescription}
                      </Paragraph>
                    </div>

                    <Divider />

                    <div style={{ marginBottom: "24px" }}>
                      <Title level={4}>Thông tin hoa hồng</Title>
                      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                        <Descriptions.Item label="Loại hoa hồng">
                          <Tag color="blue">{campaign.commission.type}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mức hoa hồng">
                          <Text strong style={{ color: "#3a7bd5" }}>{campaign.commission.rate}</Text>
                        </Descriptions.Item>
                      </Descriptions>

                      <Title level={5} style={{ marginTop: "16px" }}>Chi tiết theo danh mục</Title>
                      <List
                        bordered
                        dataSource={campaign.commission.details}
                        renderItem={item => (
                          <List.Item>
                            <Text>{item.category}</Text>
                            <Text strong style={{ color: "#3a7bd5" }}>{item.rate}</Text>
                          </List.Item>
                        )}
                      />
                    </div>

                    <Divider />

                    <div>
                      <Title level={4}>Quy định chiến dịch</Title>
                      <List
                        dataSource={campaign.rules}
                        renderItem={(item, index) => (
                          <List.Item>
                            <Text>
                              {index + 1}. {item}
                            </Text>
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={<span><FileTextOutlined /> Tài liệu quảng cáo</span>}
                    key="materials"
                  >
                    <Title level={4}>Tài liệu quảng cáo</Title>
                    <Paragraph>
                      Sử dụng các tài liệu quảng cáo dưới đây để tăng hiệu quả cho chiến dịch của bạn.
                    </Paragraph>

                    <List
                      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
                      dataSource={campaign.materials}
                      renderItem={item => (
                        <List.Item>
                          <Card
                            hoverable
                            cover={
                              <div style={{
                                height: "120px",
                                background: "#f0f2f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}>
                                <FileTextOutlined style={{ fontSize: "32px", color: "#bfbfbf" }} />
                              </div>
                            }
                          >
                            <Card.Meta
                              title={`${item.type} (${item.size})`}
                              description={
                                <Button type="link" icon={<LinkOutlined />} style={{ padding: 0 }}>
                                  Tải xuống
                                </Button>
                              }
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </TabPane>

                  <TabPane
                    tab={<span><QuestionCircleOutlined /> Câu hỏi thường gặp</span>}
                    key="faq"
                  >
                    <Title level={4}>Câu hỏi thường gặp</Title>

                    <List
                      itemLayout="vertical"
                      dataSource={[
                        {
                          question: "Làm thế nào để tham gia chiến dịch này?",
                          answer: "Bạn có thể nhấn vào nút 'Đăng ký tham gia' ở trên đầu trang để đăng ký tham gia chiến dịch. Sau khi đăng ký, bạn sẽ nhận được link tiếp thị và có thể bắt đầu quảng bá ngay."
                        },
                        {
                          question: "Khi nào tôi sẽ nhận được hoa hồng?",
                          answer: "Hoa hồng sẽ được duyệt sau 45-60 ngày kể từ khi đơn hàng hoàn thành. Sau khi được duyệt, hoa hồng sẽ được cộng vào ví của bạn và có thể rút về tài khoản ngân hàng."
                        },
                        {
                          question: "Tôi có thể quảng bá chiến dịch này trên những kênh nào?",
                          answer: "Bạn có thể quảng bá chiến dịch trên website, blog, mạng xã hội, email marketing, và các kênh online khác. Tuy nhiên, cần tuân thủ các quy định của chiến dịch về việc sử dụng từ khóa và hình ảnh."
                        },
                      ]}
                      renderItem={item => (
                        <List.Item>
                          <Title level={5}>{item.question}</Title>
                          <Paragraph>{item.answer}</Paragraph>
                        </List.Item>
                      )}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>

            {/* Sidebar */}
            <Col xs={24} lg={8}>
              {/* Campaign Stats */}
              <Card
                title="Thống kê chiến dịch"
                bordered={false}
                style={{ borderRadius: "12px", marginBottom: "24px" }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Publisher tham gia"
                      value={campaign.stats.publishers}
                      prefix={<UserOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Đơn hàng"
                      value={campaign.stats.orders}
                      prefix={<ShoppingOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Doanh thu"
                      value={campaign.stats.revenue}
                      prefix={<DollarOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Tỷ lệ chuyển đổi"
                      value={campaign.stats.conversion}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Col>
                </Row>
              </Card>

              {/* Campaign Info */}
              <Card
                title="Thông tin chiến dịch"
                bordered={false}
                style={{ borderRadius: "12px", marginBottom: "24px" }}
              >
                <Descriptions column={1}>
                  <Descriptions.Item label="Mã chiến dịch">
                    {campaign.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian bắt đầu">
                    <Space>
                      <CalendarOutlined />
                      {campaign.startDate}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian kết thúc">
                    <Space>
                      <CalendarOutlined />
                      {campaign.endDate}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Tag color="green" icon={<CheckCircleOutlined />}>{campaign.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Danh mục">
                    {campaign.category}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div>
                  <Text strong>Tiến độ chiến dịch</Text>
                  <Progress
                    percent={75}
                    status="active"
                    style={{ marginTop: "8px" }}
                  />
                  <Text type="secondary">Còn 3 ngày nữa kết thúc</Text>
                </div>
              </Card>

              {/* Related Campaigns */}
              <Card
                title="Chiến dịch liên quan"
                bordered={false}
                style={{ borderRadius: "12px" }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={campaign.relatedCampaigns}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button type="link" icon={<RightOutlined />}>Xem</Button>
                      ]}
                    >
                      <List.Item.Meta
                        title={item.name}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text>{item.merchant}</Text>
                            <Text type="success">{item.commission}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Registration Modal */}
      <Modal
        title="Đăng ký tham gia chiến dịch"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText="Đăng ký"
        cancelText="Hủy"
        key="modal" // Added key prop here
      >
        <Alert
          message="Thông tin quan trọng"
          description="Bằng việc đăng ký tham gia chiến dịch này, bạn đồng ý tuân thủ tất cả các quy định của chiến dịch và điều khoản sử dụng của AffiHub."
          type="info"
          showIcon
          style={{ marginBottom: "24px" }}
        />

        <Form form={form} layout="vertical">
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Vui lòng đồng ý với điều khoản chiến dịch")),
              },
            ]}
          >
            <Checkbox>
              Tôi đã đọc và đồng ý với <a href="#">quy định chiến dịch</a> và <a href="#">điều khoản sử dụng</a>
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="promotion"
            valuePropName="checked"
          >
            <Checkbox>
              Tôi muốn nhận thông báo về các chiến dịch tương tự trong tương lai
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
