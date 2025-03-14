import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Layout, Card, Typography, Row, Col, Table, Tag, Progress, Statistic, Divider, Space, Button } from 'antd';
import { BarChart,  Bar,  PieChart, Pie,  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid, Tooltip,  Legend,  Cell,  ResponsiveContainer} from 'recharts';
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, CheckCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const TaxDashboard = () => {
  // Dữ liệu cho biểu đồ thanh ngang
  const taxDebtData = [
    { name: 'GTGT', paid: 150000000, unpaid: 50000000, upcoming: 30000000 },
    { name: 'TNDN', paid: 200000000, unpaid: 80000000, upcoming: 40000000 },
    { name: 'TNCN', paid: 120000000, unpaid: 30000000, upcoming: 20000000 },
  ];

  // Dữ liệu cho biểu đồ tròn
  const taxStructureData = [
    { name: 'GTGT', value: 230000000 },
    { name: 'TNDN', value: 320000000 },
    { name: 'TNCN', value: 170000000 },
  ];
  const COLORS = ['#1890ff', '#13c2c2', '#faad14'];

  // Dữ liệu cho biểu đồ đường
  const complianceTrendData = [
    { month: 'T1', paid: 50000000, debt: 20000000 },
    { month: 'T2', paid: 60000000, debt: 18000000 },
    { month: 'T3', paid: 55000000, debt: 25000000 },
    { month: 'T4', paid: 70000000, debt: 15000000 },
    { month: 'T5', paid: 65000000, debt: 10000000 },
    { month: 'T6', paid: 80000000, debt: 5000000 },
    { month: 'T7', paid: 75000000, debt: 8000000 },
    { month: 'T8', paid: 90000000, debt: 3000000 },
    { month: 'T9', paid: 85000000, debt: 7000000 },
    { month: 'T10', paid: 95000000, debt: 2000000 },
    { month: 'T11', paid: 100000000, debt: 1000000 },
    { month: 'T12', paid: 110000000, debt: 0 },
  ];

  // Gauge Chart data - compliance percentage
  const compliance = 85;
  const getComplianceLevel = (value) => {
    if (value >= 80) return { text: 'Tốt', color: '#52c41a', status: 'success' };
    if (value >= 50) return { text: 'Trung bình', color: '#faad14', status: 'warning' };
    return { text: 'Kém', color: '#f5222d', status: 'exception' };
  };
  const complianceLevel = getComplianceLevel(compliance);

  // Dữ liệu cho bảng cảnh báo
  const warningData = [
    { key: 1, type: 'GTGT', amount: 30000000, deadline: '15/04/2025', status: 'Quá hạn', days: 5 },
    { key: 2, type: 'TNDN', amount: 50000000, deadline: '30/04/2025', status: 'Sắp đến hạn', days: 15 },
    { key: 3, type: 'TNCN', amount: 25000000, deadline: '10/05/2025', status: 'Sắp đến hạn', days: 25 },
    { key: 4, type: 'GTGT', amount: 40000000, deadline: '20/03/2025', status: 'Quá hạn', days: 20 },
    { key: 5, type: 'TNDN', amount: 35000000, deadline: '05/04/2025', status: 'Quá hạn', days: 10 },
  ];

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Loại thuế',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => formatCurrency(text),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Hạn nộp',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Quá hạn' ? 'error' : 'warning'}>
          {status === 'Quá hạn' ? <ExclamationCircleOutlined /> : <ArrowDownOutlined />} {status}
        </Tag>
      ),
      filters: [
        { text: 'Quá hạn', value: 'Quá hạn' },
        { text: 'Sắp đến hạn', value: 'Sắp đến hạn' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Số ngày',
      dataIndex: 'days',
      key: 'days',
      render: (days, record) => (
        <Text type={record.status === 'Quá hạn' ? 'danger' : 'warning'}>
          {record.status === 'Quá hạn' ? `${days} ngày` : `Còn ${days} ngày`}
        </Text>
      ),
      sorter: (a, b) => a.days - b.days,
    },
  ];

  // Format số tiền VNĐ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Calculate summary statistics
  const totalOwed = taxDebtData.reduce((sum, item) => sum + item.unpaid + item.upcoming, 0);
  const totalPaid = taxDebtData.reduce((sum, item) => sum + item.paid, 0);
  const totalTax = totalOwed + totalPaid;
  const paymentRatio = (totalPaid / totalTax) * 100;

  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Title level={2}>Báo cáo thuế</Title>
            <Space>
              <Link to="../TaxReporting">
              <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
            Tax Compliance Report
              </Button>
              </Link>
              <Link to="../TaxPayment">
             <Button type="primary" className="bg-purple-600 hover:bg-purple-700">
                 Payment Transaction History
                </Button>
              </Link>
              </Space>
          </div>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5' }}>
            <Row gutter={[16, 16]}>
              {/* Summary Cards */}
              <Col xs={24} sm={12} md={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Tổng thuế đã nộp"
                    value={totalPaid}
                    precision={0}
                    formatter={(value) => `${formatCurrency(value)}`}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Tổng thuế phải nộp"
                    value={totalOwed}
                    precision={0}
                    formatter={(value) => `${formatCurrency(value)}`}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ExclamationCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Tỷ lệ thanh toán"
                    value={paymentRatio.toFixed(1)}
                    precision={1}
                    suffix="%"
                    valueStyle={{ color: paymentRatio >= 80 ? '#3f8600' : paymentRatio >= 50 ? '#faad14' : '#cf1322' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Số cảnh báo"
                    value={warningData.filter(item => item.status === 'Quá hạn').length}
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>

              {/* Biểu đồ thanh ngang - Nợ thuế và khoản phải nộp */}
              <Col xs={24} lg={12}>
                <Card title="Biểu đồ thanh ngang - Theo dõi nợ thuế và khoản phải nộp" bordered={false}>
                  <div style={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={taxDebtData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={value => formatCurrency(value).replace('₫', '')} />
                        <YAxis type="category" dataKey="name" width={60} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="paid" name="Đã nộp" stackId="a" fill="#52c41a" />
                        <Bar dataKey="unpaid" name="Chưa nộp" stackId="a" fill="#f5222d" />
                        <Bar dataKey="upcoming" name="Sắp đến hạn" stackId="a" fill="#faad14" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Biểu đồ tròn - Cơ cấu nghĩa vụ thuế */}
              <Col xs={24} lg={12}>
                <Card title="Biểu đồ tròn - Cơ cấu nghĩa vụ thuế" bordered={false}>
                  <div style={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taxStructureData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={110}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        >
                          {taxStructureData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Biểu đồ đường - Xu hướng tuân thủ thuế */}
              <Col xs={24} lg={12}>
                <Card title="Biểu đồ đường - Xu hướng tuân thủ thuế theo thời gian" bordered={false}>
                  <div style={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={complianceTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={value => formatCurrency(value).replace('₫', '')} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="paid" name="Thuế đã nộp" stroke="#52c41a" strokeWidth={2} />
                        <Line type="monotone" dataKey="debt" name="Khoản thuế còn nợ" stroke="#f5222d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Biểu đồ Gauge - Mức độ tuân thủ thuế */}
              <Col xs={24} lg={12}>
                <Card title="Biểu đồ Gauge - Mức độ tuân thủ thuế" bordered={false}>
                  <div style={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: 300 }}>
                      <Progress
                        type="dashboard"
                        percent={compliance}
                        status={complianceLevel.status}
                        strokeColor={complianceLevel.color}
                        width={250}
                      />
                      <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Title level={4}>Mức độ tuân thủ: <Text style={{ color: complianceLevel.color }}>{complianceLevel.text}</Text></Title>
                        <Text type="secondary">
                          {
                            compliance >= 80 ? 'Tổ chức đang tuân thủ tốt nghĩa vụ thuế' :
                            compliance >= 50 ? 'Cần cải thiện việc tuân thủ thuế' :
                            'Cảnh báo! Nguy cơ vi phạm cao'
                          }
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Bảng dữ liệu - Danh sách cảnh báo vi phạm */}
              <Col span={24}>
                <Card title="Bảng dữ liệu - Danh sách cảnh báo vi phạm" bordered={false}>
                  <Table
                    columns={columns}
                    dataSource={warningData}
                    pagination={{ pageSize: 5 }}
                    rowClassName={(record) => record.status === 'Quá hạn' ? 'ant-table-row-danger' : ''}
                    summary={(pageData) => {
                      const totalAmount = pageData.reduce((sum, item) => sum + item.amount, 0);
                      
                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}><strong>Tổng cộng</strong></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}><strong>{formatCurrency(totalAmount)}</strong></Table.Summary.Cell>
                            <Table.Summary.Cell index={3} colSpan={3}></Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default TaxDashboard;