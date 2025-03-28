import React, { useState, useMemo } from 'react';
import { Table, Modal, Tag, Tabs, message, Typography, Input } from 'antd';
import {   CheckCircleOutlined,   CloseCircleOutlined,   ExclamationCircleOutlined,   DollarOutlined,   SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Search } = Input;
const WithdrawalRequestAdmin = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawalRequests, setWithdrawalRequests] = useState([
    {
      key: 1,
      type: 'Publisher',
      name: 'John Doe',
      amount: 5000,
      currency: 'USD',
      requestDate: '2024-03-15',
      status: 'Pending'
    },
    {
      key: 2,
      type: 'Advertiser',
      name: 'Tech Solutions Inc.',
      amount: 10000,
      currency: 'USD', 
      requestDate: '2024-03-10',
      status: 'Approved'
    },
    {
      key: 3,
      type: 'Publisher',
      name: 'Sarah Smith',
      amount: 2500,
      currency: 'EUR',
      requestDate: '2024-03-20',
      status: 'Rejected'
    }
  ]);

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
        name: 'Tech Solutions Inc.',
        availableBalance: 15000,
        pendingBalance: 1000,
        lifetimeDeposits: 50000,
        lifetimeWithdrawals: 20000,
        currency: 'USD'
      }
    ]
  });
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

  const validateWithdrawalEligibility = (request) => {
    const balanceGroup = request.type === 'Publisher' 
      ? balances.publishers 
      : balances.advertisers;

    const accountBalance = balanceGroup.find(b => b.name === request.name);

    if (!accountBalance) {
      return {
        isEligible: false,
        reason: 'Không tìm thấy thông tin số dư'
      };
    }
    const isValidCurrency = accountBalance.currency === request.currency;
    const hasEnoughBalance = accountBalance.availableBalance >= request.amount;
    if (!isValidCurrency) {
      return {
        isEligible: false,
        reason: 'Không khớp ngoại tệ'
      };
    }
    if (!hasEnoughBalance) {
      return {
        isEligible: false,
        reason: 'Số dư không đủ để rút',
        availableBalance: accountBalance.availableBalance
      };
    }
    return {
      isEligible: true
    };
  };
  const getStatusTag = (status, request) => {
    const eligibility = validateWithdrawalEligibility(request);
    switch(status) {
      case 'Pending':
        if (!eligibility.isEligible) {
          return (
            <Tag color="orange">
              Pending - {eligibility.reason}
            </Tag>
          );
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
  const handleRequestAction = (request, action) => {
    const eligibility = validateWithdrawalEligibility(request);
    
    if (action === 'Approved' && !eligibility.isEligible) {
      Modal.error({
        title: 'Không thể phê duyệt',
        content: `${eligibility.reason}. Số dư hiện tại: ${eligibility.availableBalance || 'N/A'}`
      });
      return;
    }
    const updatedRequests = withdrawalRequests.map(req => 
      req.key === request.key 
        ? { ...req, status: action }
        : req
    );
    setWithdrawalRequests(updatedRequests);
    setSelectedRequest(null);
    message.success(`Yêu cầu đã được ${action.toLowerCase()}`);
  };

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'key',
      key: 'key',
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
            rowKey="key"
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
              <span>{selectedRequest.key}</span>
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
            
            {/* Chi tiết số dư chi tiết */}
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