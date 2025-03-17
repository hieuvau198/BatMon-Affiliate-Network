import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Space, 
  Badge, 
  DatePicker, 
  Select, 
  Form,
  Tooltip,
  Popconfirm,
  message,
  Row,
  Col,
  Tag
} from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined, 
  FileExcelOutlined,
  FilterOutlined,
  ClearOutlined,
  HistoryOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

const FraudCasesList = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [form] = Form.useForm();
  const [filtersActive, setFiltersActive] = useState(false);
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      const dummyData = [];
      
      for (let i = 1; i <= 25; i++) {
        const randomDate = new Date(2025, 0, Math.floor(Math.random() * 60) + 1);
        
        const statuses = ['Đang điều tra', 'Đã xác nhận', 'Đã giải quyết', 'Không phải gian lận'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const types = ['Click Fraud', 'Conversion Fraud', 'Traffic Fraud', 'Bot Traffic', 'Ad Stacking'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const severities = ['Cao', 'Trung bình', 'Thấp'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        
        dummyData.push({
          caseId: i,
          title: `Vụ gian lận #${i}`,
          description: `Mô tả chi tiết về vụ gian lận #${i}`,
          type: randomType,
          detectionDate: randomDate.toISOString().split('T')[0],
          publisher: `Publisher ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          advertiser: `Advertiser ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          campaignId: Math.floor(Math.random() * 1000) + 1000,
          financialImpact: Math.floor(Math.random() * 10000) / 100,
          status: randomStatus,
          severity: randomSeverity,
          assignedTo: `Agent ${Math.floor(Math.random() * 10) + 1}`,
          hasAdjustment: Math.random() > 0.5,
          relatedReportId: Math.random() > 0.3 ? Math.floor(Math.random() * 20) + 1 : null
        });
      }
      
      setCases(dummyData);
      setFilteredCases(dummyData);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSearch = (values) => {
    let filtered = [...cases];
    
    if (values.keyword) {
      const keyword = values.keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.description.toLowerCase().includes(keyword)
      );
    }
    
    if (values.dateRange && values.dateRange.length === 2) {
      const startDate = values.dateRange[0].format('YYYY-MM-DD');
      const endDate = values.dateRange[1].format('YYYY-MM-DD');
      
      filtered = filtered.filter(item => 
        item.detectionDate >= startDate && item.detectionDate <= endDate
      );
    }
    
    if (values.status) {
      filtered = filtered.filter(item => item.status === values.status);
    }
    
    if (values.type) {
      filtered = filtered.filter(item => item.type === values.type);
    }
    
    if (values.severity) {
      filtered = filtered.filter(item => item.severity === values.severity);
    }
    
    if (values.publisher) {
      filtered = filtered.filter(item => item.publisher === values.publisher);
    }
    
    if (values.advertiser) {
      filtered = filtered.filter(item => item.advertiser === values.advertiser);
    }
    
    setFilteredCases(filtered);
    setFiltersActive(true);
    message.info(`Đã tìm thấy ${filtered.length} vụ gian lận.`);
  };
  
  const resetFilters = () => {
    form.resetFields();
    setFilteredCases(cases);
    setFiltersActive(false);
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Cao': return 'red';
      case 'Trung bình': return 'orange';
      case 'Thấp': return 'green';
      default: return 'default';
    }
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
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'caseId',
      key: 'caseId',
      width: 80,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/fraud-cases/${record.caseId}`} className="text-blue-600 hover:text-blue-800">
          {text}
        </Link>
      )
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>,
      filters: [
        { text: 'Click Fraud', value: 'Click Fraud' },
        { text: 'Conversion Fraud', value: 'Conversion Fraud' },
        { text: 'Traffic Fraud', value: 'Traffic Fraud' },
        { text: 'Bot Traffic', value: 'Bot Traffic' },
        { text: 'Ad Stacking', value: 'Ad Stacking' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Ngày phát hiện',
      dataIndex: 'detectionDate',
      key: 'detectionDate',
      sorter: (a, b) => new Date(a.detectionDate) - new Date(b.detectionDate),
    },
    {
      title: 'Chiến dịch',
      dataIndex: 'campaignId',
      key: 'campaignId',
      render: (id) => <Link to={`/campaigns/${id}`}>#{id}</Link>
    },
    {
      title: 'Mức độ',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Tag color={getSeverityColor(severity)}>{severity}</Tag>
      ),
      filters: [
        { text: 'Cao', value: 'Cao' },
        { text: 'Trung bình', value: 'Trung bình' },
        { text: 'Thấp', value: 'Thấp' },
      ],
      onFilter: (value, record) => record.severity === value,
    },
    {
      title: 'Ảnh hưởng tài chính',
      dataIndex: 'financialImpact',
      key: 'financialImpact',
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => a.financialImpact - b.financialImpact,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={getStatusColor(status)} text={status} />
      ),
      filters: [
        { text: 'Đang điều tra', value: 'Đang điều tra' },
        { text: 'Đã xác nhận', value: 'Đã xác nhận' },
        { text: 'Đã giải quyết', value: 'Đã giải quyết' },
        { text: 'Không phải gian lận', value: 'Không phải gian lận' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Giao cho',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Điều chỉnh',
      key: 'adjustment',
      render: (_, record) => (
        record.hasAdjustment ? (
          <Tag icon={<DollarOutlined />} color="green">Đã điều chỉnh</Tag>
        ) : (
          <Tag color="default">Chưa điều chỉnh</Tag>
        )
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 220,
      render: (_, record) => (
        <Space size="small">
         <Link to="../FraudCaseDetail">
            <Button type="primary" size="small" icon={<EyeOutlined />}>
              Xem
            </Button>
          </Link>
          
          {record.relatedReportId && (
            <Link to={`/fraud-reports/${record.relatedReportId}`}>
              <Button type="default" size="small" icon={<HistoryOutlined />}>
                Báo cáo
              </Button>
            </Link>
          )}
          
          {!record.hasAdjustment && record.status === 'Đã xác nhận' && (
            <Link to={`/fraud-adjustments/new?caseId=${record.caseId}`}>
              <Button type="default" size="small" icon={<DollarOutlined />}>
                Điều chỉnh
              </Button>
            </Link>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Danh sách các vụ gian lận</h1>
          <Space>
            <Button 
              type="primary" 
              icon={<FileExcelOutlined />} 
              onClick={() => message.info('Đang xuất Excel...')}
            >
              Xuất Excel
            </Button>
          </Space>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          className="mb-4"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="keyword" label="Tìm kiếm theo từ khóa">
                <Input 
                  placeholder="Nhập từ khóa tìm kiếm" 
                  allowClear 
                  prefix={<SearchOutlined className="text-gray-400" />} 
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="dateRange" label="Khoảng thời gian">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="Trạng thái">
                <Select placeholder="Chọn trạng thái" allowClear>
                  <Option value="Đang điều tra">Đang điều tra</Option>
                  <Option value="Đã xác nhận">Đã xác nhận</Option>
                  <Option value="Đã giải quyết">Đã giải quyết</Option>
                  <Option value="Không phải gian lận">Không phải gian lận</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="type" label="Loại gian lận">
                <Select placeholder="Chọn loại gian lận" allowClear>
                  <Option value="Click Fraud">Click Fraud</Option>
                  <Option value="Conversion Fraud">Conversion Fraud</Option>
                  <Option value="Traffic Fraud">Traffic Fraud</Option>
                  <Option value="Bot Traffic">Bot Traffic</Option>
                  <Option value="Ad Stacking">Ad Stacking</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="severity" label="Mức độ nghiêm trọng">
                <Select placeholder="Chọn mức độ" allowClear>
                  <Option value="Cao">Cao</Option>
                  <Option value="Trung bình">Trung bình</Option>
                  <Option value="Thấp">Thấp</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="publisher" label="Nhà xuất bản">
                <Select placeholder="Chọn nhà xuất bản" allowClear>
                  <Option value="Publisher A">Publisher A</Option>
                  <Option value="Publisher B">Publisher B</Option>
                  <Option value="Publisher C">Publisher C</Option>
                  <Option value="Publisher D">Publisher D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="advertiser" label="Nhà quảng cáo">
                <Select placeholder="Chọn nhà quảng cáo" allowClear>
                  <Option value="Advertiser A">Advertiser A</Option>
                  <Option value="Advertiser B">Advertiser B</Option>
                  <Option value="Advertiser C">Advertiser C</Option>
                  <Option value="Advertiser D">Advertiser D</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row>
          <Col span={24} className="flex justify-end">
              <Space>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<FilterOutlined />}
                >
                  Lọc kết quả
                </Button>
                <Button 
                  onClick={resetFilters} 
                  icon={<ClearOutlined />}
                  disabled={!filtersActive}
                >
                  Xóa bộ lọc
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      
      <Card>
        <Table 
          columns={columns} 
          dataSource={filteredCases} 
          rowKey="caseId" 
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} vụ gian lận`,
          }}
        />
      </Card>
    </div>
  );
};

export default FraudCasesList;