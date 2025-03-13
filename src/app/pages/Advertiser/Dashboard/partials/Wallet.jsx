import { Table, Button, Modal, Input, Select } from "antd";
import { useState } from "react";

export default function Wallet() {
  const [transactions, setTransactions] = useState([
    {
      id: "T001",
      transactionId: "TXN-20240301",
      type: "Deposit",
      amount: "5,000,000đ",
      status: "Completed",
      date: "2024-03-01",
    },
    {
      id: "T002",
      transactionId: "TXN-20240302",
      type: "Withdrawal",
      amount: "3,200,000đ",
      status: "Pending",
      date: "2024-03-02",
    },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openEditModal = (transaction) => {
    setSelectedTransaction({ ...transaction });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedTransaction({ ...selectedTransaction, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === selectedTransaction.id ? selectedTransaction : transaction
      )
    );
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
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
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span
          className={`px-2 py-1 rounded ${
            type === "Deposit" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {type}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Completed"
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
      title: "Date",
      dataIndex: "date",
      key: "date",
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
    <div className="p-6 max-w-[1500x]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Wallet Transactions</h2>
          <Button type="primary" onClick={() => openEditModal(null)}>
            + New Transaction
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={transactions.map((transaction) => ({ ...transaction, key: transaction.id }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title={selectedTransaction?.id ? "Edit Transaction" : "Add New Transaction"}
        visible={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Transaction ID</label>
            <Input
              name="transactionId"
              value={selectedTransaction?.transactionId}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Type</label>
            <Select
              name="type"
              value={selectedTransaction?.type}
              onChange={(value) => setSelectedTransaction({ ...selectedTransaction, type: value })}
              className="w-full"
            >
              <Select.Option value="Deposit">Deposit</Select.Option>
              <Select.Option value="Withdrawal">Withdrawal</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block font-semibold">Amount</label>
            <Input
              name="amount"
              value={selectedTransaction?.amount}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Status</label>
            <Select
              name="status"
              value={selectedTransaction?.status}
              onChange={(value) => setSelectedTransaction({ ...selectedTransaction, status: value })}
              className="w-full"
            >
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Failed">Failed</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block font-semibold">Date</label>
            <Input
              name="date"
              type="date"
              value={selectedTransaction?.date}
              onChange={handleEditChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
