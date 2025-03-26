import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spin, Statistic, Table, Tag, Form, InputNumber, Select, Button, message, Row, Col, Input, Tabs, Divider, Modal, Popconfirm } from "antd";
import { motion } from "framer-motion";
import { ArrowDownOutlined, ArrowUpOutlined, WalletOutlined, HistoryOutlined, MoneyCollectOutlined, TransactionOutlined, LeftOutlined, GlobalOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import getPublisherBalance from "../../../../modules/PublisherBalance";
import getPayoutRequestsByPublisher from "../../../../modules/PublisherBalance/partials/getPayoutRequestsByPublisher";
import { createPayoutRequest } from "../../../../modules/PublisherBalance/partials/createPayoutRequest";
import { createDepositRequest } from "../../../../modules/PublisherBalance/partials/createDepositRequest";
import getAllTrafficSource from "../../../../modules/TrafficSource/getAllTrafficSource";
import createTrafficSource from "../../../../modules/TrafficSource/createTrafficSource";
import updateTrafficSource from "../../../../modules/TrafficSource/updateTrafficSource";
import deleteTrafficSource from "../../../../modules/TrafficSource/deleteTrafficSource"; // Import API DELETE
const { Option } = Select;
const { TabPane } = Tabs;

export default function WalletDashboard({ publisherId = 1 }) {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(null);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [trafficSubmitting, setTrafficSubmitting] = useState(false);
  const [editTrafficSubmitting, setEditTrafficSubmitting] = useState(false);
  const [deleteTrafficSubmitting, setDeleteTrafficSubmitting] = useState(false); // State cho xóa
  const [payoutSearch, setPayoutSearch] = useState("");
  const [trafficSearch, setTrafficSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTrafficSource, setSelectedTrafficSource] = useState(null);

  const [payoutForm] = Form.useForm();
  const [depositForm] = Form.useForm();
  const [trafficForm] = Form.useForm();
  const [editTrafficForm] = Form.useForm();

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

    const fetchTrafficSources = async () => {
      try {
        setTrafficLoading(true);
        const data = await getAllTrafficSource();
        if (data) {
          setTrafficSources(data);
        }
        setTrafficLoading(false);
      } catch (error) {
        console.error("Error fetching traffic sources:", error);
        setTrafficLoading(false);
      }
    };

    fetchWalletData();
    fetchPayoutRequests();
    fetchTrafficSources();
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

  const handleCreateTrafficSource = async (values) => {
    setTrafficSubmitting(true);
    try {
      const trafficData = {
        publisherId: parseInt(publisherId),
        name: values.name,
        type: values.type,
        url: values.url,
        addedDate: new Date().toISOString().split("T")[0],
        isActive: values.isActive === "true",
        publisher: null,
      };

      const result = await createTrafficSource(trafficData);
      if (result) {
        const updatedTrafficSources = await getAllTrafficSource();
        setTrafficSources(updatedTrafficSources);
        trafficForm.resetFields();
        message.success("Nguồn lưu lượng đã được tạo thành công!");
      }
    } catch (error) {
      console.error("Error submitting traffic source:", error);
      message.error("Có lỗi xảy ra khi tạo nguồn lưu lượng!");
    } finally {
      setTrafficSubmitting(false);
    }
  };

  const handleEditTrafficSource = async (values) => {
    if (!selectedTrafficSource) return;

    setEditTrafficSubmitting(true);
    try {
      const trafficData = {
        publisherId: parseInt(publisherId),
        name: values.name,
        type: values.type,
        url: values.url,
        addedDate: selectedTrafficSource.addedDate,
        isActive: values.isActive === "true",
        publisher: null,
      };

      const result = await updateTrafficSource(selectedTrafficSource.sourceId, trafficData);
      if (result) {
        const updatedTrafficSources = await getAllTrafficSource();
        setTrafficSources(updatedTrafficSources);
        setIsEditModalVisible(false);
        editTrafficForm.resetFields();
        message.success("Nguồn lưu lượng đã được cập nhật thành công!");
      }
    } catch (error) {
      console.error("Error updating traffic source:", error);
      message.error("Có lỗi xảy ra khi cập nhật nguồn lưu lượng!");
    } finally {
      setEditTrafficSubmitting(false);
    }
  };

  const handleDeleteTrafficSource = async (sourceId) => {
    setDeleteTrafficSubmitting(true);
    try {
      const result = await deleteTrafficSource(sourceId);
      if (result) {
        const updatedTrafficSources = await getAllTrafficSource();
        setTrafficSources(updatedTrafficSources);
        message.success("Nguồn lưu lượng đã được xóa thành công!");
      }
    } catch (error) {
      console.error("Error deleting traffic source:", error);
      message.error("Có lỗi xảy ra khi xóa nguồn lưu lượng!");
    } finally {
      setDeleteTrafficSubmitting(false);
    }
  };

  const showEditModal = (trafficSource) => {
    setSelectedTrafficSource(trafficSource);
    editTrafficForm.setFieldsValue({
      name: trafficSource.name,
      type: trafficSource.type,
      url: trafficSource.url,
      isActive: trafficSource.isActive.toString(),
    });
    setIsEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    editTrafficForm.resetFields();
    setSelectedTrafficSource(null);
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
        let color = "default";
        if (status === "Pending") color = "orange";
        if (status === "Completed") color = "green";
        if (status === "Failed") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
      width: 120,
    },
  ];

  const trafficColumns = [
    {
      title: "Mã nguồn",
      dataIndex: "sourceId",
      key: "sourceId",
      width: 80,
    },
    {
      title: "Tên nguồn",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 120,
      ellipsis: true,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: 200,
      ellipsis: true,
      render: (url) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {url}
        </a>
      ),
    },
    {
      title: "Ngày thêm",
      dataIndex: "addedDate",
      key: "addedDate",
      width: 100,
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Hoạt động" : "Không hoạt động"}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nguồn lưu lượng này?"
            onConfirm={() => handleDeleteTrafficSource(record.sourceId)}
            okText="Có"
            cancelText="Không"
            disabled={deleteTrafficSubmitting}
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              loading={deleteTrafficSubmitting}
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filteredPayoutRequests = payoutRequests.filter((request) =>
    request.requestId.toString().includes(payoutSearch) ||
    request.publisherName?.toLowerCase().includes(payoutSearch.toLowerCase())
  );

  const filteredTrafficSources = trafficSources.filter((source) =>
    source.sourceId.toString().includes(trafficSearch) ||
    source.name.toLowerCase().includes(trafficSearch.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
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
                  valueStyle={{ color: "#f59e0b" }}
                  formatter={(value) => formatCurrency(value)}
                  className="bg-white p-3 rounded-lg shadow-xs"
                />
                <Statistic
                  title={<span className="text-gray-600">Tổng thu nhập</span>}
                  value={walletData.lifetimeEarnings}
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: "#10b981" }}
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

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="wallet-tabs">
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
                Trạng Thái Rút Tiền
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
                  scroll={{ x: "max-content" }}
                  className="wallet-transactions-table"
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <img src="/empty-state.svg" alt="No transactions" className="h-40 mx-auto mb-4" />
                  <p>Chưa có giao dịch nào được thực hiện</p>
                </div>
              )}
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center">
                <GlobalOutlined className="mr-1" />
                Nguồn lưu lượng
              </span>
            }
            key="traffic"
          >
            <div className="mt-4">
              {/* Form tạo Traffic Source */}
              <Card
                title={
                  <div className="flex items-center">
                    <PlusOutlined className="text-green-500 mr-2" />
                    <span>Thêm nguồn lưu lượng</span>
                  </div>
                }
                className="shadow-sm mb-6"
              >
                <Form
                  form={trafficForm}
                  layout="vertical"
                  onFinish={handleCreateTrafficSource}
                  initialValues={{
                    isActive: "true",
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Tên nguồn"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên nguồn!" }]}
                      >
                        <Input size="large" placeholder="Nhập tên nguồn lưu lượng" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Loại"
                        name="type"
                        rules={[{ required: true, message: "Vui lòng nhập loại nguồn!" }]}
                      >
                        <Input size="large" placeholder="Nhập loại nguồn (VD: Social Media)" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="URL"
                        name="url"
                        rules={[
                          { required: true, message: "Vui lòng nhập URL!" },
                          { type: "url", message: "Vui lòng nhập URL hợp lệ!" },
                        ]}
                      >
                        <Input size="large" placeholder="Nhập URL nguồn lưu lượng" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Trạng thái"
                        name="isActive"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                      >
                        <Select size="large">
                          <Option value="true">Hoạt động</Option>
                          <Option value="false">Không hoạt động</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={trafficSubmitting}
                      block
                      size="large"
                      icon={<PlusOutlined />}
                    >
                      Thêm nguồn lưu lượng
                    </Button>
                  </Form.Item>
                </Form>
              </Card>

              {/* Danh sách Traffic Sources */}
              <Card className="shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Danh sách nguồn lưu lượng</h3>
                  <Input
                    placeholder="Tìm kiếm theo mã hoặc tên..."
                    value={trafficSearch}
                    onChange={(e) => setTrafficSearch(e.target.value)}
                    className="w-64"
                    prefix={<i className="fas fa-search text-gray-400" />}
                  />
                </div>
                {trafficLoading ? (
                  <div className="text-center py-8">
                    <Spin size="large" />
                  </div>
                ) : filteredTrafficSources.length > 0 ? (
                  <Table
                    columns={trafficColumns}
                    dataSource={filteredTrafficSources}
                    rowKey="sourceId"
                    pagination={{ pageSize: 5 }}
                    className="wallet-transactions-table"
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <img src="/empty-state.svg" alt="No traffic sources" className="h-40 mx-auto mb-4" />
                    <p>Chưa có nguồn lưu lượng nào được thêm</p>
                  </div>
                )}
              </Card>
            </div>
          </TabPane>
        </Tabs>

        {/* Modal chỉnh sửa Traffic Source */}
        <Modal
          title="Chỉnh sửa nguồn lưu lượng"
          visible={isEditModalVisible}
          onCancel={handleCancelEdit}
          footer={null}
        >
          <Form
            form={editTrafficForm}
            layout="vertical"
            onFinish={handleEditTrafficSource}
          >
            <Form.Item
              label="Tên nguồn"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên nguồn!" }]}
            >
              <Input size="large" placeholder="Nhập tên nguồn lưu lượng" />
            </Form.Item>
            <Form.Item
              label="Loại"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập loại nguồn!" }]}
            >
              <Input size="large" placeholder="Nhập loại nguồn (VD: Social Media)" />
            </Form.Item>
            <Form.Item
              label="URL"
              name="url"
              rules={[
                { required: true, message: "Vui lòng nhập URL!" },
                { type: "url", message: "Vui lòng nhập URL hợp lệ!" },
              ]}
            >
              <Input size="large" placeholder="Nhập URL nguồn lưu lượng" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="isActive"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            >
              <Select size="large">
                <Option value="true">Hoạt động</Option>
                <Option value="false">Không hoạt động</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={editTrafficSubmitting}
                block
                size="large"
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>

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
        .wallet-transactions-table .ant-table {
          overflow-x: hidden !important;
        }
      `}</style>
    </motion.div>
  );
}