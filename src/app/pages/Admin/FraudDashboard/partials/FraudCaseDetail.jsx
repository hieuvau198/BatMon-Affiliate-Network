import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Descriptions, 
  Button, 
  Tabs, 
  Timeline, 
  Tag, 
  Statistic, 
  Row, 
  Col, 
  Badge, 
  Space, 
  Divider, 
  Table,
  Modal,
  Typography,
  message,
  Alert,
  List 
} from 'antd';
import { 
  FileTextOutlined, 
  DollarOutlined, 
  HistoryOutlined, 
  UserOutlined, 
  CalendarOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  RollbackOutlined,
  LinkOutlined,
  EditOutlined,
  EyeOutlined 
} from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

const FraudCaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [relatedReports, setRelatedReports] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Mock statuses for the status change modal
  const statuses = [
    { value: 'Đang điều tra', color: 'processing', icon: <ExclamationCircleOutlined /> },
    { value: 'Đã xác nhận', color: 'warning', icon: <CheckCircleOutlined /> },
    { value: 'Đã giải quyết', color: 'success', icon: <CheckCircleOutlined /> },
    { value: 'Không phải gian lận', color: 'default', icon: <RollbackOutlined /> }
  ];

  useEffect(() => {
    // Simulate API call to get case details
    setLoading(true);
    setTimeout(() => {
      // Mock case data
      const mockCase = {
        caseId: parseInt(id),
        title: `Nghi ngờ gian lận trong chiến dịch quảng cáo #${1000 + parseInt(id)}`,
        description: `Hệ thống phát hiện hoạt động bất thường trong lưu lượng truy cập và tỉ lệ click từ một nhóm IP đáng ngờ. Có dấu hiệu của bot traffic và click giả mạo với mức độ cao.`,
        type: 'Click Fraud',
        detectionDate: '2025-02-15',
        createdDate: '2025-02-16',
        campaignId: 1000 + parseInt(id),
        campaignName: 'Summer Promotion 2025',
        publisher: 'Publisher B',
        advertiserId: 12,
        advertiser: 'Advertiser C',
        financialImpact: 2540.75,
        status: 'Đang điều tra',
        severity: 'Cao',
        assignedTo: 'Agent 4',
        hasAdjustment: false,
        relatedReportId: 5,
        evidenceDetails: `IP logging shows 72% of clicks coming from the same subnet in a 24-hour period. Session duration for these users averages less than 3 seconds with no meaningful interactions. Click patterns show perfect timing intervals suggesting automated behavior.`,
        suspectedMethod: 'Bot traffic using headless browsers with IP rotation',
        trafficSource: '192.168.45.XX subnet range',
        affectedPeriod: '10/02/2025 - 15/02/2025',
        tags: ['Bot', 'Click Pattern', 'IP Rotation', 'Tỷ lệ thoát cao']
      };

      // Mock activities timeline
      const mockActivities = [
        { date: '2025-02-16 08:23:15', user: 'System', action: 'Vụ việc được tạo tự động bởi hệ thống', description: 'Phát hiện anomaly trong lưu lượng click' },
        { date: '2025-02-16 09:45:22', user: 'Admin', action: 'Gán vụ việc', description: 'Đã gán cho Agent 4' },
        { date: '2025-02-16 11:32:04', user: 'Agent 4', action: 'Bắt đầu điều tra', description: 'Đang phân tích IP logs và click patterns' },
        { date: '2025-02-17 10:15:30', user: 'Agent 4', action: 'Cập nhật điều tra', description: 'Đã xác định subnet đáng ngờ và đang kiểm tra các mẫu click' },
        { date: '2025-02-18 15:20:12', user: 'Agent 4', action: 'Thêm bằng chứng', description: 'Đã tải lên báo cáo phân tích traffic và screen recordings' }
      ];

      // Mock adjustments
      const mockAdjustments = [];

      // Mock related reports
      const mockReports = [
        { 
          reportId: 5, 
          title: 'Phân tích bất thường trong chiến dịch Summer Promotion', 
          date: '2025-02-15', 
          status: 'Đang điều tra' 
        }
      ];

      setCaseData(mockCase);
      setActivities(mockActivities);
      setAdjustments(mockAdjustments);
      setRelatedReports(mockReports);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setStatusModalVisible(true);
  };

  const confirmStatusChange = () => {
    setCaseData({
      ...caseData,
      status: selectedStatus
    });
    
    setActivities([
      {
        date: new Date().toLocaleString(),
        user: 'Agent 4',
        action: 'Cập nhật trạng thái',
        description: `Đã thay đổi trạng thái từ ${caseData.status} sang ${selectedStatus}`
      },
      ...activities
    ]);

    message.success(`Đã cập nhật trạng thái thành ${selectedStatus}`);
    setStatusModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Đang điều tra': return 'processing';
      case 'Đã xác nhận': return 'warning';
      case 'Đã giải quyết': return 'success';
      case 'Không phải gian lận': return 'default';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Cao': return 'red';
      case 'Trung bình': return 'orange';
      case 'Thấp': return 'green';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Card loading={true}></Card>
      </div>
    );
  }

  const adjustmentColumns = [
    {
      title: 'ID Điều chỉnh',
      dataIndex: 'adjustmentId',
      key: 'adjustmentId',
    },
    {
      title: 'Ngày',
      dataIndex: 'adjustmentDate',
      key: 'adjustmentDate',
    },
    {
      title: 'Số tiền gốc',
      dataIndex: 'originalAmount',
      key: 'originalAmount',
      render: amount => `$${amount.toFixed(2)}`
    },
    {
      title: 'Số tiền điều chỉnh',
      dataIndex: 'adjustedAmount',
      key: 'adjustedAmount',
      render: amount => `$${amount.toFixed(2)}`
    },
    {
      title: 'Phần trăm',
      dataIndex: 'adjustmentPercentage',
      key: 'adjustmentPercentage',
      render: percentage => `${percentage}%`
    },
    {
      title: 'Người phê duyệt',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Link to={`/fraud-adjustments/${record.adjustmentId}`}>
            <Button size="small" type="primary" icon={<EyeOutlined />}>Xem</Button>
          </Link>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with actions */}
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {caseData.title}
            </Title>
            <div className="mt-2">
              <Space>
                <Tag icon={<FileTextOutlined />} color="blue">{caseData.type}</Tag>
                <Badge status={getStatusColor(caseData.status)} text={caseData.status} />
                <Tag color={getSeverityColor(caseData.severity)}>{caseData.severity}</Tag>
                {caseData.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
            </div>
          </div>
          <Space>
            <Button 
              onClick={() => navigate(-1)} 
              icon={<RollbackOutlined />}
            >
              Quay lại
            </Button>
            <Button
              type="primary"
              onClick={() => handleStatusChange(caseData.status)}
              icon={<EditOutlined />}
            >
              Cập nhật trạng thái
            </Button>
            {!caseData.hasAdjustment && caseData.status === 'Đã xác nhận' && (
              <Link to={`/fraud-adjustments/new?caseId=${caseData.caseId}`}>
                <Button 
                  type="primary" 
                  icon={<DollarOutlined />}
                >
                  Tạo điều chỉnh
                </Button>
              </Link>
            )}
          </Space>
        </div>

        {/* Summary Stats */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Statistic 
              title="Mã vụ việc" 
              value={`#${caseData.caseId}`} 
              prefix={<FileTextOutlined />} 
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Ảnh hưởng tài chính" 
              value={caseData.financialImpact} 
              precision={2} 
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#cf1322' }}
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Ngày phát hiện" 
              value={caseData.detectionDate} 
              prefix={<CalendarOutlined />} 
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Xử lý bởi" 
              value={caseData.assignedTo} 
              prefix={<UserOutlined />} 
            />
          </Col>
        </Row>

        {/* Main content with tabs */}
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><FileTextOutlined />Chi tiết</span>} 
            key="1"
          >
            <Row gutter={24}>
              <Col span={16}>
                <Card title="Thông tin chi tiết" className="mb-6">
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="Mã chiến dịch" span={1}>
                      <Link to={`/campaigns/${caseData.campaignId}`}>
                        #{caseData.campaignId}
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên chiến dịch" span={1}>
                      {caseData.campaignName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhà xuất bản" span={1}>
                      {caseData.publisher}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhà quảng cáo" span={1}>
                      <Link to={`/advertisers/${caseData.advertiserId}`}>
                        {caseData.advertiser}
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Khoảng thời gian ảnh hưởng" span={2}>
                      {caseData.affectedPeriod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả" span={2}>
                      {caseData.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chi tiết bằng chứng" span={2}>
                      {caseData.evidenceDetails}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức gian lận nghi ngờ" span={2}>
                      {caseData.suspectedMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nguồn lưu lượng" span={1}>
                      {caseData.trafficSource}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {relatedReports.length > 0 && (
                  <Card title="Báo cáo liên quan" className="mb-6">
                    <List
                      itemLayout="horizontal"
                      dataSource={relatedReports}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            <Link to={`/fraud-reports/${item.reportId}`}>
                              <Button type="link" icon={<EyeOutlined />}>Xem</Button>
                            </Link>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Badge status={item.status === 'Chưa đọc' ? 'processing' : 'default'} />}
                            title={<Link to={`/fraud-reports/${item.reportId}`}>{item.title}</Link>}
                         description={`Ngày: ${item.date} | Trạng thái: ${item.status}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                )}
              </Col>

              <Col span={8}>
                <Card title="Lịch sử hoạt động" className="mb-6">
                  <Timeline mode="left">
                    {activities.map((activity, index) => (
                      <Timeline.Item key={index} label={activity.date}>
                        <p><strong>{activity.user}</strong>: {activity.action}</p>
                        <p>{activity.description}</p>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane 
            tab={<span><DollarOutlined />Điều chỉnh tài chính</span>} 
            key="2"
          >
            {adjustments.length > 0 ? (
              <Card>
                <Table 
                  dataSource={adjustments}
                  columns={adjustmentColumns}
                  rowKey="adjustmentId"
                  pagination={false}
                />
              </Card>
            ) : (
              <Alert
                message="Không có điều chỉnh"
                description={
                  <div>
                    <p>Chưa có điều chỉnh tài chính nào được tạo cho vụ việc này.</p>
                    {caseData.status === 'Đã xác nhận' && (
                      <Button 
                        type="primary" 
                        icon={<DollarOutlined />}
                        onClick={() => navigate(`/fraud-adjustments/new?caseId=${caseData.caseId}`)}
                      >
                        Tạo điều chỉnh mới
                      </Button>
                    )}
                  </div>
                }
                type="info"
                showIcon
              />
            )}
          </TabPane>

          <TabPane 
            tab={<span><BarChartOutlined />Phân tích dữ liệu</span>}
            key="3"
          >
            <Alert
              message="Phân tích dữ liệu"
              description="Tính năng đang được phát triển. Vui lòng quay lại sau."
              type="warning"
              showIcon
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Status change modal */}
      <Modal
        title="Cập nhật trạng thái vụ việc"
        visible={statusModalVisible}
        onOk={confirmStatusChange}
        onCancel={() => setStatusModalVisible(false)}
      >
        <p>Chọn trạng thái mới:</p>
        <Space direction="vertical" style={{ width: '100%' }}>
          {statuses.map(status => (
            <Button 
              key={status.value}
              type={selectedStatus === status.value ? 'primary' : 'default'}
              icon={status.icon}
              block
              onClick={() => setSelectedStatus(status.value)}
              style={{ textAlign: 'left' }}
            >
              {status.value}
            </Button>
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default FraudCaseDetail;