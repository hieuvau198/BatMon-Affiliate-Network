import React, { useState } from "react";
import {   Table,   Button,   Modal,   Form,   Input,   Select,   Tooltip,  Tag, notification,   Typography,  Space } from "antd";
import {   InfoCircleOutlined,   ArrowUpOutlined,   CheckCircleOutlined,   ClockCircleOutlined,   CloseCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;
const WithdrawalRequest = ({   withdrawalRequests,   setWithdrawalRequests,   advertiserBalance,   setAdvertiserBalance,  userBankAccounts,  addTransaction,  formatCurrency 
}) => {
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [newWithdrawalAmount, setNewWithdrawalAmount] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState(
    userBankAccounts.find(account => account.isDefault)?.id || 
    (userBankAccounts.length > 0 ? userBankAccounts[0].id : null)
  );
  const [bankAccountModal, setBankAccountModal] = useState(false);
  const withdrawalColumns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Bank Information",
      dataIndex: "bankInfo",
      key: "bankInfo",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = 'green';
        let icon = <CheckCircleOutlined />;
        
        if (status === 'Pending') {
          color = 'gold';
          icon = <ClockCircleOutlined />;
        } else if (status === 'Rejected') {
          color = 'red';
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
      title: "Rejection Reason",
      dataIndex: "rejectionReason",
      key: "rejectionReason",
      render: (reason) => reason || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        record.status === "Pending" && (
          <Button type="link" danger size="small" onClick={() => cancelWithdrawalRequest(record)}>
            Cancel
          </Button>
        )
      ),
    },
  ];

  // Create a new withdrawal request
  const handleWithdrawalRequest = () => {
    // Validate amount
    if (!newWithdrawalAmount || isNaN(parseFloat(newWithdrawalAmount.replace(/,/g, "")))) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập số tiền hợp lệ",
      });
      return;
    }
    const amount = parseFloat(newWithdrawalAmount.replace(/,/g, ""));
    if (amount > advertiserBalance.availableBalance) {
      notification.error({
        message: "Lỗi",
        description: "Số tiền rút vượt quá số dư khả dụng",
      });
      return;
    }
    const bankAccount = userBankAccounts.find(account => account.id === selectedBankAccount);
    if (!bankAccount) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn tài khoản ngân hàng hợp lệ",
      });
      return;
    }
    const newRequest = {
      requestId: withdrawalRequests.length + 1,
      advertiserId: advertiserBalance.advertiserId,
      amount: amount,
      requestDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      rejectionReason: null,
      reviewedBy: null,
      currencyCode: advertiserBalance.currencyCode,
      bankInfo: `${bankAccount.bankName} - ${bankAccount.accountNumber} - ${bankAccount.accountHolder}`
    };
    setWithdrawalRequests([...withdrawalRequests, newRequest]);
    setAdvertiserBalance({
      ...advertiserBalance,
      availableBalance: advertiserBalance.availableBalance - amount,
      pendingBalance: advertiserBalance.pendingBalance + amount,
      lastUpdated: new Date().toISOString().slice(0, 10)
    });
    const newTransaction = {
      id: `T${new Date().getTime()}`,
      transactionId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      type: "Withdrawal",
      amount: amount,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      description: `Withdrawal to ${bankAccount.bankName} - ${bankAccount.accountNumber}`
    };
    
    addTransaction(newTransaction);
    setWithdrawalModal(false);
    setNewWithdrawalAmount("");
    notification.success({  message: "Thành công",  description: "Yêu cầu rút tiền đã được tạo",});
  };
  const cancelWithdrawalRequest = (record) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy yêu cầu rút tiền này?")) {
      setWithdrawalRequests(
        withdrawalRequests.map(req => 
          req.requestId === record.requestId 
            ? {...req, status: "Cancelled"} 
            : req
        )
      );
      
      setAdvertiserBalance({
        ...advertiserBalance,
        availableBalance: advertiserBalance.availableBalance + record.amount,
        pendingBalance: advertiserBalance.pendingBalance - record.amount
      });      
      notification.success({ message: "Thành công",description: "Đã hủy yêu cầu rút tiền"});
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <ArrowUpOutlined className="mr-2" />
          <Title level={5} style={{ margin: 0 }}>Lịch sử yêu cầu rút tiền</Title>
        </div>
        <Button type="primary" onClick={() => setWithdrawalModal(true)}>
          Tạo yêu cầu rút tiền
        </Button>
      </div>
      
      <Table 
        dataSource={withdrawalRequests} 
        columns={withdrawalColumns} 
        rowKey="requestId"
        pagination={{ pageSize: 10 }}
      />

      {/* Withdrawal Modal */}
      <Modal
        title="Rút tiền"
        visible={withdrawalModal}
        onOk={handleWithdrawalRequest}
        onCancel={() => setWithdrawalModal(false)}
      >
        <Form layout="vertical">
          <Form.Item 
            label={
              <span>
                Số tiền rút (đồng) 
                <Tooltip title={`Số dư khả dụng: ${formatCurrency(advertiserBalance.availableBalance)}`}>
                  <InfoCircleOutlined className="ml-1" />
                </Tooltip>
              </span>
            }
            required
          >
            <Input
              value={newWithdrawalAmount}
              onChange={(e) => setNewWithdrawalAmount(e.target.value)}
              addonAfter="đ"
              placeholder="Nhập số tiền cần rút"
            />
            <div className="text-sm text-gray-500 mt-1">
              Số dư khả dụng: {formatCurrency(advertiserBalance.availableBalance)}
            </div>
          </Form.Item>
          <Form.Item label="Tài khoản ngân hàng" required>
            <Select
              value={selectedBankAccount}
              onChange={(value) => setSelectedBankAccount(value)}
            >
              {userBankAccounts.map(account => (
                <Select.Option key={account.id} value={account.id}>
                  {account.bankName} - {account.accountNumber} - {account.accountHolder}
                  {account.isDefault && " (Mặc định)"}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WithdrawalRequest;