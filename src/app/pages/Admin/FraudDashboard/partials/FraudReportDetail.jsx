import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Descriptions, 
  Badge, 
  Button, 
  Space, 
  Divider, 
  Timeline, 
  Modal, 
  message, 
  Tabs,
  Table,
  Typography,
  Tag
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  FileTextOutlined,
  LineChartOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SendOutlined,
  LinkOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

const FraudReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [relatedCases, setRelatedCases] = useState([]);
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setTimeout(() => {
      const reportData = {
        reportId: parseInt(reportId),
        title: `Phát hiện gian lận trong chiến dịch quảng cáo ID ${1000 + parseInt(reportId)}`,
        description: `Báo cáo này ghi nhận các hoạt động đáng ngờ trong chiến dịch quảng cáo, bao gồm lưu lượng truy cập bất thường và tỷ lệ nhấp chuột cao từ một số địa chỉ IP cụ thể. Phân tích ban đầu cho thấy có khả năng sử dụng bot hoặc click farm để tạo ra lưu lượng giả mạo.`,
        reportDate: '2025-02-15',
        publisherId: 45,
        publisher: 'Publisher X',
        advertiserId: 78,
        advertiser: 'Advertiser Y',
        campaignId: 1245,
        campaignName: 'Summer Promotion 2025',
        affectedPeriod: '01/2025 - 02/2025',
        financialImpact: 3580.75,
        fraudPatterns: [
          'Lưu lượng truy cập đột biến vào thời điểm bất thường',
          'Nhiều lần nhấp chuột từ cùng một địa chỉ IP',
          'Tỷ lệ chuyển đổi thấp bất thường',
          'Hành vi người dùng không tự nhiên'
        ],
        recommendedActions: [
          'Chặn các địa chỉ IP đáng ngờ',
          'Điều chỉnh thanh toán cho nhà xuất bản',
          'Thực hiện kiểm tra bổ sung đối với chiến dịch',
          'Cập nhật bộ lọc gian lận'
        ],
        status: 'Đang điều tra',
        createdBy: 'System Detection',
        isRead: true,
        readDate: '2025-02-16'
      };

      // Dữ liệu về các vụ gian lận liên quan
      const relatedCasesData = [
        {
          caseId: 234,
          title: `Vụ gian lận liên quan đến ${reportData.publisher}`,
          openDate: '2025-02-17',
          status: 'Đang điều tra',
          assignedTo: 'John Doe',
          financialImpact: 2800.00
        },
        {
          caseId: 235,
          title: `Điều tra chiến dịch ${reportData.campaignName}`,
          openDate: '2025-02-18',
          status: 'Mới',
          assignedTo: 'Unassigned',
          financialImpact: 780.75
        }
      ];

      // Dữ liệu về các hoạt động liên quan
      const activitiesData = [
        {
          date: '2025-02-15 09:45:23',
          action: 'Báo cáo được tạo bởi hệ thống tự động',
          user: 'System'
        },
        {
          date: '2025-02-16 10:30:12',
          action: 'Báo cáo được đánh dấu đã đọc',
          user: 'Admin'
        },
        {
          date: '2025-02-16 14:22:45',
          action: 'Trạng thái thay đổi từ "Mới" sang "Đang điều tra"',
          user: 'Admin'
        },
        {
          date: '2025-02-17 11:15:30',
          action: 'Vụ gian lận #234 được tạo từ báo cáo này',
          user: 'John Doe'
        },
        {
          date: '2025-02-18 09:20:18',
          action: 'Vụ gian lận #235 được tạo từ báo cáo này',
          user: 'System'
        }
      ];

      setReport(reportData);
      setRelatedCases(relatedCasesData);
      setActivities(activitiesData);
      setLoading(false);
    }, 1000);
  }, [reportId]);

  const handleCreateCase = () => {
    setActionType('create-case');
    setModalVisible(true);
  };

  const handleAdjustment = () => {
    navigate(`/fraud-adjustments/new?reportId=${reportId}`);
  };

  const handleModalOk = () => {
    if (actionType === 'create-case') {
      message.success('Đã tạo vụ gian lận mới');
      navigate(`/fraud-cases/new?reportId=${reportId}`);
    }
    setModalVisible(false);
  };

  const getStatusBadge = (status) => {
    let color = '';
    switch(status) {
      case 'Chưa đọc':
        color = 'blue';
        break;
      case 'Đang điều tra':
        color = 'gold';
        break;
      case 'Đã xử lý':
        color = 'green';
        break;
      case 'Đóng':
        color = 'default';
        break;
      case 'Mới':
        color = 'purple';
        break;
      default:
        color = 'default';
    }
    return <Badge status={color} text={status} />;
  };

  const casesColumns = [
    {
      title: 'ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/fraud-cases/${record.caseId}`}>{text}</Link>
      )
    },
    {
      title: 'Ngày mở',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status)
    },
    {
      title: 'Người được giao',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Tác động tài chính',
      dataIndex: 'financialImpact',
      key: 'financialImpact',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Link to={`/fraud-cases/${record.caseId}`}>
          <Button size="small" type="primary">Xem chi tiết</Button>
        </Link>
      )
    },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Card loading={loading}>
          <div style={{ height: '400px' }}></div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb và Actions */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Link to="./FraudReportsList">
            <Button type="link" icon={<ArrowLeftOutlined />} className="pl-0">
              Quay lại danh sách báo cáo
            </Button>
          </Link>
        </div>
        <Space>
          <Button 
            type="primary" 
            icon={<AlertOutlined />} 
            onClick={handleCreateCase}
          >
            Tạo vụ gian lận
          </Button>
          <Button 
            type="primary" 
            icon={<DollarOutlined />} 
            onClick={handleAdjustment}
          >
            Tạo điều chỉnh
          </Button>
          <Link to={`/fraud-reports/edit/${reportId}`}>
            <Button type="default" icon={<EditOutlined />}>
              Chỉnh sửa báo cáo
            </Button>
          </Link>
        </Space>
      </div>

      {/* Thông tin chính về báo cáo */}
      <Card className="mb-6">
        <Row>
          <Col span={18}>
            <Title level={3}>{report.title}</Title>
            <div className="mb-4">
              <Space>
                {getStatusBadge(report.status)}
                <Divider type="vertical" />
                <Text type="secondary">ID: {report.reportId}</Text>
                <Divider type="vertical" />
                <Text type="secondary">Ngày báo cáo: {report.reportDate}</Text>
              </Space>
            </div>
          </Col>
          <Col span={6} className="text-right">
            <Tag color="red" icon={<DollarOutlined />} className="text-lg py-1 px-2">
              Tác động: ${report.financialImpact.toFixed(2)}
            </Tag>
          </Col>
        </Row>

        <Divider />

        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                Chi tiết báo cáo
              </span>
            } 
            key="1"
          >
            <Row gutter={16}>
              <Col span={16}>
                <Card type="inner" title="Mô tả" className="mb-4">
                  <Paragraph>{report.description}</Paragraph>
                </Card>

                <Row gutter={16} className="mb-4">
                  <Col span={12}>
                    <Card type="inner" title="Mẫu gian lận đã phát hiện">
                      <ul className="pl-4">
                        {report.fraudPatterns.map((pattern, index) => (
                          <li key={index} className="mb-2">{pattern}</li>
                        ))}
                      </ul>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card type="inner" title="Hành động được đề xuất">
                      <ul className="pl-4">
                        {report.recommendedActions.map((action, index) => (
                          <li key={index} className="mb-2">{action}</li>
                        ))}
                      </ul>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col span={8}>
                <Card type="inner" title="Thông tin liên quan" className="mb-4">
                  <Descriptions column={1} size="small" bordered>
                    <Descriptions.Item label="Nhà xuất bản">
                      <Link to={`/publishers/${report.publisherId}`}>{report.publisher}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhà quảng cáo">
                      <Link to={`/advertisers/${report.advertiserId}`}>{report.advertiser}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Chiến dịch">
                      <Link to={`/campaigns/${report.campaignId}`}>{report.campaignName}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian bị ảnh hưởng">
                      {report.affectedPeriod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tạo bởi">
                      {report.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="Đánh dấu đã đọc">
                      {report.readDate}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card type="inner" title="Nhật ký hoạt động">
                  <Timeline>
                    {activities.map((activity, index) => (
                      <Timeline.Item key={index}>
                        <p>{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {activity.date} bởi {activity.user}
                        </p>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <LinkOutlined />
                Vụ gian lận liên quan
              </span>
            } 
            key="2"
          >
            <Card type="inner" title={`Các vụ gian lận liên quan (${relatedCases.length})`}>
              <Table 
                columns={casesColumns} 
                dataSource={relatedCases} 
                rowKey="caseId"
                pagination={false}
              />
             {relatedCases.length === 0 && (
                <div className="text-center py-8">
                  <Text type="secondary">Không có vụ gian lận nào được tạo từ báo cáo này</Text>
                  <div className="mt-4">
                    <Button type="primary" icon={<AlertOutlined />} onClick={handleCreateCase}>
                      Tạo vụ gian lận
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <LineChartOutlined />
                Phân tích
              </span>
            } 
            key="3"
          >
            <Card type="inner" title="Phân tích gian lận">
              {/* Nội dung phân tích có thể được thêm vào đây */}
              <div className="text-center py-8">
                <Text type="secondary">Dữ liệu phân tích đang được xử lý</Text>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Tạo vụ gian lận mới"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn tạo một vụ gian lận mới từ báo cáo này?</p>
        <p>Thông tin từ báo cáo sẽ được sử dụng để tạo vụ gian lận mới.</p>
      </Modal>
    </div>
  );
};

export default FraudReportDetail;