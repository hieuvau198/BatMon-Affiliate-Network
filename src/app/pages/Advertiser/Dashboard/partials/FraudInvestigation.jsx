import { Table, Button, Modal, Input, Select } from "antd";
import { useState } from "react";

export default function FraudInvestigation() {
  const [investigations, setInvestigations] = useState([
    {
      id: "1",
      caseName: "Click Spamming Investigation",
      status: "Under Review",
      severity: "High",
      description: "Unusual high click rate detected from multiple IPs.",
      reportedDate: "2024-03-10",
    },
    {
      id: "2",
      caseName: "Multiple Account Abuse",
      status: "Resolved",
      severity: "Medium",
      description: "User suspected of using multiple accounts for fraud.",
      reportedDate: "2024-02-25",
    },
  ]);

  const [editModal, setEditModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const openEditModal = (caseItem) => {
    setSelectedCase({ ...caseItem });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedCase({ ...selectedCase, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setInvestigations(
      investigations.map((caseItem) => (caseItem.id === selectedCase.id ? selectedCase : caseItem))
    );
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vụ điều tra này?")) {
      setInvestigations(investigations.filter((caseItem) => caseItem.id !== id));
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
      title: "Case Name",
      dataIndex: "caseName",
      key: "caseName",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (severity) => (
        <span
          className={`px-2 py-1 rounded ${
            severity === "High"
              ? "bg-red-200 text-red-800"
              : severity === "Medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {severity}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Under Review"
              ? "bg-blue-200 text-blue-800"
              : status === "Resolved"
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Reported Date",
      dataIndex: "reportedDate",
      key: "reportedDate",
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
    <div className="p-6 max-w-[1500px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Fraud Investigation</h2>
          <Button type="primary" onClick={() => openEditModal(null)}>
            + New Case
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={investigations.map((caseItem) => ({ ...caseItem, key: caseItem.id }))}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title={selectedCase?.id ? "Edit Fraud Case" : "Add New Fraud Case"}
        visible={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Case Name</label>
            <Input
              name="caseName"
              value={selectedCase?.caseName}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Severity</label>
            <Select
              name="severity"
              value={selectedCase?.severity}
              onChange={(value) => setSelectedCase({ ...selectedCase, severity: value })}
              className="w-full"
            >
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block font-semibold">Status</label>
            <Select
              name="status"
              value={selectedCase?.status}
              onChange={(value) => setSelectedCase({ ...selectedCase, status: value })}
              className="w-full"
            >
              <Select.Option value="Under Review">Under Review</Select.Option>
              <Select.Option value="Resolved">Resolved</Select.Option>
              <Select.Option value="Closed">Closed</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block font-semibold">Reported Date</label>
            <Input
              name="reportedDate"
              type="date"
              value={selectedCase?.reportedDate}
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <Input.TextArea
              name="description"
              value={selectedCase?.description}
              onChange={handleEditChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
