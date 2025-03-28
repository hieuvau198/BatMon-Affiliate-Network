import React, { useState, useEffect } from "react";
import {       Card,   Statistic,   Button,   Typography,   Tooltip,   Modal,   Form,   Input,   notification,   Select} from "antd";
import {      WalletOutlined,   DollarOutlined,     ArrowUpOutlined,     ArrowDownOutlined,     ClockCircleOutlined,     InfoCircleOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function BalanceManagement({   
  advertiserBalance, 
  setAdvertiserBalance, 
  transactions, 
  setTransactions, 
  setStatusFilter, 
  onWithdrawalModalToggle,
  userBankAccounts: propUserBankAccounts 
}) {
  // State variables
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [newWithdrawalAmount, setNewWithdrawalAmount] = useState('');
  const [depositFormData, setDepositFormData] = useState({
    amount: "",
    paymentMethod: "BankTransfer",
    bankAccount: "default",
    referenceNumber: "",
    proofFile: null
  });

  // Predefined payment methods
  const paymentMethods = [
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "CreditCard", label: "Thẻ tín dụng" },
    { value: "DebitCard", label: "Thẻ ghi nợ" },
    { value: "EWallet", label: "Ví điện tử" },
    { value: "OnlineBanking", label: "Ngân hàng trực tuyến" }
  ];

  // Predefined bank accounts
  const bankAccounts = [
    { id: "default", name: "Techcombank - 19120123456789 - CÔNG TY ABC" },
    { id: "bank2", name: "Vietcombank - 19213456789 - CÔNG TY ABC" },
  ];

  // Currency formatting utility
  const formatCurrency = (value) => {  
    return `${(value || 0).toLocaleString()}đ`;
  };

  // Deposit form change handler
  const handleDepositFormChange = (fieldName, value) => {  
    setDepositFormData({  
      ...depositFormData,  
      [fieldName]: value
    });  
  };

  // Deposit submission handler
  const handleDepositSubmit = () => {
    // Remove commas and parse amount
    const amountString = depositFormData.amount.replace(/,/g, "");
    const amount = parseFloat(amountString);

    // Validation checks
    if (!amountString || isNaN(amount) || amount <= 0) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập số tiền hợp lệ (lớn hơn 0)",
      });
      return;
    }

    if (!depositFormData.paymentMethod) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn phương thức thanh toán",
      });
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: `T${(transactions.length + 1).toString().padStart(3, "0")}`,
      transactionId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      type: "Deposit",
      amount: amount,
      status: "Completed", // Changed from "Pending" to "Completed"
      date: new Date().toISOString().slice(0, 10),
      description: `Deposit via ${depositFormData.paymentMethod}`,
      paymentMethod: depositFormData.paymentMethod,
      bankAccount: depositFormData.bankAccount
    };
    
    // Update transactions and balance
    setTransactions([...transactions, newTransaction]);
    setAdvertiserBalance({  
      ...advertiserBalance,  
      availableBalance: (advertiserBalance.availableBalance || 0) + amount, // Add directly to available balance
      lifetimeDeposits: (advertiserBalance.lifetimeDeposits || 0) + amount,
      lastUpdated: new Date().toISOString().slice(0, 10)
    });

    // Reset modal and form
    setDepositModal(false);
    setDepositFormData({
      amount: "",
      paymentMethod: "BankTransfer",
      bankAccount: "default",
      referenceNumber: "",
      proofFile: null
    });
    
    // Success notification
    notification.success({
      message: "Thành công",
      description: "Yêu cầu nạp tiền đã được xác nhận thành công",
    });
  };

  // Withdrawal request handler
  const handleWithdrawalRequest = () => {
    // Remove commas and parse amount
    const amount = parseFloat(newWithdrawalAmount.replace(/,/g, ""));

    // Validation checks
    if (!amount || isNaN(amount) || amount <= 0) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập số tiền hợp lệ (lớn hơn 0)",
      });
      return;
    }

    if (amount > (advertiserBalance.availableBalance || 0)) {
      notification.error({
        message: "Lỗi",
        description: "Số tiền rút vượt quá số dư khả dụng",
      });
      return;
    }

    if (!selectedBankAccount) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn tài khoản ngân hàng",
      });
      return;
    }

    // Find selected bank account details
    const selectedBank = bankAccounts.find(bank => bank.id === selectedBankAccount);

    // Create new transaction
    const newTransaction = {
      id: `T${(transactions.length + 1).toString().padStart(3, "0")}`,
      transactionId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      type: "Withdrawal",
      amount: amount,
      status: "Pending", // Kept as "Pending"
      date: new Date().toISOString().slice(0, 10),
      description: `Withdrawal to ${selectedBank.name}`,
      bankAccount: selectedBank.name
    };

    // Update transactions and balance
    setTransactions([...transactions, newTransaction]);
    setAdvertiserBalance({
      ...advertiserBalance,
      availableBalance: (advertiserBalance.availableBalance || 0) - amount,
      pendingBalance: (advertiserBalance.pendingBalance || 0) + amount,
      lifetimeWithdrawals: (advertiserBalance.lifetimeWithdrawals || 0) + amount,
      lastUpdated: new Date().toISOString().slice(0, 10)
    });

    // Reset modal and form
    setWithdrawalModal(false);
    setNewWithdrawalAmount('');
    setSelectedBankAccount('');

    // Success notification
    notification.success({
      message: "Thành công",
      description: "Yêu cầu rút tiền đã được gửi và đang chờ xác nhận",
    });
  };


  // Withdrawal modal toggle handler
  const handleWithdrawalModalToggle = (isOpen) => {
    setWithdrawalModal(isOpen);
    if (onWithdrawalModalToggle) {
      onWithdrawalModalToggle(isOpen);
    }
  };

  return (
    <>
      <div className="mb-8">
        <Title level={4} className="mb-4">Tổng quan tài chính</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Available Balance Card */}
          <Card className="bg-blue-50 border-blue-200">
            <Statistic
              title={
                <span className="flex items-center">
                  Số dư khả dụng
                  <Tooltip title="Funds available for withdrawal or spending">
                    <InfoCircleOutlined className="ml-2 text-gray-400" />
                  </Tooltip>
                </span>
              }
              value={advertiserBalance.availableBalance || 0}
              prefix={<WalletOutlined />}
              suffix="đ"
              valueStyle={{ color: '#3f8600' }}
              formatter={(value) => value.toLocaleString()}
            />
            <Text type="secondary" className="block mt-2">
              Số tiền có thể sử dụng cho quảng cáo hoặc rút
            </Text>
            <div className="mt-4 flex space-x-2">
              <Button type="primary" onClick={() => setDepositModal(true)}>
                <ArrowDownOutlined /> Nạp tiền
              </Button>
              <Button onClick={() => handleWithdrawalModalToggle(true)}>
                <ArrowUpOutlined /> Rút tiền
              </Button>
            </div>
          </Card>
          
          {/* Pending Balance Card */}
          <Card className="bg-yellow-50 border-yellow-200">
            <Statistic
              title={
                <span className="flex items-center">
                  Số dư đang chờ xử lý
                  <Tooltip title="Funds that are being processed and not yet available">
                    <InfoCircleOutlined className="ml-2 text-gray-400" />
                  </Tooltip>
                </span>
              }
              value={advertiserBalance.pendingBalance || 0}
              prefix={<ClockCircleOutlined />}
              suffix="đ"
              valueStyle={{ color: '#faad14' }}
              formatter={(value) => value.toLocaleString()}
            />
            <Text type="secondary" className="block mt-2">
              Số tiền đang trong quá trình xử lý
            </Text>
          </Card>
          
          {/* Summary Card */}
          <Card className="bg-gray-50 border-gray-200">
            <div className="grid grid-cols-3 gap-2">
              <Statistic
                title="Tổng nạp"
                value={advertiserBalance.lifetimeDeposits || 0}
                prefix={<ArrowDownOutlined />}
                suffix="đ"
                valueStyle={{ color: '#3f8600', fontSize: '14px' }}
                formatter={(value) => value.toLocaleString()}
              />
              <Statistic
                title="Tổng rút"
                value={advertiserBalance.lifetimeWithdrawals || 0}
                prefix={<ArrowUpOutlined />}
                suffix="đ"
                valueStyle={{ color: '#cf1322', fontSize: '14px' }}
                formatter={(value) => value.toLocaleString()}
              />
              <Statistic
                title="Tổng chi tiêu"
                value={advertiserBalance.lifetimeSpend || 0}
                prefix={<DollarOutlined />}
                suffix="đ"
                valueStyle={{ color: '#1890ff', fontSize: '14px' }}
                formatter={(value) => value.toLocaleString()}
              />
            </div>
            <Text type="secondary" className="block mt-2">
              Cập nhật lần cuối: {advertiserBalance.lastUpdated || 'N/A'} | Đơn vị tiền: {advertiserBalance.currencyCode || 'VND'}
            </Text>
          </Card>
        </div>
      </div>
    
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
      
      {/* Withdrawal Modal */}
      <Modal
        title="Rút tiền"
        visible={withdrawalModal}
        onOk={handleWithdrawalRequest}
        onCancel={() => handleWithdrawalModalToggle(false)}
        width={600}
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
              onChange={(e) => {
                const formattedValue = e.target.value
                  .replace(/[^0-9,]/g, '')
                  .replace(/(,.*),/g, '$1');
                setNewWithdrawalAmount(formattedValue);
              }}
              addonAfter="đ"
              placeholder="Nhập số tiền cần rút (tối thiểu 100.000 đồng)"
            />
            <div className="text-sm text-gray-500 mt-1">
              Số dư khả dụng: {formatCurrency(advertiserBalance.availableBalance)}
              <br />
              Số tiền rút tối thiểu: 100.000 đồng
            </div>
          </Form.Item>
          
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
    </>
  );
}