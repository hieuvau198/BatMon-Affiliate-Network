import { useState } from "react";
import { Card, Form, InputNumber, Select, Button, Row, Col, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, MoneyCollectOutlined, TransactionOutlined } from "@ant-design/icons";
import { createPayoutRequest } from "../../../../../modules/PublisherBalance/partials/createPayoutRequest";
import { createDepositRequest } from "../../../../../modules/PublisherBalance/partials/createDepositRequest";

export default function Overview({ walletData, formatCurrency, formatDynamicCurrency, updateWalletData, publisherId }) {
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [depositForm] = Form.useForm();
  const [payoutForm] = Form.useForm();

  const handleDepositRequest = async (values) => {
    setDepositSubmitting(true);
    try {
      const depositData = {
        amount: values.amount,
        currencyCode: values.currencyCode,
        publisherId: parseInt(publisherId),
        paymentMethod: values.paymentMethod
      };
      const result = await createDepositRequest(depositData);
      if (result) {
        depositForm.resetFields();
        message.success("Yêu cầu nạp tiền đã được gửi thành công!");
        updateWalletData();
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu nạp tiền!");
    } finally {
      setDepositSubmitting(false);
    }
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
        publisherId: parseInt(publisherId)
      };
      const result = await createPayoutRequest(payoutData);
      if (result) {
        payoutForm.resetFields();
        message.success("Yêu cầu rút tiền đã được gửi thành công!");
        updateWalletData();
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu rút tiền!");
    } finally {
      setPayoutSubmitting(false);
    }
  };

  return (
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
              paymentMethod: "BankTransfer"
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
                    <Select.Option value="VND">VND</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
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
                    <Select.Option value="BankTransfer">Chuyển khoản</Select.Option>
                    <Select.Option value="PayPal">PayPal</Select.Option>
                    <Select.Option value="Momo">Momo</Select.Option>
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
            initialValues={{ currencyCode: "VND" }}
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
                <Select.Option value="VND">VND</Select.Option>
                <Select.Option value="USD">USD</Select.Option>
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
  );
}
