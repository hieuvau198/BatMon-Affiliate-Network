import { Table, Button, Modal, Input, Select } from "antd";
import { useState } from "react";
import PubMaDetail from "./pubpartials/PubMaDetail";
import { Link } from "react-router-dom";

export default function PublisherManagement() {
  const [publishers, setPublishers] = useState([
    {
      id: "P001",
      name: "Affiliate Hub",
      clicks: 5000,
      conversions: 320,
      revenue: "15,000,000đ",
      status: "Active",
    },
    {
      id: "P002",
      name: "Marketing Pro",
      clicks: 4200,
      conversions: 250,
      revenue: "12,500,000đ",
      status: "Pending",
    },
    {
      id: "P003",
      name: "Media Network",
      clicks: 3100,
      conversions: 150,
      revenue: "8,750,000đ",
      status: "Inactive",
    },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const openEditModal = (publisher) => {
    setSelectedPublisher({ ...publisher });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedPublisher({ ...selectedPublisher, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setPublishers(
      publishers.map((publisher) =>
        publisher.id === selectedPublisher.id ? selectedPublisher : publisher
      )
    );
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Publisher này?")) {
      setPublishers(publishers.filter((publisher) => publisher.id !== id));
    }
  };

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Publisher Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Clicks",
      dataIndex: "clicks",
      key: "clicks",
    },
    {
      title: "Conversions",
      dataIndex: "conversions",
      key: "conversions",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Active"
              ? "bg-green-200 text-green-800"
              : status === "Pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <div className="space-x-2">
            {/* Truyền ID động vào đường dẫn */}
            <Link to={`/advertiser/publisher-management/publisherdetail/${record.id}`}>
              <Button type="primary">Chi tiết</Button>
            </Link>
          </div>
        ),
      },
  ];

  return (
    <div className="p-6 max-w-[1500px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Publisher Management</h2>
          <Button type="primary" onClick={() => openEditModal(null)}>
            + Add Publisher
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={publishers.map((publisher) => ({ ...publisher, key: publisher.id }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title={selectedPublisher?.id ? "Edit Publisher" : "Add New Publisher"}
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Publisher Name</label>
            <Input
              name="name"
              value={selectedPublisher?.name}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Total Clicks</label>
            <Input
              name="clicks"
              type="number"
              value={selectedPublisher?.clicks}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Conversions</label>
            <Input
              name="conversions"
              type="number"
              value={selectedPublisher?.conversions}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Revenue</label>
            <Input
              name="revenue"
              value={selectedPublisher?.revenue}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Status</label>
            <Select
              name="status"
              value={selectedPublisher?.status}
              onChange={(value) => setSelectedPublisher({ ...selectedPublisher, status: value })}
              className="w-full"
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
