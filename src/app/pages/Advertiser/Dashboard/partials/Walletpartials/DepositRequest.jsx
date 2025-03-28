import React, { useState } from "react";
import {   Button,   Modal,   Form,   Input,   Select,   notification,   Typography,  Table,  Tag} from "antd";
import {  ArrowDownOutlined, CheckCircleOutlined,  ClockCircleOutlined} from '@ant-design/icons';

const { Title } = Typography;

const DepositRequest = ({ 
  advertiserBalance, 
  setAdvertiserBalance, 
  transactions, 
  setTransactions, 
  formatCurrency,
  depositModal,
  setDepositModal,
  userBankAccounts: propUserBankAccounts // Rename the prop to avoid conflict
}) => {
  const [depositFormData, setDepositFormData] = useState({
    amount: "",
    paymentMethod: "BankTransfer",
    bankAccount: "default"
  });

  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  const bankAccounts = [
    { id: "default", name: "Techcombank - 19120123456789 - CÔNG TY ABC" },
    { id: "bank2", name: "Vietcombank - 19213456789 - CÔNG TY ABC" },
  ];

  const paymentMethods = [
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "CreditCard", label: "Thẻ tín dụng" },
    { value: "DebitCard", label: "Thẻ ghi nợ" },
    { value: "EWallet", label: "Ví điện tử" },
    { value: "OnlineBanking", label: "Ngân hàng trực tuyến" }
  ];

  const depositColumns = [
    {
      title: "Request ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Bank Information",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          "Completed": "green",
          "Pending": "gold"
        };
        const statusIcons = {
          "Completed": <CheckCircleOutlined />,
          "Pending": <ClockCircleOutlined />
        };
        return (
          <Tag 
            color={statusColors[status]} 
            icon={statusIcons[status]}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  const handleDepositFormChange = (fieldName, value) => {  
    setDepositFormData({  
      ...depositFormData,  
      [fieldName]: value
    });  
  };

  const handleDepositSubmit = () => {
    const amountString = depositFormData.amount.replace(/,/g, "");
    const amount = parseFloat(amountString);

    // Validate amount
    if (!amountString || isNaN(amount) || amount < 100000) {
      notification.error({
        message: "Lỗi",
        description: "Số tiền nạp tối thiểu là 100,000 đồng",
      });
      return;
    }

    // Validate bank account selection
    if (!selectedBankAccount) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn tài khoản ngân hàng",
      });
      return;
    }

    // Create deposit transaction
    const newTransaction = {
      id: `REQ-${(transactions.length + 1).toString().padStart(3, "0")}`,
      transactionId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      type: "Deposit",
      amount: amount,
      status: "Completed",
      date: new Date().toISOString().slice(0, 10),
      description: `Deposit via ${depositFormData.paymentMethod} - ${depositFormData.bankAccount}`
    };
    
    // Update transactions and balance
    setTransactions([...transactions, newTransaction]);
    setAdvertiserBalance({  
      ...advertiserBalance,  
      availableBalance: advertiserBalance.availableBalance + amount,
      lifetimeDeposits: advertiserBalance.lifetimeDeposits + amount,
      lastUpdated: new Date().toISOString().slice(0, 10)
    });

    // Reset form and close modal
    setDepositModal(false);
    setDepositFormData({
      amount: "",
      paymentMethod: "BankTransfer",
      bankAccount: "default"
    });
    setSelectedBankAccount(null);
    
    // Always show success notification
    notification.success({
      message: "Nạp tiền thành công",
      description: `Bạn đã nạp thành công ${formatCurrency(amount)} vào tài khoản`,
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <ArrowDownOutlined className="mr-2" />
          <Title level={5} style={{ margin: 0 }}>Lịch sử nạp tiền</Title>
        </div>
        <Button type="primary" onClick={() => setDepositModal(true)}>
          Nạp tiền ngay
        </Button>
      </div>

      {/* Deposit History Table */}
      <Table 
        dataSource={transactions.filter(t => t.type === "Deposit")} 
        columns={depositColumns} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Nạp tiền"
        visible={depositModal}
        onOk={handleDepositSubmit}
        onCancel={() => setDepositModal(false)}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Số tiền nạp (đồng)" required>
            <Input
              value={depositFormData.amount}
              onChange={(e) => {
                const formattedValue = e.target.value
                  .replace(/[^0-9,]/g, '')
                  .replace(/(,.*),/g, '$1');
                handleDepositFormChange('amount', formattedValue);
              }}
              addonAfter="đ"
              placeholder="Nhập số tiền cần nạp (tối thiểu 100,000 đồng)"
            />
          </Form.Item>
          <Form.Item label="Phương thức thanh toán" required>
            <Select
              value={depositFormData.paymentMethod}
              onChange={(value) => handleDepositFormChange('paymentMethod', value)}
              placeholder="Chọn phương thức thanh toán"
            >
              {paymentMethods.map(method => (
                <Select.Option key={method.value} value={method.value}>
                  {method.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          {depositFormData.paymentMethod === 'BankTransfer' && (
            <Form.Item label="Chọn tài khoản ngân hàng để chuyển khoản" required>
              <Select
                value={depositFormData.bankAccount}
                onChange={(value) => handleDepositFormChange('bankAccount', value)}
              >
                {bankAccounts.map(account => (
                  <Select.Option key={account.id} value={account.name}>
                    {account.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

        <Form.Item label="Tài khoản ngân hàng" required>
            <Select
              value={selectedBankAccount}
              onChange={(value) => setSelectedBankAccount(value)}
              placeholder="Chọn tài khoản ngân hàng"
            >
              {propUserBankAccounts.map(account => (
                <Select.Option key={account.id} value={account.id}>
                  {account.bankName} - {account.accountNumber} - {account.accountHolder}
                  {account.isDefault && " (Mặc định)"}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepositRequest;