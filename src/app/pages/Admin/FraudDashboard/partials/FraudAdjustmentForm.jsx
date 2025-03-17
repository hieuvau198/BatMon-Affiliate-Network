import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  InputNumber, 
  DatePicker, 
  Select, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  message, 
  Spin,
  Row,
  Col,
  Space
} from 'antd';
import { 
  SaveOutlined, 
  RollbackOutlined, 
  DollarOutlined,
  PercentageOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const FraudAdjustmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [fraudCases, setFraudCases] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [adjustedAmount, setAdjustedAmount] = useState(0);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setInitialLoading(true);
      try {
        // Fetch fraud cases from API
        // Mocking data for demonstration
        const mockFraudCases = [
          { id: 1, title: 'Click Fraud Campaign A', amount: 5000 },
          { id: 2, title: 'Traffic Manipulation Campaign B', amount: 3500 },
          { id: 3, title: 'Fake Conversions Campaign C', amount: 2800 }
        ];
        
        // Fetch currencies from API
        const mockCurrencies = [
          { code: 'USD', name: 'US Dollar' },
          { code: 'EUR', name: 'Euro' },
          { code: 'GBP', name: 'British Pound' },
          { code: 'VND', name: 'Vietnamese Dong' }
        ];

        // Fetch approvers from API
        const mockApprovers = [
          { id: 1, name: 'Admin User' },
          { id: 2, name: 'Financial Manager' },
          { id: 3, name: 'Compliance Officer' }
        ];

        setFraudCases(mockFraudCases);
        setCurrencies(mockCurrencies);
        setApprovers(mockApprovers);

        // If editing an existing adjustment
        if (id) {
          setIsEdit(true);
          // Fetch adjustment details from API
          // Mocking data for demonstration
          const mockAdjustment = {
            adjustmentId: id,
            fraudCaseId: 2,
            originalAmount: 3500,
            adjustedAmount: 2800,
            adjustmentPercentage: 20,
            adjustmentDate: '2025-03-15',
            reason: 'Partial refund due to proven legitimate traffic',
            approvedBy: 2,
            currencyCode: 'USD'
          };

          setOriginalAmount(mockAdjustment.originalAmount);
          setAdjustedAmount(mockAdjustment.adjustedAmount);
          setAdjustmentPercentage(mockAdjustment.adjustmentPercentage);

          form.setFieldsValue({
            ...mockAdjustment,
            adjustmentDate: dayjs(mockAdjustment.adjustmentDate)
          });
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        message.error('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, [id, form]);

  const handleFraudCaseChange = (value) => {
    const selectedCase = fraudCases.find(c => c.id === value);
    if (selectedCase) {
      setOriginalAmount(selectedCase.amount);
      form.setFieldsValue({ originalAmount: selectedCase.amount });
      calculateAdjustment(selectedCase.amount, adjustedAmount);
    }
  };

  const handleAdjustedAmountChange = (value) => {
    setAdjustedAmount(value);
    calculateAdjustment(originalAmount, value);
  };

  const handleAdjustmentPercentageChange = (value) => {
    setAdjustmentPercentage(value);
    const newAdjustedAmount = originalAmount * (1 - value / 100);
    setAdjustedAmount(Number(newAdjustedAmount.toFixed(2)));
    form.setFieldsValue({ adjustedAmount: newAdjustedAmount.toFixed(2) });
  };

  const calculateAdjustment = (original, adjusted) => {
    if (original && adjusted) {
      const percentage = ((original - adjusted) / original) * 100;
      setAdjustmentPercentage(Number(percentage.toFixed(2)));
      form.setFieldsValue({ adjustmentPercentage: percentage.toFixed(2) });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Format date to string for API
      const formattedData = {
        ...values,
        adjustmentDate: values.adjustmentDate.format('YYYY-MM-DD')
      };

      // Make API call to save adjustment
      console.log('Form values to submit:', formattedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(isEdit ? 'Điều chỉnh gian lận đã được cập nhật!' : 'Điều chỉnh gian lận đã được tạo!');
      navigate('/fraud-adjustments');
    } catch (error) {
      console.error('Error saving fraud adjustment:', error);
      message.error('Có lỗi xảy ra khi lưu điều chỉnh gian lận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="shadow-md">
        <div className="mb-6">
          <Title level={2}>
            {isEdit ? 'Chỉnh sửa điều chỉnh gian lận' : 'Tạo điều chỉnh gian lận mới'}
          </Title>
          <Text type="secondary">
            {isEdit 
              ? 'Chỉnh sửa thông tin điều chỉnh tài chính cho vụ gian lận'
              : 'Tạo điều chỉnh tài chính mới cho vụ gian lận đã được xác định'}
          </Text>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            adjustmentDate: dayjs(),
            currencyCode: 'USD'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fraudCaseId"
                label="Vụ gian lận"
                rules={[{ required: true, message: 'Vui lòng chọn vụ gian lận!' }]}
              >
                <Select 
                  placeholder="Chọn vụ gian lận"
                  onChange={handleFraudCaseChange}
                  disabled={isEdit}
                >
                  {fraudCases.map(fraudCase => (
                    <Option key={fraudCase.id} value={fraudCase.id}>
                      {fraudCase.title} (${fraudCase.amount})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="currencyCode"
                label="Loại tiền tệ"
                rules={[{ required: true, message: 'Vui lòng chọn loại tiền tệ!' }]}
              >
                <Select placeholder="Chọn loại tiền tệ">
                  {currencies.map(currency => (
                    <Option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="originalAmount"
                label="Số tiền ban đầu"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền ban đầu!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  precision={2}
                  prefix={<DollarOutlined />}
                  disabled={true}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="adjustedAmount"
                label="Số tiền sau điều chỉnh"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền sau điều chỉnh!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  precision={2}
                  prefix={<DollarOutlined />}
                  onChange={handleAdjustedAmountChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="adjustmentPercentage"
                label="Phần trăm điều chỉnh"
                rules={[{ required: true, message: 'Vui lòng nhập phần trăm điều chỉnh!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  step={0.01}
                  precision={2}
                  suffix="%"
                  onChange={handleAdjustmentPercentageChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="adjustmentDate"
                label="Ngày điều chỉnh"
                rules={[{ required: true, message: 'Vui lòng chọn ngày điều chỉnh!' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="approvedBy"
                label="Người phê duyệt"
                rules={[{ required: true, message: 'Vui lòng chọn người phê duyệt!' }]}
              >
                <Select placeholder="Chọn người phê duyệt">
                  {approvers.map(approver => (
                    <Option key={approver.id} value={approver.id}>
                      {approver.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="reason"
            label="Lý do điều chỉnh"
            rules={[{ required: true, message: 'Vui lòng nhập lý do điều chỉnh!' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Nhập lý do chi tiết cho việc điều chỉnh này..." 
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />} 
                loading={loading}
              >
                {isEdit ? 'Cập nhật điều chỉnh' : 'Tạo điều chỉnh'}
              </Button>
              <Button 
                icon={<RollbackOutlined />} 
                onClick={() => navigate('../FraudDashboard')}
              >
                Hủy bỏ
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FraudAdjustmentForm;