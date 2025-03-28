import { useState } from "react";
import { Card, Form, InputNumber, Select, Button, Row, Col, message } from "antd";
import { ArrowUpOutlined, TransactionOutlined } from "@ant-design/icons";
import { createPayoutRequest } from "../../../../../modules/PublisherBalance/partials/createPayoutRequest";

export default function Overview({ walletData, formatCurrency, updateWalletData, publisherId }) {
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [payoutForm] = Form.useForm();

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
      <Col xs={24}>
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
