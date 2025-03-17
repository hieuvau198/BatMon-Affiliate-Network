import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Badge, Tooltip, Tabs } from 'antd';
import {   AlertOutlined,   DollarOutlined,   BarChartOutlined,   ClockCircleOutlined,   EyeOutlined,  CheckCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const FraudDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({    totalCases: 0,    pendingCases: 0,    resolvedCases: 0,    financialImpact: 0,    newReports: 0  });
  
  const [recentReports, setRecentReports] = useState([]);
  const [flaggedActivities, setFlaggedActivities] = useState([]);

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setTimeout(() => {
      setStatistics({
        totalCases: 45,
        pendingCases: 12,
        resolvedCases: 33,
        financialImpact: 15420.50,
        newReports: 8
      });
      
      setRecentReports([
        {
          id: 1,
          title: 'Click Fraud trong chiến dịch quảng cáo ID 2834',
          date: '2025-02-10',
          status: 'Chưa đọc',
          publisher: 'Publisher A',
          advertiser: 'Advertiser B',
          impact: 2500.00
        },
        {
          id: 2,
          title: 'Tài khoản nhà quảng cáo đáng ngờ',
          date: '2025-02-08',
          status: 'Đang điều tra',
          publisher: 'Publisher C',
          advertiser: 'Advertiser D',
          impact: 3800.25
        },
        {
          id: 3,
          title: 'Lưu lượng truy cập bất thường từ IP nước ngoài',
          date: '2025-02-05',
          status: 'Đã xử lý',
          publisher: 'Publisher E',
          advertiser: 'Advertiser F',
          impact: 1200.00
        }
      ]);
      
      setFlaggedActivities([
        {
          id: 1,
          activity: 'Lưu lượng truy cập đột biến',
          timestamp: '2025-02-15 14:23:45',
          sourceIP: '192.168.12.34',
          campaign: 'Summer Sale 2025',
          severity: 'High'
        },
        {
          id: 2,
          activity: 'Nhiều click từ một người dùng',
          timestamp: '2025-02-14 09:12:30',
          sourceIP: '10.45.67.89',
          campaign: 'New Product Launch',
          severity: 'Medium'
        },
        {
          id: 3,
          activity: 'Tỷ lệ chuyển đổi bất thường',
          timestamp: '2025-02-13 18:45:22',
          sourceIP: '172.16.10.5',
          campaign: 'Flash Sale Weekend',
          severity: 'Low'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const reportColumns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/fraud-reports/${record.id}`} className="text-blue-600 hover:text-blue-800">
          {text}
          {record.status === 'Chưa đọc' && (
            <Badge status="processing" className="ml-2" />
          )}
        </Link>
      )
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Nhà quảng cáo',
      dataIndex: 'advertiser',
      key: 'advertiser',
    },
    {
      title: 'Ảnh hưởng tài chính',
      dataIndex: 'impact',
      key: 'impact',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
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
          default:
            color = 'default';
        }
        return <Badge status={color} text={status} />;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Link to="./FraudReportDetail">
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            Xem chi tiết
          </Button>
        </Link>
      ),
    },
  ];

  const activityColumns = [
    {
      title: 'Hoạt động',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'IP nguồn',
      dataIndex: 'sourceIP',
      key: 'sourceIP',
    },
    {
      title: 'Chiến dịch',
      dataIndex: 'campaign',
      key: 'campaign',
    },
    {
      title: 'Mức độ nghiêm trọng',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => {
        let color = '';
        switch(severity) {
          case 'High':
            color = 'red';
            break;
          case 'Medium':
            color = 'orange';
            break;
          case 'Low':
            color = 'green';
            break;
          default:
            color = 'default';
        }
        return <Badge color={color} text={severity} />;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => alert(`Investigating activity ${record.id}`)}>
          Điều tra
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển điều tra gian lận</h1>
        <p className="text-gray-600">Giám sát và điều tra các hoạt động gian lận tiềm ẩn</p>
      </div>
      
      {/* Thống kê */}
      <Row gutter={16} className="mb-6">
        <Col span={4}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Tổng số vụ gian lận"
              value={statistics.totalCases}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Đang chờ xử lý"
              value={statistics.pendingCases}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Đã giải quyết"
              value={statistics.resolvedCases}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Ảnh hưởng tài chính"
              value={statistics.financialImpact}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Báo cáo mới"
              value={statistics.newReports}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="mt-2">
              <Link to="/fraud-reports">
                <Button type="link" size="small">Xem tất cả</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Tabs */}
      <Card className="mb-6">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Báo cáo gần đây" key="1">
            <Table 
              columns={reportColumns} 
              dataSource={recentReports} 
              rowKey="id" 
              loading={loading}
              pagination={false}
            />
            <div className="mt-4 flex justify-end">
              <Link to="./FraudReportsList">
                <Button type="primary">Xem tất cả báo cáo</Button>
              </Link>
            </div>
          </TabPane>
          <TabPane tab="Hoạt động đáng ngờ" key="2">
            <Table 
              columns={activityColumns} 
              dataSource={flaggedActivities} 
              rowKey="id" 
              loading={loading}
              pagination={false}
            />
            <div className="mt-4 flex justify-end">
              <Link to="./FraudCasesList">
                <Button type="primary">Xem tất cả hoạt động</Button>
              </Link>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      
      {/* Quick Links */}
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Tạo báo cáo gian lận mới"
            bordered={false}
            className="h-full"
            extra={<Link to="./FraudAdjustmentForm">Tạo mới</Link>}
          >
            <p className="text-gray-600">Tạo báo cáo gian lận mới để theo dõi và phân tích</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Xem các vụ gian lận"
            bordered={false}
            className="h-full"
            extra={<Link to="./FraudCasesList">Xem</Link>}
          >
            <p className="text-gray-600">Quản lý và theo dõi các vụ gian lận đang điều tra</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Điều chỉnh gian lận"
            bordered={false}
            className="h-full"
            extra={<Link to="./FraudAdjustmentsList">Xem</Link>}
          >
            <p className="text-gray-600">Quản lý các điều chỉnh tài chính cho gian lận</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Cấu hình hệ thống phát hiện"
            bordered={false}
            className="h-full"
            extra={<Link to="./FraudDetectionSettings">Cấu hình</Link>}
          >
            <p className="text-gray-600">Quản lý cài đặt và ngưỡng phát hiện gian lận</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FraudDashboard;