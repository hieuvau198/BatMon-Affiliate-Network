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
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileExcelOutlined,
  FilterOutlined,
  ClearOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

const FraudReportsList = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [form] = Form.useForm();
  
  // Chỉ hiện thị các filter được áp dụng
  const [filtersActive, setFiltersActive] = useState(false);
  
  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setTimeout(() => {
      const dummyData = [];
      
      for (let i = 1; i <= 25; i++) {
        const randomDate = new Date(2025, 0, Math.floor(Math.random() * 60) + 1);
        
        const statuses = ['Chưa đọc', 'Đang điều tra', 'Đã xử lý', 'Đóng'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const publishers = ['Publisher A', 'Publisher B', 'Publisher C', 'Publisher D'];
        const randomPublisher = publishers[Math.floor(Math.random() * publishers.length)];
        
        const advertisers = ['Advertiser A', 'Advertiser B', 'Advertiser C', 'Advertiser D'];
        const randomAdvertiser = advertisers[Math.floor(Math.random() * advertisers.length)];
        
        dummyData.push({
          reportId: i,
          title: `Báo cáo gian lận #${i}`,
          description: `Mô tả chi tiết về báo cáo gian lận #${i}`,
          reportDate: randomDate.toISOString().split('T')[0],
          publisher: randomPublisher,
          advertiser: randomAdvertiser,
          affectedPeriod: `${randomDate.getMonth() + 1}/2025`,
          financialImpact: Math.floor(Math.random() * 10000) / 100,
          status: randomStatus,
          isRead: randomStatus !== 'Chưa đọc',
          readDate: randomStatus !== 'Chưa đọc' ? new Date().toISOString().split('T')[0] : null
        });
      }
      
      setReports(dummyData);
      setFilteredReports(dummyData);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleDelete = (id) => {
    message.success(`Đã xóa báo cáo #${id}`);
    const updatedReports = reports.filter(report => report.reportId !== id);
    setReports(updatedReports);
    setFilteredReports(updatedReports);
  };
  
  const handleSearch = (values) => {
    let filtered = [...reports];
    
    if (values.keyword) {
      const keyword = values.keyword.toLowerCase();
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(keyword) || 
        report.description.toLowerCase().includes(keyword)
      );
    }
    
    if (values.dateRange && values.dateRange.length === 2) {
      const startDate = values.dateRange[0].format('YYYY-MM-DD');
      const endDate = values.dateRange[1].format('YYYY-MM-DD');
      
      filtered = filtered.filter(report => 
        report.reportDate >= startDate && report.reportDate <= endDate
      );
    }
    
    if (values.status) {
      filtered = filtered.filter(report => report.status === values.status);
    }
    
    if (values.publisher) {
      filtered = filtered.filter(report => report.publisher === values.publisher);
    }
    
    if (values.advertiser) {
      filtered = filtered.filter(report => report.advertiser === values.advertiser);
    }
    
    setFilteredReports(filtered);
    setFiltersActive(true);
    message.info(`Đã tìm thấy ${filtered.length} báo cáo.`);
  };
  
  const resetFilters = () => {
    form.resetFields();
    setFilteredReports(reports);
    setFiltersActive(false);
  };
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'reportId',
      key: 'reportId',
      width: 80,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/fraud-reports/${record.reportId}`} className="text-blue-600 hover:text-blue-800">
          {text}
          {!record.isRead && <Badge status="processing" className="ml-2" />}
        </Link>
      )
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'reportDate',
      key: 'reportDate',
      sorter: (a, b) => new Date(a.reportDate) - new Date(b.reportDate),
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'publisher',
      key: 'publisher',
      filters: [
        { text: 'Publisher A', value: 'Publisher A' },
        { text: 'Publisher B', value: 'Publisher B' },
        { text: 'Publisher C', value: 'Publisher C' },
        { text: 'Publisher D', value: 'Publisher D' },
      ],
      onFilter: (value, record) => record.publisher === value,
    },
    {
      title: 'Nhà quảng cáo',
      dataIndex: 'advertiser',
      key: 'advertiser',
      filters: [
        { text: 'Advertiser A', value: 'Advertiser A' },
        { text: 'Advertiser B', value: 'Advertiser B' },
        { text: 'Advertiser C', value: 'Advertiser C' },
        { text: 'Advertiser D', value: 'Advertiser D' },
      ],
      onFilter: (value, record) => record.advertiser === value,
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
          case 'Đóng':
            color = 'default';
            break;
          default:
            color = 'default';
        }
        return <Badge status={color} text={status} />;
      },
      filters: [
        { text: 'Chưa đọc', value: 'Chưa đọc' },
        { text: 'Đang điều tra', value: 'Đang điều tra' },
        { text: 'Đã xử lý', value: 'Đã xử lý' },
        { text: 'Đóng', value: 'Đóng' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Link to="../FraudReportDetail">
            <Button type="primary" size="small" icon={<EyeOutlined />}>
              Xem
            </Button>
          </Link>
          <Link to={`/fraud-reports/edit/${record.reportId}`}>
            <Button type="default" size="small" icon={<EditOutlined />}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa báo cáo này?"
            onConfirm={() => handleDelete(record.reportId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="default" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Danh sách báo cáo gian lận</h1>
          <Space>
            <Button 
              type="primary" 
              icon={<FileExcelOutlined />} 
              onClick={() => message.info('Đang xuất Excel...')}
            >
              Xuất Excel
            </Button>
            <Link to="/fraud-reports/new">
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo báo cáo mới
              </Button>
            </Link>
              <Link to="../FraudDashboard">
              <Button type="primary" >
                  Quay lại
              </Button>
            </Link>
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
                  <Option value="Chưa đọc">Chưa đọc</Option>
                  <Option value="Đang điều tra">Đang điều tra</Option>
                  <Option value="Đã xử lý">Đã xử lý</Option>
                  <Option value="Đóng">Đóng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="publisher" label="Nhà xuất bản">
                <Select placeholder="Chọn nhà xuất bản" allowClear>
                  <Option value="Publisher A">Publisher A</Option>
                  <Option value="Publisher B">Publisher B</Option>
                  <Option value="Publisher C">Publisher C</Option>
                  <Option value="Publisher D">Publisher D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="advertiser" label="Nhà quảng cáo">
                <Select placeholder="Chọn nhà quảng cáo" allowClear>
                  <Option value="Advertiser A">Advertiser A</Option>
                  <Option value="Advertiser B">Advertiser B</Option>
                  <Option value="Advertiser C">Advertiser C</Option>
                  <Option value="Advertiser D">Advertiser D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className="flex items-end">
              <Space>
                <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                  Lọc
                </Button>
                {filtersActive && (
                  <Button onClick={resetFilters} icon={<ClearOutlined />}>
                    Xóa bộ lọc
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Form>

        <Table 
          columns={columns} 
          dataSource={filteredReports} 
          rowKey="reportId" 
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} báo cáo`
          }}
          bordered
        />
      </Card>
    </div>
  );
};

export default FraudReportsList;