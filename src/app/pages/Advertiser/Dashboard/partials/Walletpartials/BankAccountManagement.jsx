import React, { useState } from "react";
import {   Table,   Button,   Modal,   Input,   Form,   notification,   Tag,   Space,   Checkbox,  Typography} from "antd";
import { BankOutlined } from '@ant-design/icons';
const { Title } = Typography;
export default function BankAccountManagement({ userBankAccounts, setUserBankAccounts }) {
  const [bankAccountModal, setBankAccountModal] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    isDefault: false
  });
  const handleAddBankAccount = () => {
    if (!newBankAccount.bankName || !newBankAccount.accountNumber || !newBankAccount.accountHolder) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin tài khoản ngân hàng",
      });
      return;
    }
    if (newBankAccount.isDefault) {
      setUserBankAccounts(userBankAccounts.map(account => ({
        ...account,
        isDefault: false
      })));
    }
    const newAccount = {
      id: userBankAccounts.length + 1,
      ...newBankAccount
    };
    setUserBankAccounts([...userBankAccounts, newAccount]);
    setBankAccountModal(false);
    setNewBankAccount({
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      isDefault: false
    });
    
    notification.success({  message: "Thành công",  description: "Đã thêm tài khoản ngân hàng mới",});
  };
  const setDefaultBankAccount = (accountId) => {
    setUserBankAccounts(userBankAccounts.map(account => ({
      ...account,
      isDefault: account.id === accountId
    })));
    
    notification.success({  message: "Thành công", description: "Đã cập nhật tài khoản ngân hàng mặc định",});
  };
  const bankAccountColumns = [
    {
      title: "Bank",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Account Holder",
      dataIndex: "accountHolder",
      key: "accountHolder",
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        record.isDefault ? (
          <Tag color="green">Default</Tag>
        ) : (
          <Button 
            type="link" 
            size="small"
            onClick={() => setDefaultBankAccount(record.id)}
          >
            Set as Default
          </Button>
        )
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => {
              // Edit bank account logic
            }}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            size="small"
            disabled={record.isDefault}
            onClick={() => {
              // Delete bank account logic
              if (!record.isDefault && window.confirm("Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?")) {
                setUserBankAccounts(userBankAccounts.filter(account => account.id !== record.id));
              }
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Title level={5}>Tài khoản ngân hàng đã lưu</Title>
        <Button type="primary" icon={<BankOutlined />} onClick={() => setBankAccountModal(true)}>
          Thêm tài khoản ngân hàng
        </Button>
      </div>
      
      <Table 
        dataSource={userBankAccounts} 
        columns={bankAccountColumns} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Bank Account Modal */}
      <Modal
        title="Thêm tài khoản ngân hàng"
        visible={bankAccountModal}
        onOk={handleAddBankAccount}
        onCancel={() => setBankAccountModal(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Ngân hàng" required>
            <Input
              value={newBankAccount.bankName}
              onChange={(e) => setNewBankAccount({...newBankAccount, bankName: e.target.value})}
              placeholder="Ví dụ: Techcombank, Vietcombank"
            />
          </Form.Item>
          <Form.Item label="Số tài khoản" required>
            <Input
              value={newBankAccount.accountNumber}
              onChange={(e) => setNewBankAccount({...newBankAccount, accountNumber: e.target.value})}
              placeholder="Nhập số tài khoản ngân hàng"
            />
          </Form.Item>
          <Form.Item label="Chủ tài khoản" required>
            <Input
              value={newBankAccount.accountHolder}
              onChange={(e) => setNewBankAccount({...newBankAccount, accountHolder: e.target.value})}
              placeholder="Tên chủ tài khoản"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={newBankAccount.isDefault}
              onChange={(e) => setNewBankAccount({...newBankAccount, isDefault: e.target.checked})}
            >
              Đặt làm tài khoản mặc định
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}