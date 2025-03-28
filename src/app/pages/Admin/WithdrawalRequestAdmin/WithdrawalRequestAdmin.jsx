import React, { useState, useMemo, useEffect } from 'react';
import { Table, Modal, Tag, Tabs, message, Typography, Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, SearchOutlined } from '@ant-design/icons';
import getWithdrawalRequest from '../../../modules/WithdrawalRequest/getWithdrawalRequest';
import approveWithdrawalRequest from '../../../modules/WithdrawalRequest/approveWithdrawalRequest';
import rejectWithdrawalRequest from '../../../modules/WithdrawalRequest/rejectWithdrawalRequest';

const { Title } = Typography;
const { Search } = Input;

const WithdrawalRequestAdmin = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Giữ lại dữ liệu số dư (ví dụ từ API hoặc dữ liệu tạm)
  const [balances, setBalances] = useState({
    publishers: [
      {
        id: 1,
        name: 'John Doe',
        availableBalance: 6000,
        pendingBalance: 500,
        lifetimeEarnings: 15000,
        currency: 'USD'
      },
      {
        id: 2,
        name: 'Sarah Smith',
        availableBalance: 2000,
        pendingBalance: 100,
        lifetimeEarnings: 8000,
        currency: 'EUR'
      }
    ],
    advertisers: [
      {
        id: 1,
        name: 'Tech Innovators Vietnam',
        availableBalance: 150000000,
        pendingBalance: 10000000,
        lifetimeDeposits: 500000000,
        lifetimeWithdrawals: 200000000,
        currency: 'VND'
      }
    ]
  });

  // Lấy danh sách yêu cầu rút tiền từ API khi component mount
  useEffect(() => {
    setLoading(true);
    getWithdrawalRequest()
      .then(data => {
        // Chuyển đổi dữ liệu API sang định dạng component cần dùng
        const mappedData = data.map(item => ({
          key: item.requestId, // sử dụng requestId làm key
          requestId: item.requestId,
          // Xác định loại request: nếu có advertiserId thì coi là Advertiser, ngược lại Publisher (nếu có thêm trường publisherId,...)
          type: item.advertiserId ? 'Advertiser' : 'Publisher',
          name: item.advertiserName || 'Unknown',
          amount: item.amount,
          // Sử dụng currencyCode hoặc currencyName tùy theo mục đích hiển thị
          currency: item.currencyCode,
          currencyName: item.currencyName,
          requestDate: item.requestDate,
          status: item.status,
          rejectionReason: item.rejectionReason,
          reviewedBy: item.reviewedBy
        }));
        setWithdrawalRequests(mappedData);
        setLoading(false);
      })
      .catch(error => {
        message.error('Có lỗi xảy ra khi lấy dữ liệu yêu cầu rút tiền');
        setLoading(false);
      });
  }, []);

  // Lọc và tìm kiếm yêu cầu dựa theo tab và searchTerm
  const filteredAndSearchedRequests = useMemo(() => {
    let filteredRequests = withdrawalRequests;
    switch(activeTab) {
      case 'publisher':
        filteredRequests = filteredRequests.filter(request => request.type === 'Publisher');
        break;
      case 'advertiser':
        filteredRequests = filteredRequests.filter(request => request.type === 'Advertiser');
        break;
      default:
        break;
    }
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filteredRequests = filteredRequests.filter(request =>
        Object.values(request).some(value =>
          String(value).toLowerCase().includes(lowercasedTerm)
        )
      );
    }
    return filteredRequests;
  }, [withdrawalRequests, activeTab, searchTerm]);

  // Hàm kiểm tra tính hợp lệ của yêu cầu rút tiền dựa vào số dư
  const validateWithdrawalEligibility = (request) => {
    const balanceGroup = request.type === 'Publisher' 
      ? balances.publishers 
      : balances.advertisers;
    const accountBalance = balanceGroup.find(b => b.name === request.name);
    if (!accountBalance) {
      return { isEligible: false, reason: 'Không tìm thấy thông tin số dư' };
    }
    const isValidCurrency = accountBalance.currency === request.currency;
    const hasEnoughBalance = accountBalance.availableBalance >= request.amount;
    if (!isValidCurrency) {
      return { isEligible: false, reason: 'Không khớp ngoại tệ' };
    }
    if (!hasEnoughBalance) {
      return { isEligible: false, reason: 'Số dư không đủ để rút', availableBalance: accountBalance.availableBalance };
    }
    return { isEligible: true };
  };

  const getStatusTag = (status, request) => {
    const eligibility = validateWithdrawalEligibility(request);
    switch(status) {
      case 'Pending':
        if (!eligibility.isEligible) {
          return <Tag color="orange">Pending - {eligibility.reason}</Tag>;
        }
        return <Tag color="orange">Pending</Tag>;
      case 'Approved':
        return <Tag color="green">Approved</Tag>;
      case 'Rejected':
        return <Tag color="red">Rejected</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  // Xử lý phê duyệt hoặc từ chối yêu cầu
  const handleRequestAction = (request, action) => {
    const eligibility = validateWithdrawalEligibility(request);
    if (action === 'Approved' && !eligibility.isEligible) {
      Modal.error({
        title: 'Không thể phê duyệt',
        content: `${eligibility.reason}. Số dư hiện tại: ${eligibility.availableBalance || 'N/A'}`
      });
      return;
    }
    const apiCall = action === 'Approved'
      ? approveWithdrawalRequest({ requestId: request.requestId })
      : rejectWithdrawalRequest({ requestId: request.requestId });
    apiCall.then(response => {
      const updatedRequests = withdrawalRequests.map(req =>
        req.requestId === request.requestId ? { ...req, status: action } : req
      );
      setWithdrawalRequests(updatedRequests);
      setSelectedRequest(null);
      message.success(`Yêu cầu đã được ${action.toLowerCase()}`);
    }).catch(error => {
      message.error(`Có lỗi xảy ra: ${error.message || error}`);
    });
  };

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (record) => (
        <span>
          {record.amount} {record.currency}
        </span>
      ),
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => getStatusTag(record.status, record),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <button 
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setSelectedRequest(record)}
        >
          Xem Chi Tiết
        </button>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'all',
      label: 'Tất Cả Yêu Cầu',
    },
    {
      key: 'publisher',
      label: 'Yêu Cầu Publisher',
    },
    {
      key: 'advertiser',
      label: 'Yêu Cầu Advertiser',
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Title level={2}>Quản Lý Yêu Cầu Rút Tiền</Title>
          <div className="mt-2">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={tabItems}
            />
          </div>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <Search
            placeholder="Tìm kiếm theo ID, Tên, Loại, Trạng thái..."
            allowClear
            enterButton
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="p-4">
          <Table 
            columns={columns} 
            dataSource={filteredAndSearchedRequests}
            rowKey="requestId"
            loading={loading}
            pagination={{
              className: 'mt-4',
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </div>
      </div>

      {selectedRequest && (
        <Modal
          title="Chi Tiết Yêu Cầu Rút Tiền"
          open={!!selectedRequest}
          onCancel={() => setSelectedRequest(null)}
          footer={
            selectedRequest.status === 'Pending' ? (
              <div className="flex justify-end space-x-2">
                <button 
                  key="approve" 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                  onClick={() => handleRequestAction(selectedRequest, 'Approved')}
                >
                  <CheckCircleOutlined className="mr-2" />
                  Phê Duyệt
                </button>
                <button 
                  key="reject" 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                  onClick={() => handleRequestAction(selectedRequest, 'Rejected')}
                >
                  <CloseCircleOutlined className="mr-2" />
                  Từ Chối
                </button>
              </div>
            ) : null
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Mã Yêu Cầu:</span>
              <span>{selectedRequest.requestId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Loại:</span>
              <span>{selectedRequest.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tên:</span>
              <span>{selectedRequest.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Số Tiền:</span>
              <span>{selectedRequest.amount} {selectedRequest.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Ngày Yêu Cầu:</span>
              <span>{selectedRequest.requestDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Trạng Thái:</span>
              {getStatusTag(selectedRequest.status, selectedRequest)}
            </div>
            
            {/* Hiển thị thông tin số dư tương ứng */}
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h4 className="font-semibold mb-2 flex items-center">
                <DollarOutlined className="mr-2" />
                Thông Tin Số Dư Chi Tiết
              </h4>
              {(() => {
                const balanceGroup = selectedRequest.type === 'Publisher' 
                  ? balances.publishers 
                  : balances.advertisers;
                const accountBalance = balanceGroup.find(b => b.name === selectedRequest.name);
                return accountBalance ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Số Dư Khả Dụng:</span>
                      <span className="text-green-600">
                        {accountBalance.availableBalance} {accountBalance.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Số Dư Đang Chờ:</span>
                      <span className="text-yellow-600">
                        {accountBalance.pendingBalance} {accountBalance.currency}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-500 text-center">
                    Không tìm thấy thông tin số dư
                  </div>
                );
              })()}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WithdrawalRequestAdmin;
