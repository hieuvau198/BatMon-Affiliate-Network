import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Switch, Slider, Select, Divider, notification, Tabs, Row, Col, Collapse, InputNumber, List, Tag } from 'antd';
import { SaveOutlined, InfoCircleOutlined, BarChartOutlined, ClockCircleOutlined, BugOutlined, SettingOutlined, GlobalOutlined, AlertOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

const FraudDetectionSettings = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [generalForm] = Form.useForm();
  const [botForm] = Form.useForm();
  const [clickForm] = Form.useForm();
  const [conversionForm] = Form.useForm();
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      generalForm.setFieldsValue({
        enableFraudDetection: true,
        alertThreshold: 'medium',
        autoBlock: true,
        autoBlockThreshold: 'high',
        notificationEmail: 'admin@example.com',
        scanInterval: 15,
        retentionPeriod: 90,
      });
      
      botForm.setFieldsValue({
        botDetectionEnabled: true,
        botThreshold: 75,
        detectDataCenterIPs: true,
        detectVPNs: true,
        detectScrapers: true,
        detectHeadlessBrowsers: true,
        userAgentAnalysis: true,
        cookieVerification: true,
        mouseMoveAnalysis: true,
        fingerprinting: true,
      });
      
      clickForm.setFieldsValue({
        clickFraudEnabled: true,
        clickThreshold: 80,
        maxClicksPerSession: 20,
        maxClicksPerUser: 50,
        maxClicksPerIP: 100,
        timeBasedAnalysis: true,
        detectDuplicateClicks: true,
        detectRapidClicks: true,
        detectPatternClicks: true,
        detectOffHourClicks: true,
      });
      
      conversionForm.setFieldsValue({
        conversionFraudEnabled: true,
        conversionThreshold: 70,
        detectConversionSpiking: true,
        detectEmptyConversions: true,
        detectGeoLocationAnomaly: true,
        detectPrematureConversions: true,
        verifyConversionPath: true,
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    generalForm.validateFields()
      .then(generalValues => {
        botForm.validateFields()
          .then(botValues => {
            clickForm.validateFields()
              .then(clickValues => {
                conversionForm.validateFields()
                  .then(conversionValues => {
                    const allValues = {
                      ...generalValues,
                      ...botValues,
                      ...clickValues,
                      ...conversionValues
                    };
                    
                    console.log('All form values:', allValues);
                    
                    // Simulate saving data
                    setTimeout(() => {
                      notification.success({
                        message: 'Cấu hình đã được lưu',
                        description: 'Các cài đặt phát hiện gian lận đã được cập nhật thành công.',
                      });
                      setFormChanged(false);
                    }, 500);
                  });
              });
          });
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleFormChange = () => {
    setFormChanged(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cấu hình hệ thống phát hiện gian lận</h1>
        <p className="text-gray-600">Quản lý cài đặt và ngưỡng phát hiện cho các loại gian lận khác nhau</p>
      </div>
      
      <Card className="mb-6">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                Cài đặt chung
              </span>
            }
            key="1"
          >
            <Form
              form={generalForm}
              layout="vertical"
              onValuesChange={handleFormChange}
              disabled={loading}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="enableFraudDetection"
                    label="Bật phát hiện gian lận"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="alertThreshold"
                    label="Ngưỡng cảnh báo"
                    tooltip="Mức độ chính xác tối thiểu để tạo cảnh báo"
                  >
                    <Select>
                      <Option value="low">Thấp (50%)</Option>
                      <Option value="medium">Trung bình (70%)</Option>
                      <Option value="high">Cao (90%)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="autoBlock"
                    label="Tự động chặn"
                    valuePropName="checked"
                    tooltip="Tự động chặn lưu lượng đáng ngờ"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="autoBlockThreshold"
                    label="Ngưỡng tự động chặn"
                    tooltip="Mức độ chính xác tối thiểu để tự động chặn"
                  >
                    <Select>
                      <Option value="medium">Trung bình (70%)</Option>
                      <Option value="high">Cao (90%)</Option>
                      <Option value="veryhigh">Rất cao (95%)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="notificationEmail"
                    label="Email thông báo"
                    rules={[
                      { type: 'email', message: 'Email không hợp lệ!' },
                      { required: true, message: 'Vui lòng nhập email!' }
                    ]}
                  >
                    <Input placeholder="admin@example.com" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="scanInterval"
                    label="Khoảng thời gian quét (phút)"
                  >
                    <InputNumber min={5} max={1440} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="retentionPeriod"
                    label="Thời gian lưu trữ dữ liệu (ngày)"
                  >
                    <InputNumber min={30} max={365} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <BugOutlined />
                Phát hiện bot
              </span>
            }
            key="2"
          >
            <Form
              form={botForm}
              layout="vertical"
              onValuesChange={handleFormChange}
              disabled={loading}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="botDetectionEnabled"
                    label="Bật phát hiện bot"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="botThreshold"
                    label="Ngưỡng phát hiện bot (%)"
                  >
                    <Slider min={50} max={100} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Phương pháp phát hiện</Divider>
              
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="detectDataCenterIPs"
                    label="Phát hiện IP trung tâm dữ liệu"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="detectVPNs"
                    label="Phát hiện VPNs"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="detectScrapers"
                    label="Phát hiện trình thu thập dữ liệu"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="detectHeadlessBrowsers"
                    label="Phát hiện trình duyệt headless"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="userAgentAnalysis"
                    label="Phân tích User Agent"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="cookieVerification"
                    label="Xác minh Cookie"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="mouseMoveAnalysis"
                    label="Phân tích chuyển động chuột"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="fingerprinting"
                    label="Lấy dấu vân tay trình duyệt"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Collapse className="mt-4">
                <Panel header="Danh sách chặn IP" key="1">
                  <List
                    size="small"
                    bordered
                    dataSource={['192.168.1.100', '10.0.0.15', '8.8.8.8']}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="link" danger>Xóa</Button>
                        ]}
                      >
                        {item} <Tag color="red">Chặn</Tag>
                      </List.Item>
                    )}
                    footer={
                      <div style={{ display: 'flex' }}>
                        <Input placeholder="Nhập địa chỉ IP" style={{ marginRight: 8 }} />
                        <Button type="primary">Thêm</Button>
                      </div>
                    }
                  />
                </Panel>
              </Collapse>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Gian lận nhấp chuột
              </span>
            }
            key="3"
          >
            <Form
              form={clickForm}
              layout="vertical"
              onValuesChange={handleFormChange}
              disabled={loading}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="clickFraudEnabled"
                    label="Bật phát hiện gian lận nhấp chuột"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="clickThreshold"
                    label="Ngưỡng phát hiện gian lận nhấp chuột (%)"
                  >
                    <Slider min={50} max={100} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Giới hạn</Divider>
              
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="maxClicksPerSession"
                    label="Số nhấp chuột tối đa trên mỗi phiên"
                  >
                    <InputNumber min={1} max={100} />
                  </Form.Item>
                  </Col>
                <Col span={8}>
                  <Form.Item
                    name="maxClicksPerIP"
                    label="Số nhấp chuột tối đa trên mỗi IP"
                  >
                    <InputNumber min={1} max={500} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Phương pháp phát hiện</Divider>
              
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item
                    name="timeBasedAnalysis"
                    label="Phân tích thời gian"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="detectDuplicateClicks"
                    label="Phát hiện nhấp chuột trùng lặp"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="detectRapidClicks"
                    label="Phát hiện nhấp chuột nhanh"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="detectPatternClicks"
                    label="Phát hiện mẫu nhấp chuột"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="detectOffHourClicks"
                label="Phát hiện nhấp chuột ngoài giờ"
                valuePropName="checked"
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <AlertOutlined />
                Gian lận chuyển đổi
              </span>
            }
            key="4"
          >
            <Form
              form={conversionForm}
              layout="vertical"
              onValuesChange={handleFormChange}
              disabled={loading}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="conversionFraudEnabled"
                    label="Bật phát hiện gian lận chuyển đổi"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="conversionThreshold"
                    label="Ngưỡng phát hiện gian lận chuyển đổi (%)"
                  >
                    <Slider min={50} max={100} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Phương pháp phát hiện</Divider>
              
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="detectConversionSpiking"
                    label="Phát hiện đột biến chuyển đổi"
                    valuePropName="checked"
                    tooltip="Phát hiện sự gia tăng đột ngột trong tỷ lệ chuyển đổi"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="detectEmptyConversions"
                    label="Phát hiện chuyển đổi trống"
                    valuePropName="checked"
                    tooltip="Phát hiện chuyển đổi không có dữ liệu hợp lệ"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="detectGeoLocationAnomaly"
                    label="Phát hiện bất thường vị trí địa lý"
                    valuePropName="checked"
                    tooltip="Phát hiện chuyển đổi từ vị trí địa lý không phù hợp"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="detectPrematureConversions"
                    label="Phát hiện chuyển đổi sớm"
                    valuePropName="checked"
                    tooltip="Phát hiện chuyển đổi xảy ra quá nhanh sau khi vào trang"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="verifyConversionPath"
                    label="Xác minh đường dẫn chuyển đổi"
                    valuePropName="checked"
                    tooltip="Đảm bảo người dùng đã đi qua đường dẫn chuyển đổi hợp lệ"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                Bộ lọc vùng
              </span>
            }
            key="5"
          >
            <Form
              layout="vertical"
              onValuesChange={handleFormChange}
              disabled={loading}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="regionFilterEnabled"
                    label="Bật bộ lọc vùng"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="regionFilterMode"
                    label="Chế độ bộ lọc"
                  >
                    <Select>
                      <Option value="allowlist">Danh sách cho phép</Option>
                      <Option value="blocklist">Danh sách chặn</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="selectedRegions"
                label="Chọn vùng"
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn vùng"
                  style={{ width: '100%' }}
                >
                  <Option value="vn">Việt Nam</Option>
                  <Option value="us">Hoa Kỳ</Option>
                  <Option value="eu">Liên minh Châu Âu</Option>
                  <Option value="asia">Châu Á</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="highRiskRegions"
                label="Vùng có nguy cơ cao"
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn vùng có nguy cơ cao"
                  style={{ width: '100%' }}
                >
                  <Option value="anonymous">Proxy ẩn danh</Option>
                  <Option value="satellite">Kết nối vệ tinh</Option>
                  <Option value="tor">Mạng Tor</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <ClockCircleOutlined />
                Lịch sử phát hiện
              </span>
            }
            key="6"
          >
            <div className="mb-4">
              <Input.Search
                placeholder="Tìm kiếm theo ID, IP, hoặc loại gian lận"
                style={{ width: 300 }}
              />
            </div>
            
            <List
              bordered
              loading={loading}
              dataSource={[
                {
                  id: 'FD-2023-05-12-001',
                  type: 'bot',
                  ip: '192.168.1.100',
                  timestamp: '2023-05-12 15:45:23',
                  confidence: 95,
                  action: 'blocked'
                },
                {
                  id: 'FD-2023-05-12-002',
                  type: 'click',
                  ip: '10.0.0.15',
                  timestamp: '2023-05-12 16:12:45',
                  confidence: 82,
                  action: 'flagged'
                },
                {
                  id: 'FD-2023-05-11-015',
                  type: 'conversion',
                  ip: '8.8.8.8',
                  timestamp: '2023-05-11 22:03:17',
                  confidence: 91,
                  action: 'blocked'
                }
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="link">Chi tiết</Button>,
                    <Button type="link" danger>Gỡ chặn</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`${item.id} - ${item.ip}`}
                    description={`Thời gian: ${item.timestamp} | Độ tin cậy: ${item.confidence}%`}
                  />
                  <div>
                    <Tag color={item.action === 'blocked' ? 'red' : 'orange'}>
                      {item.action === 'blocked' ? 'Đã chặn' : 'Đã gắn cờ'}
                    </Tag>
                    <Tag color={
                      item.type === 'bot' ? 'purple' : 
                      item.type === 'click' ? 'blue' : 'green'
                    }>
                      {item.type === 'bot' ? 'Bot' : 
                       item.type === 'click' ? 'Nhấp chuột' : 'Chuyển đổi'}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
      
      <div className="flex justify-end">
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          disabled={!formChanged}
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
};

export default FraudDetectionSettings;