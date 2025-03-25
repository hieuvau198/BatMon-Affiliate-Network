import React, { useState } from "react";
import {     Card,   Statistic,   Button,   Typography,   Tooltip,   Modal,   Form,   Input,   Radio,  Upload,   notification,   Space,   Select} from "antd";
import {    WalletOutlined, DollarOutlined,   ArrowUpOutlined,   ArrowDownOutlined,   ClockCircleOutlined,   InfoCircleOutlined,   UploadOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;
export default function BalanceManagement({   
  advertiserBalance, 
  setAdvertiserBalance, 
  transactions, 
  setTransactions, 
  setStatusFilter, 
  setWithdrawalModal 
}) {
  const [depositModal, setDepositModal] = useState(false);
  const [depositFormData, setDepositFormData] = useState({
    amount: "",
    paymentMethod: "BankTransfer", // Consistent with paymentMethods array
    bankAccount: "default",
    referenceNumber: "",
    proofFile: null
  });

  const paymentMethods = [
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "CreditCard", label: "Thẻ tín dụng" },
    { value: "DebitCard", label: "Thẻ ghi nợ" },
    { value: "EWallet", label: "Ví điện tử" },
    { value: "OnlineBanking", label: "Ngân hàng trực tuyến" }
  ];

  const bankAccounts = [
    { id: "default", name: "Techcombank - 19120123456789 - CÔNG TY ABC" },
    { id: "bank2", name: "Vietcombank - 19213456789 - CÔNG TY ABC" },
    { id: "bank3", name: "BIDV - 19023156789 - CÔNG TY ABC" }
  ];

  const formatCurrency = (value) => {  
    return `${value.toLocaleString()}đ`;
  };

  const handleDepositFormChange = (fieldName, value) => {  
    setDepositFormData({  
      ...depositFormData,  
      [fieldName]: value
    });  
  };

  const handleDepositSubmit = () => {
    const amountString = depositFormData.amount.replace(/,/g, "");
    const amount = parseFloat(amountString);

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
    if (depositFormData.paymentMethod === "BankTransfer" && !depositFormData.bankAccount) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn tài khoản ngân hàng",
      });
      return;
    }
    const newTransaction = {
      id: `T${(transactions.length + 1).toString().padStart(3, "0")}`,
      transactionId: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      type: "Deposit",
      amount: amount,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      description: `Deposit via ${depositFormData.paymentMethod}`
    };
    
    setTransactions([...transactions, newTransaction]);
    setAdvertiserBalance({  
      ...advertiserBalance,  
      pendingBalance: advertiserBalance.pendingBalance + amount,  
      lastUpdated: new Date().toISOString().slice(0, 10)
    });

    setDepositModal(false);
    setDepositFormData({
      amount: "",
      paymentMethod: "BankTransfer",
      bankAccount: "default",
      referenceNumber: "",
      proofFile: null
    });
    
    notification.success({
      message: "Thành công",
      description: "Yêu cầu nạp tiền đã được gửi và đang chờ xác nhận",
    });
  };

  return (
    <>
      <div className="mb-8">
        <Title level={4} className="mb-4">Tổng quan tài chính</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Button onClick={() => setWithdrawalModal(true)}>
                <ArrowUpOutlined /> Rút tiền
              </Button>
            </div>
          </Card>
          
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
            <div className="mt-4">
              <Tooltip title="View pending transactions">
                <Button onClick={() => {
                  setStatusFilter("Pending");
                }}>
                  Xem giao dịch đang chờ
                </Button>
              </Tooltip>
            </div>
          </Card>
          
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
                  .replace(/[^0-9,]/g, '')  // Remove non-numeric characters except comma
                  .replace(/(,.*),/g, '$1');  // Remove multiple commas
                handleDepositFormChange('amount', formattedValue);
              }}
              addonAfter="đ"
              placeholder="Nhập số tiền cần nạp"
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
            <>
              <Form.Item label="Chọn tài khoản ngân hàng để chuyển khoản" required>
                <Select
                  value={depositFormData.bankAccount}
                  onChange={(value) => handleDepositFormChange('bankAccount', value)}
                >
                  {bankAccounts.map(account => (
                    <Select.Option key={account.id} value={account.id}>
                      {account.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Bằng chứng thanh toán">
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={(info) => {
                    handleDepositFormChange('proofFile', info.file);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}