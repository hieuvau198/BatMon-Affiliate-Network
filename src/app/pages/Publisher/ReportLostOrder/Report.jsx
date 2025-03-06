"use client"

import { useState } from "react"
import { 
  Layout, 
  Menu, 
  Typography, 
  Card, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Upload, 
  Table, 
  Tag, 
  Space, 
  Divider, 
  Steps, 
  Collapse, 
  Alert,
  Row,
  Col,
  Tooltip,
  Modal,
  Descriptions,
  Timeline
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
  QuestionCircleOutlined,
  UploadOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LinkOutlined
} from "@ant-design/icons"

const { Header, Content } = Layout
const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Step } = Steps
const { Panel } = Collapse
const { TextArea } = Input
const { RangePicker } = DatePicker

export default function ReportLostOrder() {
  const [selectedKey, setSelectedKey] = useState("reports")
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

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

  // Sample data for previous reports
  const reportData = [
    {
      key: '1',
      id: 'LO-2023-001',
      campaign: 'Shopee Siêu Sale 12.12',
      orderDate: '10/12/2023',
      reportDate: '15/12/2023',
      amount: '1,250,000đ',
      status: 'Đang xử lý',
    },
    {
      key: '2',
      id: 'LO-2023-002',
      campaign: 'Lazada Khuyến Mãi Tết',
      orderDate: '05/12/2023',
      reportDate: '08/12/2023',
      amount: '850,000đ',
      status: 'Đã duyệt',
    },
    {
      key: '3',
      id: 'LO-2023-003',
      campaign: 'Tiki Săn Sale',
      orderDate: '01/12/2023',
      reportDate: '05/12/2023',
      amount: '450,000đ',
      status: 'Từ chối',
    },
  ]

  const columns = [
    {
      title: 'Mã báo cáo',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Chiến dịch',
      dataIndex: 'campaign',
      key: 'campaign',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'reportDate',
      key: 'reportDate',
    },
    {
      title: 'Giá trị',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'default';
        let icon = null;
        
        if (status === 'Đã duyệt') {
          color = 'success';
          icon = <CheckCircleOutlined />;
        } else if (status === 'Đang xử lý') {
          color = 'processing';
          icon = <ClockCircleOutlined />;
        } else if (status === 'Từ chối') {
          color = 'error';
          icon = <CloseCircleOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => setIsModalVisible(true)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ]

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Handle form submission
    setCurrentStep(1);
    setTimeout(() => {
      setCurrentStep(2);
      form.resetFields();
    }, 2000);
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
              style={{ marginRight: "16px", background:"blue"}}
              onClick={() => window.history.back()}
            >
              Quay lại báo cáo
            </Button>
            <Text type="secondary">
              Báo cáo / Báo cáo đơn hàng bị mất
            </Text>
          </div>

          <Card 
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <WarningOutlined style={{ color: "#faad14", marginRight: "8px" }} />
                <span>Báo Cáo Đơn Hàng Bị Mất</span>
              </div>
            } 
            bordered={false} 
            style={{ borderRadius: "12px", marginBottom: "24px" }}
          >
            <Alert
              message="Thông tin quan trọng"
              description={
                <div>
                  <p>Vui lòng cung cấp đầy đủ thông tin về đơn hàng bị mất để chúng tôi có thể xác minh và xử lý nhanh chóng.</p>
                  <p>Thời gian xử lý báo cáo: 3-5 ngày làm việc.</p>
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: "24px" }}
            />

            <Steps 
              current={currentStep} 
              style={{ marginBottom: "32px" }}
              items={[
                {
                  title: 'Gửi báo cáo',
                  description: 'Điền thông tin',
                  icon: <FileTextOutlined />
                },
                {
                  title: 'Đang xử lý',
                  description: 'Xác minh thông tin',
                  icon: <ClockCircleOutlined />
                },
                {
                  title: 'Hoàn thành',
                  description: 'Kết quả xử lý',
                  icon: <CheckCircleOutlined />
                }
              ]}
            />

            {currentStep === 0 && (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
              >
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="campaign"
                      label="Chiến dịch"
                      rules={[{ required: true, message: 'Vui lòng chọn chiến dịch' }]}
                    >
                      <Select placeholder="Chọn chiến dịch">
                        <Option value="shopee">Shopee Siêu Sale 12.12</Option>
                        <Option value="lazada">Lazada Khuyến Mãi Tết</Option>
                        <Option value="tiki">Tiki Săn Sale</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="orderDate"
                      label="Ngày đặt hàng"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
                    >
                      <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="orderID"
                      label="Mã đơn hàng"
                      rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
                    >
                      <Input placeholder="Nhập mã đơn hàng" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="orderAmount"
                      label="Giá trị đơn hàng"
                      rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng' }]}
                    >
                      <Input placeholder="Nhập giá trị đơn hàng" addonAfter="VNĐ" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="trackingLink"
                  label="Link theo dõi đơn hàng (nếu có)"
                >
                  <Input 
                    placeholder="https://" 
                    addonBefore={<LinkOutlined />} 
                  />
                </Form.Item>

                <Form.Item
                  name="customerInfo"
                  label={
                    <span>
                      Thông tin khách hàng
                      <Tooltip title="Chỉ cung cấp thông tin cần thiết để xác minh đơn hàng, đảm bảo tuân thủ quy định bảo mật">
                        <InfoCircleOutlined style={{ marginLeft: 8 }} />
                      </Tooltip>
                    </span>
                  }
                >
                  <Input placeholder="Tên khách hàng hoặc thông tin liên hệ (nếu có)" />
                </Form.Item>

                <Form.Item
                  name="reason"
                  label="Lý do báo cáo"
                  rules={[{ required: true, message: 'Vui lòng nhập lý do báo cáo' }]}
                >
                  <Select placeholder="Chọn lý do">
                    <Option value="not_tracked">Đơn hàng không được ghi nhận</Option>
                    <Option value="wrong_commission">Hoa hồng không chính xác</Option>
                    <Option value="cancelled">Đơn hàng bị hủy nhưng đã giao thành công</Option>
                    <Option value="other">Lý do khác</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Mô tả chi tiết"
                  rules={[{ required: true, message: 'Vui lòng mô tả chi tiết vấn đề' }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Mô tả chi tiết về đơn hàng và lý do bạn tin rằng đơn hàng này thuộc về bạn" 
                  />
                </Form.Item>

                <Form.Item
                  name="evidence"
                  label="Bằng chứng"
                  extra="Hỗ trợ định dạng: JPG, PNG, PDF. Kích thước tối đa: 5MB"
                  rules={[{ required: true, message: 'Vui lòng tải lên bằng chứng' }]}
                >
                  <Upload 
                    name="file" 
                    action="/upload.do" 
                    listType="picture"
                    maxCount={3}
                    beforeUpload={() => false} // Prevent actual upload in this demo
                  >
                    <Button icon={<UploadOutlined />}>Tải lên bằng chứng</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Gửi báo cáo
                    </Button>
                    <Button onClick={() => form.resetFields()}>
                      Làm lại
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}

            {currentStep === 1 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ marginBottom: '24px' }}>
                  <ClockCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
                <Title level={3}>Đang xử lý báo cáo của bạn</Title>
                <Paragraph>
                  Chúng tôi đang xác minh thông tin đơn hàng. Vui lòng đợi trong giây lát...
                </Paragraph>
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ marginBottom: '24px' }}>
                  <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                </div>
                <Title level={3}>Báo cáo đã được gửi thành công!</Title>
                <Paragraph>
                  Mã báo cáo của bạn là: <Text strong>LO-2023-004</Text>
                </Paragraph>
                <Paragraph>
                  Chúng tôi sẽ xem xét báo cáo của bạn trong vòng 3-5 ngày làm việc. 
                  Bạn có thể theo dõi trạng thái báo cáo trong danh sách bên dưới.
                </Paragraph>
                <Button 
                  type="primary" 
                  onClick={() => setCurrentStep(0)}
                  style={{ marginTop: '16px' }}
                >
                  Tạo báo cáo mới
                </Button>
              </div>
            )}
          </Card>

          <Card 
            title="Các báo cáo đã gửi" 
            bordered={false} 
            style={{ borderRadius: "12px" }}
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setCurrentStep(0);
                  form.resetFields();
                }}
              >
                Tạo báo cáo mới
              </Button>
            }
          >
            <Table 
              columns={columns} 
              dataSource={reportData} 
              pagination={{ pageSize: 5 }}
            />
          </Card>

          <Card 
            title="Câu hỏi thường gặp" 
            bordered={false} 
            style={{ borderRadius: "12px", marginTop: "24px" }}
          >
            <Collapse bordered={false}>
              <Panel 
                header="Khi nào tôi nên báo cáo đơn hàng bị mất?" 
                key="1"
              >
                <p>
                  Bạn nên báo cáo đơn hàng bị mất khi bạn chắc chắn rằng đơn hàng đã được đặt thông qua link tiếp thị của bạn nhưng không được ghi nhận trong hệ thống. Trước khi báo cáo, hãy đảm bảo:
                </p>
                <ul>
                  <li>Đã qua thời gian xử lý thông thường (24-48 giờ)</li>
                  <li>Đơn hàng đã được xác nhận và thanh toán</li>
                  <li>Bạn có bằng chứng về việc khách hàng đã sử dụng link tiếp thị của bạn</li>
                </ul>
              </Panel>
              <Panel 
                header="Tôi cần cung cấp những bằng chứng gì?" 
                key="2"
              >
                <p>
                  Các bằng chứng hữu ích bao gồm:
                </p>
                <ul>
                  <li>Ảnh chụp màn hình xác nhận đơn hàng</li>
                  <li>Email xác nhận từ merchant</li>
                  <li>Lịch sử click từ khách hàng (nếu có)</li>
                  <li>Thông tin liên hệ của khách hàng (nếu được phép)</li>
                  <li>Bất kỳ thông tin nào khác có thể giúp xác minh đơn hàng thuộc về bạn</li>
                </ul>
              </Panel>
              <Panel 
                header="Mất bao lâu để xử lý báo cáo?" 
                key="3"
              >
                <p>
                  Thông thường, chúng tôi sẽ xử lý báo cáo trong vòng 3-5 ngày làm việc. Tuy nhiên, thời gian có thể kéo dài hơn trong các trường hợp sau:
                </p>
                <ul>
                  <li>Cần thêm thông tin để xác minh</li>
                  <li>Cần liên hệ với merchant để xác nhận đơn hàng</li>
                  <li>Trong các dịp cao điểm hoặc chương trình khuyến mãi lớn</li>
                </ul>
              </Panel>
              <Panel 
                header="Tôi có thể hủy báo cáo không?" 
                key="4"
              >
                <p>
                  Bạn có thể hủy báo cáo nếu nó đang ở trạng thái "Đang xử lý". Sau khi báo cáo đã được xử lý (Đã duyệt hoặc Từ chối), bạn không thể hủy báo cáo.
                </p>
              </Panel>
              <Panel 
                header="Nếu báo cáo bị từ chối thì sao?" 
                key="5"
              >
                <p>
                  Nếu báo cáo bị từ chối, bạn sẽ nhận được thông báo về lý do từ chối. Trong một số trường hợp, bạn có thể gửi lại báo cáo với thông tin bổ sung nếu bạn vẫn tin rằng đơn hàng thuộc về bạn.
                </p>
              </Panel>
            </Collapse>
          </Card>
        </div>
      </Content>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết báo cáo"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Mã báo cáo">LO-2023-001</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color="processing" icon={<ClockCircleOutlined />}>Đang xử lý</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Chiến dịch">Shopee Siêu Sale 12.12</Descriptions.Item>
          <Descriptions.Item label="Ngày đặt hàng">10/12/2023</Descriptions.Item>
          <Descriptions.Item label="Mã đơn hàng">SP12345678</Descriptions.Item>
          <Descriptions.Item label="Giá trị đơn hàng">1,250,000đ</Descriptions.Item>
          <Descriptions.Item label="Ngày báo cáo">15/12/2023</Descriptions.Item>
          <Descriptions.Item label="Lý do báo cáo">Đơn hàng không được ghi nhận</Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            Khách hàng đã click vào link của tôi và đặt hàng thành công, nhưng đơn hàng không được ghi nhận trong hệ thống. Tôi đã kiểm tra và xác nhận khách hàng đã nhận được sản phẩm.
          </Descriptions.Item>
          <Descriptions.Item label="Bằng chứng" span={2}>
            <Space>
              <Button type="link" icon={<FileTextOutlined />}>
                order_confirmation.jpg
              </Button>
              <Button type="link" icon={<FileTextOutlined />}>
                tracking_info.pdf
              </Button>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú từ Admin" span={2}>
            Đang xác minh thông tin với Shopee. Dự kiến hoàn thành xử lý vào ngày 18/12/2023.
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5}>Lịch sử xử lý</Title>
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <>
                  <p><Text strong>Đã tiếp nhận báo cáo</Text></p>
                  <p>15/12/2023 10:30</p>
                </>
              ),
            },
            {
              color: 'blue',
              children: (
                <>
                  <p><Text strong>Đang xác minh với Merchant</Text></p>
                  <p>16/12/2023 14:45</p>
                </>
              ),
            },
            {
              color: 'gray',
              children: (
                <>
                  <p><Text strong>Dự kiến hoàn thành</Text></p>
                  <p>18/12/2023</p>
                </>
              ),
            },
          ]}
        />
      </Modal>
    </Layout>
  )
}
