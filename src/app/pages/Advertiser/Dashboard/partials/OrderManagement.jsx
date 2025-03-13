import { Table, Button, Modal, Input, Select } from "antd";
import { useState } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "101",
      orderNumber: "ORD-20240301",
      customerName: "John Doe",
      status: "Processing",
      totalAmount: "1,200,000đ",
      orderDate: "2024-03-01",
    },
    {
      id: "102",
      orderNumber: "ORD-20240302",
      customerName: "Alice Smith",
      status: "Completed",
      totalAmount: "950,000đ",
      orderDate: "2024-03-02",
    },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openEditModal = (order) => {
    setSelectedOrder({ ...order });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedOrder({ ...selectedOrder, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setOrders(
      orders.map((order) => (order.id === selectedOrder.id ? selectedOrder : order))
    );
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      setOrders(orders.filter((order) => order.id !== id));
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
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Processing"
              ? "bg-blue-200 text-blue-800"
              : status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2">
          <Button type="default" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1500px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Management</h2>
          <Button type="primary" onClick={() => openEditModal(null)}>
            + New Order
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={orders.map((order) => ({ ...order, key: order.id }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title={selectedOrder?.id ? "Edit Order" : "Add New Order"}
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Order Number</label>
            <Input
              name="orderNumber"
              value={selectedOrder?.orderNumber}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Customer Name</label>
            <Input
              name="customerName"
              value={selectedOrder?.customerName}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Status</label>
            <Select
              name="status"
              value={selectedOrder?.status}
              onChange={(value) => setSelectedOrder({ ...selectedOrder, status: value })}
              className="w-full"
            >
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Cancelled">Cancelled</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block font-semibold">Total Amount</label>
            <Input
              name="totalAmount"
              value={selectedOrder?.totalAmount}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Order Date</label>
            <Input
              name="orderDate"
              type="date"
              value={selectedOrder?.orderDate}
              onChange={handleEditChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
