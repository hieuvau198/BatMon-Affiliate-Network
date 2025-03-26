import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate từ react-router-dom
import { Card, Spin, Statistic, Table, Tag, Form, InputNumber, Select, Button, message, Row, Col, Input, Tabs, Divider } from "antd";
import { motion } from "framer-motion";
import { ArrowDownOutlined, ArrowUpOutlined, WalletOutlined, HistoryOutlined, MoneyCollectOutlined, TransactionOutlined, LeftOutlined } from '@ant-design/icons'; // Thêm LeftOutlined cho nút Back
import getPublisherBalance from "../../../../modules/PublisherBalance";
import getPayoutRequestsByPublisher from "../../../../modules/PublisherBalance/partials/getPayoutRequestsByPublisher";
import { createPayoutRequest } from "../../../../modules/PublisherBalance/partials/createPayoutRequest";
import { createDepositRequest } from "../../../../modules/PublisherBalance/partials/createDepositRequest";

const { Option } = Select;
const { TabPane } = Tabs;

export default function WalletDashboard({ publisherId = 1 }) {
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  const [walletData, setWalletData] = useState(null);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState(true);
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [payoutSearch, setPayoutSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const [payoutForm] = Form.useForm();
  const [depositForm] = Form.useForm();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const data = await getPublisherBalance();
        if (data) {
          setWalletData(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setLoading(false);
      }
    };

    const fetchPayoutRequests = async () => {
      try {
        setPayoutLoading(true);
        const data = await getPayoutRequestsByPublisher(publisherId);
        if (data) {
          setPayoutRequests(data);
        }
        setPayoutLoading(false);
      } catch (error) {
        console.error("Error fetching payout requests:", error);
        setPayoutLoading(false);
      }
    };

    fetchWalletData();
    fetchPayoutRequests();
  }, [publisherId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDynamicCurrency = (amount, currencyCode) => {
    if (currencyCode === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    } else if (currencyCode === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }
    return amount;
  };

  const handlePayoutRequest = async (values) => {
    if (!walletData) {
      message.error("Không thể gửi yêu cầu: Dữ liệu ví không khả dụng.");
      return;
    }

    if (values.amount > walletData.availableBalance) {
      message.error("Số tiền yêu cầu vượt quá số dư khả dụng!");
      return;
    }

    setPayoutSubmitting(true);
    try {
      const payoutData = {
        amount: values.amount,
        currencyCode: values.currencyCode,
        publisherId: parseInt(publisherId),
      };

      const result = await createPayoutRequest(payoutData);
      if (result) {
        const updatedPayouts = await getPayoutRequestsByPublisher(publisherId);
        setPayoutRequests(updatedPayouts);

        const updatedWallet = await getPublisherBalance();
        if (updatedWallet) {
          setWalletData(updatedWallet[0]);
        }

        payoutForm.resetFields();
        message.success("Yêu cầu rút tiền đã được gửi thành công!");
      }
    } catch (error) {
      console.error("Error submitting payout request:", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu rút tiền!");
    } finally {
      setPayoutSubmitting(false);
    }
  };

  const handleDepositRequest = async (values) => {
    setDepositSubmitting(true);
    try {
      const depositData = {
        amount: values.amount,
        currencyCode: values.currencyCode,
        publisherId: parseInt(publisherId),
        paymentMethod: values.paymentMethod,
      };

      const result = await createDepositRequest(depositData);
      if (result) {
        const updatedWallet = await getPublisherBalance();
        if (updatedWallet) {
          setWalletData(updatedWallet[0]);
        }

        depositForm.resetFields();
        message.success("Yêu cầu nạp tiền đã được gửi thành công!");
      }
    } catch (error) {
      console.error("Error submitting deposit request:", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu nạp tiền!");
    } finally {
      setDepositSubmitting(false);
    }
  };

  const payoutColumns = [
    {
      title: "Mã yêu cầu",
      dataIndex: "requestId",
      key: "requestId",
      width: 120,
    },
    {
      title: "Nhà xuất bản",
      dataIndex: "publisherName",
      key: "publisherName",
      width: 200,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span style={{ fontWeight: 500 }}>
          {formatDynamicCurrency(amount, record.currencyCode)}
        </span>
      ),
      width: 150,
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = 'default';
        if (status === "Pending") color = 'orange';
        if (status === "Completed") color = 'green';
        if (status === "Failed") color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
      width: 120,
    },
  ];

  const filteredPayoutRequests = payoutRequests.filter((request) =>
    request.requestId.toString().includes(payoutSearch) ||
    request.publisherName?.toLowerCase().includes(payoutSearch.toLowerCase())
  );

  // Hàm xử lý quay lại trang trước
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó trong lịch sử trình duyệt
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="p-4 md:p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            icon={<LeftOutlined />}
            onClick={handleBack}
            className="mr-3 border-0 shadow-none text-gray-600 hover:text-blue-600"
          >
            Quay lại
          </Button>
          <WalletOutlined className="text-3xl mr-3 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Ví điện tử của bạn
          </h1>
        </div>

        {/* Wallet Summary Card */}
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : walletData ? (
          <Card className="mb-6 shadow-sm border-0 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg text-gray-600 mb-1">Số dư khả dụng</h2>
                <div className="text-3xl font-bold text-gray-800">
                  {formatCurrency(walletData.availableBalance)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Cập nhật: {new Date(walletData.lastUpdated).toLocaleDateString("vi-VN")}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Statistic
                  title={<span className="text-gray-600">Số dư đang chờ</span>}
                  value={walletData.pendingBalance}
                  prefix={<ArrowDownOutlined />}
                  valueStyle={{ color: '#f59e0b' }}
                  formatter={(value) => formatCurrency(value)}
                  className="bg-white p-3 rounded-lg shadow-xs"
                />
                <Statistic
                  title={<span className="text-gray-600">Tổng thu nhập</span>}
                  value={walletData.lifetimeEarnings}
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: '#10b981' }}
                  formatter={(value) => formatCurrency(value)}
                  className="bg-white p-3 rounded-lg shadow-xs"
                />
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-6">
            <div className="text-center text-gray-500 py-4">
              Không thể tải dữ liệu ví
            </div>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="wallet-tabs"
        >
          <TabPane
            tab={
              <span className="flex items-center">
                <WalletOutlined className="mr-1" />
                Tổng quan
              </span>
            }
            key="overview"
          >
            <Row gutter={[24, 24]} className="mt-4">
              {/* Deposit Card */}
              <Col xs={24} md={12}>
                <Card 
                  title={
                    <div className="flex items-center">
                      <MoneyCollectOutlined className="text-green-500 mr-2" />
                      <span>Nạp tiền vào ví</span>
                    </div>
                  }
                  className="shadow-sm h-full"
                >
                  <Form
                    form={depositForm}
                    layout="vertical"
                    onFinish={handleDepositRequest}
                    initialValues={{
                      currencyCode: "VND",
                      paymentMethod: "BankTransfer",
                    }}
                  >
                    <Form.Item
                      label="Số tiền"
                      name="amount"
                      rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
                    >
                      <InputNumber
                        min={1}
                        style={{ width: "100%" }}
                        placeholder="Nhập số tiền bạn muốn nạp"
                        size="large"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>

                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item
                          label="Loại tiền tệ"
                          name="currencyCode"
                          rules={[{ required: true, message: "Vui lòng chọn loại tiền tệ!" }]}
                        >
                          <Select size="large">
                            <Option value="VND">VND</Option>
                            <Option value="USD">USD</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Phương thức"
                          name="paymentMethod"
                          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}
                        >
                          <Select size="large">
                            <Option value="BankTransfer">Chuyển khoản</Option>
                            <Option value="PayPal">PayPal</Option>
                            <Option value="Momo">Momo</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item className="mt-6">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={depositSubmitting}
                        block
                        size="large"
                        icon={<ArrowDownOutlined />}
                      >
                        Nạp tiền ngay
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              {/* Withdrawal Card */}
              <Col xs={24} md={12}>
                <Card 
                  title={
                    <div className="flex items-center">
                      <TransactionOutlined className="text-blue-500 mr-2" />
                      <span>Rút tiền từ ví</span>
                    </div>
                  }
                  className="shadow-sm h-full"
                >
                  <Form
                    form={payoutForm}
                    layout="vertical"
                    onFinish={handlePayoutRequest}
                    initialValues={{
                      currencyCode: "VND",
                    }}
                  >
                    <Form.Item
                      label="Số tiền"
                      name="amount"
                      rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
                    >
                      <InputNumber
                        min={1}
                        style={{ width: "100%" }}
                        placeholder="Nhập số tiền bạn muốn rút"
                        size="large"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Loại tiền tệ"
                      name="currencyCode"
                      rules={[{ required: true, message: "Vui lòng chọn loại tiền tệ!" }]}
                    >
                      <Select size="large">
                        <Option value="VND">VND</Option>
                        <Option value="USD">USD</Option>
                      </Select>
                    </Form.Item>

                    {walletData && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Số dư khả dụng:</span>
                          <span className="font-medium">{formatCurrency(walletData.availableBalance)}</span>
                        </div>
                      </div>
                    )}

                    <Form.Item className="mt-2">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={payoutSubmitting}
                        block
                        size="large"
                        icon={<ArrowUpOutlined />}
                      >
                        Yêu cầu rút tiền
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center">
                <HistoryOutlined className="mr-1" />
                Lịch sử giao dịch
              </span>
            }
            key="history"
          >
            <Card className="mt-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Lịch sử yêu cầu thanh toán</h3>
                <Input
                  placeholder="Tìm kiếm theo mã hoặc tên..."
                  value={payoutSearch}
                  onChange={(e) => setPayoutSearch(e.target.value)}
                  className="w-64"
                  prefix={<i className="fas fa-search text-gray-400" />}
                />
              </div>
              
              {payoutLoading ? (
                <div className="text-center py-8">
                  <Spin size="large" />
                </div>
              ) : filteredPayoutRequests.length > 0 ? (
                <Table
                  columns={payoutColumns}
                  dataSource={filteredPayoutRequests}
                  rowKey="requestId"
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 'max-content' }}
                  className="wallet-transactions-table"
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <img 
                    src="/empty-state.svg" 
                    alt="No transactions" 
                    className="h-40 mx-auto mb-4"
                  />
                  <p>Chưa có giao dịch nào được thực hiện</p>
                </div>
              )}
            </Card>
          </TabPane>
        </Tabs>

        {/* Quick Stats */}
        {walletData && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Số dư tối thiểu rút</div>
              <div className="text-xl font-semibold">{formatCurrency(100000)}</div>
            </Card>
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Phí rút tiền</div>
              <div className="text-xl font-semibold">0.5%</div>
            </Card>
            <Card className="text-center border-0 shadow-sm bg-white">
              <div className="text-sm text-gray-500 mb-1">Thời gian xử lý</div>
              <div className="text-xl font-semibold">3-5 ngày làm việc</div>
            </Card>
          </div>
        )}
      </div>

      {/* Add some custom styles */}
      <style jsx global>{`
        .wallet-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .wallet-tabs .ant-tabs-tab {
          padding: 12px 16px !important;
          font-size: 15px !important;
        }
        .wallet-tabs .ant-tabs-tab-active {
          background: #f0f7ff !important;
          border-radius: 6px !important;
        }
        .wallet-transactions-table .ant-table-thead > tr > th {
          background: #f8fafc !important;
          font-weight: 600 !important;
        }
      `}</style>
    </motion.div>
  );
}