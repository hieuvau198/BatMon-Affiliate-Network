import { useState, useEffect } from "react";
import { Card, Form, Input, Select, Button, Row, Col, Table, Spin, Modal, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import getAllTrafficSource from "../../../../../modules/TrafficSource/getAllTrafficSource";
import createTrafficSource from "../../../../../modules/TrafficSource/createTrafficSource";
import updateTrafficSource from "../../../../../modules/TrafficSource/updateTrafficSource";
import deleteTrafficSource from "../../../../../modules/TrafficSource/deleteTrafficSource";

export default function TrafficSources({ publisherId }) {
  const [trafficSources, setTrafficSources] = useState([]);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [trafficSubmitting, setTrafficSubmitting] = useState(false);
  const [editTrafficSubmitting, setEditTrafficSubmitting] = useState(false);
  const [deleteTrafficSubmitting, setDeleteTrafficSubmitting] = useState(false);
  const [trafficSearch, setTrafficSearch] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTrafficSource, setSelectedTrafficSource] = useState(null);
  const [trafficForm] = Form.useForm();
  const [editTrafficForm] = Form.useForm();

  const fetchTrafficSources = async () => {
    try {
      setTrafficLoading(true);
      const data = await getAllTrafficSource();
      if (data) {
        setTrafficSources(data);
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi tải nguồn lưu lượng!");
    } finally {
      setTrafficLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficSources();
  }, [publisherId]);

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
        publisher: null
      };
      const result = await createTrafficSource(trafficData);
      if (result) {
        message.success("Nguồn lưu lượng đã được tạo thành công!");
        trafficForm.resetFields();
        fetchTrafficSources();
      }
    } catch (error) {
      console.error(error);
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
        publisher: null
      };
      const result = await updateTrafficSource(selectedTrafficSource.sourceId, trafficData);
      if (result) {
        message.success("Nguồn lưu lượng đã được cập nhật thành công!");
        setIsEditModalVisible(false);
        editTrafficForm.resetFields();
        fetchTrafficSources();
      }
    } catch (error) {
      console.error(error);
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
        message.success("Nguồn lưu lượng đã được xóa thành công!");
        fetchTrafficSources();
      }
    } catch (error) {
      console.error(error);
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
      isActive: trafficSource.isActive.toString()
    });
    setIsEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    editTrafficForm.resetFields();
    setSelectedTrafficSource(null);
  };

  const filteredTrafficSources = trafficSources.filter((source) =>
    source.sourceId.toString().includes(trafficSearch) ||
    source.name.toLowerCase().includes(trafficSearch.toLowerCase())
  );

  const columns = [
    {
      title: "Mã nguồn",
      dataIndex: "sourceId",
      key: "sourceId",
      width: 80
    },
    {
      title: "Tên nguồn",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 120,
      ellipsis: true
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
            maxWidth: "100%"
          }}
        >
          {url}
        </a>
      )
    },
    {
      title: "Ngày thêm",
      dataIndex: "addedDate",
      key: "addedDate",
      width: 100,
      render: (date) => new Date(date).toLocaleDateString("vi-VN")
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </span>
      )
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nguồn lưu lượng này?"
            onConfirm={() => handleDeleteTrafficSource(record.sourceId)}
            okText="Có"
            cancelText="Không"
            disabled={deleteTrafficSubmitting}
          >
            <Button type="link" icon={<DeleteOutlined />} danger loading={deleteTrafficSubmitting}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <>
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
          initialValues={{ isActive: "true" }}
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
                  { type: "url", message: "Vui lòng nhập URL hợp lệ!" }
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
                  <Select.Option value="true">Hoạt động</Select.Option>
                  <Select.Option value="false">Không hoạt động</Select.Option>
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
            columns={columns}
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
      <Modal title="Chỉnh sửa nguồn lưu lượng" visible={isEditModalVisible} onCancel={handleCancelEdit} footer={null}>
        <Form form={editTrafficForm} layout="vertical" onFinish={handleEditTrafficSource}>
          <Form.Item label="Tên nguồn" name="name" rules={[{ required: true, message: "Vui lòng nhập tên nguồn!" }]}>
            <Input size="large" placeholder="Nhập tên nguồn lưu lượng" />
          </Form.Item>
          <Form.Item label="Loại" name="type" rules={[{ required: true, message: "Vui lòng nhập loại nguồn!" }]}>
            <Input size="large" placeholder="Nhập loại nguồn (VD: Social Media)" />
          </Form.Item>
          <Form.Item label="URL" name="url" rules={[{ required: true, message: "Vui lòng nhập URL!" }, { type: "url", message: "Vui lòng nhập URL hợp lệ!" }]}>
            <Input size="large" placeholder="Nhập URL nguồn lưu lượng" />
          </Form.Item>
          <Form.Item label="Trạng thái" name="isActive" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
            <Select size="large">
              <Select.Option value="true">Hoạt động</Select.Option>
              <Select.Option value="false">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={editTrafficSubmitting} block size="large">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
