import React, { useState } from 'react';
import {   Modal,   Form,   Input,   Button,   Select,   DatePicker,   notification,   Card,   Typography,   Space,  Divider} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const DepositRequest = ({   advertiserBalance,   setAdvertiserBalance,   transactions,  setTransactions,  formatCurrency,  depositModal,  setDepositModal
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [depositRequests, setDepositRequests] = useState([
    {
      requestId: 1,
      advertiserId: 101,
      amount: 5000000,
      requestDate: "2024-03-01",
      status: "Completed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN-20240301",
      currencyCode: "VND"
    },
    {
      requestId: 2,
      advertiserId: 101,
      amount: 3000000,
      requestDate: "2024-02-15",
      status: "Completed",
      paymentMethod: "Credit Card",
      transactionId: "TXN-20240215",
      currencyCode: "VND"
    }
  ]);

  const paymentMethods = [
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'E-Wallet', label: 'E-Wallet' },
    { value: 'Cryptocurrency', label: 'Cryptocurrency' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest = {
        requestId: depositRequests.length + 1,
        advertiserId: advertiserBalance.advertiserId,
        amount: values.amount,
        requestDate: dayjs().format('YYYY-MM-DD'),
        status: "Pending",
        paymentMethod: values.paymentMethod,
        transactionId: `TXN-${dayjs().format('YYYYMMDDHHmmss')}`,
        currencyCode: advertiserBalance.currencyCode
      };
      setDepositRequests([...depositRequests, newRequest]);
      if (values.status === "Completed") {
        const newTransaction = {
          id: `T${transactions.length + 1}`,
          transactionId: newRequest.transactionId,
          type: "Deposit",
          amount: newRequest.amount,
          status: "Completed",
          date: newRequest.requestDate,
          description: `${newRequest.paymentMethod} deposit`
        };

        setTransactions([...transactions, newTransaction]);
        setAdvertiserBalance({
          ...advertiserBalance,
          availableBalance: advertiserBalance.availableBalance + newRequest.amount,
          lifetimeDeposits: advertiserBalance.lifetimeDeposits + newRequest.amount
        });
      }

      notification.success({
        message: 'Deposit Request Submitted',
        description: 'Your deposit request has been submitted successfully.'
      });

      form.resetFields();
      setDepositModal(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error processing your deposit request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => formatCurrency(amount)
    },
    {
      title: 'Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'Pending':
            color = 'orange';
            break;
          case 'Rejected':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <span style={{ color }}>{status}</span>;
      }
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    }
  ];

  return (
    <div>
      <Card 
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>Deposit Requests</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setDepositModal(true)}
            >
              New Deposit
            </Button>
          </Space>
        }
        className="mb-4"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="text-left px-4 py-2 border-b">
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {depositRequests.map(request => (
                <tr key={request.requestId} className="hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-2 border-b">
                      {col.render ? col.render(request[col.dataIndex]) : request[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        title="New Deposit Request"
        open={depositModal}
        onCancel={() => {
          form.resetFields();
          setDepositModal(false);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            currencyCode: advertiserBalance.currencyCode,
            requestDate: dayjs()
          }}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input 
              type="number" 
              prefix={advertiserBalance.currencyCode} 
              style={{ width: '100%' }} 
            />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: 'Please select payment method!' }]}
          >
            <Select placeholder="Select payment method">
              {paymentMethods.map(method => (
                <Option key={method.value} value={method.value}>
                  {method.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currencyCode"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Request Date"
            name="requestDate"
          >
            <DatePicker disabled style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%' }}
            >
              Submit Deposit Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepositRequest;