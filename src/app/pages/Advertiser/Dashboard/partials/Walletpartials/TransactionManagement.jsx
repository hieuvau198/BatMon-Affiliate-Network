import React, { useState, useEffect } from "react";
import {   Table,   Button,   Select,   Card,   DatePicker,   Typography,   Tag} from "antd";
import {  ArrowUpOutlined,  ArrowDownOutlined, DollarOutlined,  CheckCircleOutlined,  ClockCircleOutlined,  CloseCircleOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function TransactionManagement({ transactions, formatCurrency }) {
  const [dateRange, setDateRange] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    let filtered = [...transactions];
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(transaction => {
        const txDate = new Date(transaction.date);
        return txDate >= startDate && txDate <= endDate;
      });
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }
    if (typeFilter !== "All") {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }
    setFilteredTransactions(filtered);
  }, [transactions, dateRange, statusFilter, typeFilter]);

  const transactionColumns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = 'green';
        let icon = <ArrowDownOutlined />;
        
        if (type === 'Withdrawal') {
          color = 'red';
          icon = <ArrowUpOutlined />;
        } else if (type === 'Campaign') {
          color = 'blue';
          icon = <DollarOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => {
        const color = record.type === 'Deposit' ? '#3f8600' : record.type === 'Withdrawal' ? '#cf1322' : '#1890ff';
        return <span style={{ color }}>{formatCurrency(amount)}</span>;
      },
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
        } else if (status === 'Failed' || status === 'Rejected') {
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Card className="bg-gray-50">
          <Title level={5}>Bộ lọc</Title>
          <div className="flex flex-wrap gap-4">
            <div>
              <Text strong>Thời gian:</Text>
              <RangePicker 
                className="ml-2"
                onChange={(dates) => setDateRange(dates)}
              />
            </div>
            <div>
              <Text strong>Trạng thái:</Text>
              <Select
                className="ml-2 w-32"
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
              >
                <Select.Option value="All">Tất cả</Select.Option>
                <Select.Option value="Completed">Hoàn thành</Select.Option>
                <Select.Option value="Pending">Đang chờ</Select.Option>
                <Select.Option value="Failed">Thất bại</Select.Option>
              </Select>
            </div>
            <div>
              <Text strong>Loại giao dịch:</Text>
              <Select
                className="ml-2 w-32"
                value={typeFilter}
                onChange={(value) => setTypeFilter(value)}
              >
                <Select.Option value="All">Tất cả</Select.Option>
                <Select.Option value="Deposit">Nạp tiền</Select.Option>
                <Select.Option value="Withdrawal">Rút tiền</Select.Option>
                <Select.Option value="Campaign">Chiến dịch</Select.Option>
              </Select>
            </div>
            <Button 
              type="primary"
              onClick={() => {
                setDateRange(null);
                setStatusFilter("All");
                setTypeFilter("All");
              }}
            >
              Đặt lại
            </Button>
          </div>
        </Card>
      </div>

      <div className="mb-4">
        <Title level={5}>Danh sách giao dịch</Title>
      </div>

      <Table 
        dataSource={filteredTransactions} 
        columns={transactionColumns} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}