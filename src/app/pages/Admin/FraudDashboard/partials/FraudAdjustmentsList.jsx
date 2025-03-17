import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Tooltip, Input, DatePicker, Select, Form, Modal, Statistic, Row, Col, Tabs } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, FileExcelOutlined, FilterOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const FraudAdjustmentsList = () => {
  const [loading, setLoading] = useState(true);
  const [adjustments, setAdjustments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAdjustment, setCurrentAdjustment] = useState(null);
  const [statistics, setStatistics] = useState({
    totalAdjustments: 0,
    pendingAdjustments: 0,
    approvedAdjustments: 0,
    rejectedAdjustments: 0,
    totalAmount: 0
  });

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          caseId: 'FRAUD-2025-001',
          title: 'Điều chỉnh cho click farm phát hiện',
          amount: 2350.75,
          requestedBy: 'Nguyễn Văn A',
          requestDate: '2025-03-10',
          approvedBy: 'Trần Thị B',
          approvedDate: '2025-03-12',
          status: 'Đã phê duyệt',
          publisher: 'Publisher X',
          advertiser: 'Advertiser Y',
          campaign: 'Summer Sale 2025',
          description: 'Điều chỉnh cho hoạt động click farm phát hiện từ IP trong khoảng 192.168.1.0/24'
        },
        {
          id: 2,
          caseId: 'FRAUD-2025-002',
          title: 'Điều chỉnh cho bot traffic',
          amount: 1250.50,
          requestedBy: 'Lê Thị C',
          requestDate: '2025-03-08',
          approvedBy: null,
          approvedDate: null,
          status: 'Đang chờ duyệt',
          publisher: 'Publisher Z',
          advertiser: 'Advertiser W',
          campaign: 'New Product Launch',
          description: 'Điều chỉnh cho lưu lượng bot được phát hiện thông qua phân tích hành vi'
        },
        {
          id: 3,
          caseId: 'FRAUD-2025-003',
          title: 'Điều chỉnh cho impression farming',
          amount: 3450.25,
          requestedBy: 'Phạm Văn D',
          requestDate: '2025-03-05',
          approvedBy: 'Hoàng Thị E',
          approvedDate: '2025-03-07',
          status: 'Đã phê duyệt',
          publisher: 'Publisher M',
          advertiser: 'Advertiser N',
          campaign: 'Holiday Special',
          description: 'Điều chỉnh cho hoạt động impression farming phát hiện từ đối tác không đáng tin cậy'
        },
        {
          id: 4,
          caseId: 'FRAUD-2025-004',
          title: 'Điều chỉnh cho ad stacking',
          amount: 850.00,
          requestedBy: 'Vũ Thị F',
          requestDate: '2025-03-03',
          approvedBy: 'Nguyễn Văn G',
          approvedDate: null,
          status: 'Từ chối',
          publisher: 'Publisher P',
          advertiser: 'Advertiser Q',
          campaign: 'Flash Sale',
          description: 'Điều chỉnh cho hoạt động ad stacking phát hiện trên các trang web đáng ngờ'
        },
        {
          id: 5,
          caseId: 'FRAUD-2025-005',
          title: 'Điều chỉnh cho conversion fraud',
          amount: 4250.80,
          requestedBy: 'Trần Văn H',
          requestDate: '2025-03-01',
          approvedBy: null,
          approvedDate: null,
          status: 'Đang chờ duyệt',
          publisher: 'Publisher R',
          advertiser: 'Advertiser S',
          campaign: 'Year End Promotion',
          description: 'Điều chỉnh cho hoạt động gian lận chuyển đổi phát hiện thông qua tỷ lệ chuyển đổi bất thường'
        }
      ];

      setAdjustments(mockData);
      setStatistics({
        totalAdjustments: mockData.length,
        pendingAdjustments: mockData.filter(item => item.status === 'Đang chờ duyệt').length,
        approvedAdjustments: mockData.filter(item => item.status === 'Đã phê duyệt').length,
        rejectedAdjustments: mockData.filter(item => item.status === 'Từ chối').length,
        totalAmount: mockData.reduce((sum, item) => sum + item.amount, 0)
      });
      setLoading(false);
    }, 1000);
  }, []);

  const showModal = (record) => {
    setCurrentAdjustment(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAdjustments = adjustments.filter(adjustment => 
    adjustment.title.toLowerCase().includes(searchText.toLowerCase()) ||
    adjustment.caseId.toLowerCase().includes(searchText.toLowerCase()) ||
    adjustment.publisher.toLowerCase().includes(searchText.toLowerCase()) ||
    adjustment.advertiser.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Mã vụ',
      dataIndex: 'caseId',
      key: 'caseId',
      render: (text, record) => (
        <Link to={`/fraud-cases/${record.id}`} className="text-blue-600 hover:text-blue-800">
          {text}
        </Link>
      )
    },
    {
      title: 'Tiêu đề điều chỉnh',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.campaign}</div>
        </div>
      )
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-red-600 font-medium">
          ${amount.toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount
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
      title: 'Ngày yêu cầu',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate)
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        let icon = null;
        
        switch(status) {
          case 'Đang chờ duyệt':
            color = 'gold';
            icon = <ClockCircleOutlined />;
            break;
          case 'Đã phê duyệt':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          case 'Từ chối':
            color = 'red';
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = 'default';
        }
        
        return (
          <Badge 
            status={color} 
            text={<span className="flex items-center">{icon} <span className="ml-1">{status}</span></span>} 
          />
        );
      },
      filters: [
        { text: 'Đang chờ duyệt', value: 'Đang chờ duyệt' },
        { text: 'Đã phê duyệt', value: 'Đã phê duyệt' },
        { text: 'Từ chối', value: 'Từ chối' },
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="primary" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Link to={`../FraudAdjustmentForm?id=${record.id}`}>
              <Button 
                type="default" 
                size="small" 
                icon={<EditOutlined />}
              />
            </Link>
          </Tooltip>
          {record.status === 'Đang chờ duyệt' && (
            <>
              <Tooltip title="Phê duyệt">
                <Button 
                  type="default" 
                  size="small" 
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  icon={<CheckCircleOutlined />}
                />
              </Tooltip>
              <Tooltip title="Từ chối">
                <Button 
                  type="default" 
                  size="small" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  icon={<CloseCircleOutlined />}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Điều chỉnh gian lận</h1>
        <p className="text-gray-600">Quản lý và theo dõi các điều chỉnh tài chính liên quan đến hoạt động gian lận</p>
      </div>
      
      {/* Thống kê */}
      <Row gutter={16} className="mb-6">
        <Col span={4}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Tổng số điều chỉnh"
              value={statistics.totalAdjustments}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Đang chờ duyệt"
              value={statistics.pendingAdjustments}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Đã phê duyệt"
              value={statistics.approvedAdjustments}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Từ chối"
              value={statistics.rejectedAdjustments}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Tổng số tiền điều chỉnh"
              value={statistics.totalAmount}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Bộ lọc và tìm kiếm */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Input
              placeholder="Tìm kiếm theo mã vụ, tiêu đề, nhà xuất bản, nhà quảng cáo..."
              prefix={<SearchOutlined />}
              className="mr-4 w-80"
              onChange={handleSearch}
              value={searchText}
            />
            <Button icon={<FilterOutlined />} className="mr-2">Bộ lọc</Button>
          </div>
          <div className="flex space-x-2">
                          <Link to="../FraudDashboard">
                          <Button type="primary" >
                              Quay lại
                          </Button>
                        </Link>
            <Link to="../FraudAdjustmentForm">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
              >
                Tạo điều chỉnh mới
              </Button>
            </Link>
            
            <Button 
              type="default" 
              icon={<FileExcelOutlined />}
              className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Xuất Excel
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Danh sách điều chỉnh */}
        <Card className="mb-6">
          <Table 
            columns={columns} 
            dataSource={filteredAdjustments} 
            rowKey="id" 
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`
            }}
          />
        </Card>
        
        {/* Modal chi tiết điều chỉnh */}
        <Modal
          title="Chi tiết điều chỉnh gian lận"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Đóng
            </Button>,
            currentAdjustment?.status === 'Đang chờ duyệt' && (
              <>
                <Button 
                  key="reject" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  icon={<CloseCircleOutlined />}
                >
                  Từ chối
                </Button>
                <Button 
                  key="approve" 
                  type="primary" 
                  className="bg-green-600 hover:bg-green-700"
                  icon={<CheckCircleOutlined />}
                >
                  Phê duyệt
                </Button>
              </>
            ),
            currentAdjustment?.status !== 'Đang chờ duyệt' && (
              <Link to={`../FraudAdjustmentForm?id=${currentAdjustment?.id}`}>
                <Button 
                  key="edit" 
                  type="primary" 
                  icon={<EditOutlined />}
                >
                  Chỉnh sửa
                </Button>
              </Link>
            )
          ]}
        >
          {currentAdjustment && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{currentAdjustment.title}</h3>
                <Badge 
                  status={
                    currentAdjustment.status === 'Đã phê duyệt' ? 'green' : 
                    currentAdjustment.status === 'Đang chờ duyệt' ? 'gold' : 'red'
                  } 
                  text={currentAdjustment.status} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Mã vụ</p>
                  <p className="font-medium">{currentAdjustment.caseId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Số tiền điều chỉnh</p>
                  <p className="font-medium text-red-600">${currentAdjustment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Nhà xuất bản</p>
                  <p className="font-medium">{currentAdjustment.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-500">Nhà quảng cáo</p>
                  <p className="font-medium">{currentAdjustment.advertiser}</p>
                </div>
                <div>
                  <p className="text-gray-500">Chiến dịch</p>
                  <p className="font-medium">{currentAdjustment.campaign}</p>
                </div>
                <div>
                  <p className="text-gray-500">Người yêu cầu</p>
                  <p className="font-medium">{currentAdjustment.requestedBy}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày yêu cầu</p>
                  <p className="font-medium">{currentAdjustment.requestDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Người phê duyệt</p>
                  <p className="font-medium">{currentAdjustment.approvedBy || 'Chưa phê duyệt'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày phê duyệt</p>
                  <p className="font-medium">{currentAdjustment.approvedDate || 'Chưa phê duyệt'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500">Mô tả</p>
                <p className="text-sm">{currentAdjustment.description}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };
  
  export default FraudAdjustmentsList;