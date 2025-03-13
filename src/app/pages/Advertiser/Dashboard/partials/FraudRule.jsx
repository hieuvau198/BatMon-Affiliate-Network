import { Table, Button, Modal, Input } from "antd";
import React, { useState } from "react";

const FraudRule = () => {
  const [rules, setRules] = useState([
    { id: 1, ruleName: "Block High-Risk IPs", description: "Block IPs with fraudulent activity." },
    { id: 2, ruleName: "Multiple Accounts Detection", description: "Detect multiple accounts from the same IP." },
    { id: 3, ruleName: "Click Spamming Prevention", description: "Prevent excessive clicks within a short time." },
  ]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState({ id: null, ruleName: "", description: "" });

  // Mở modal chỉnh sửa hoặc thêm mới
  const handleEdit = (rule) => {
    setCurrentRule(rule ? { ...rule } : { id: null, ruleName: "", description: "" });
    setIsModalOpen(true);
  };

  // Xóa quy tắc
  const handleDelete = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  // Lưu quy tắc (chỉnh sửa hoặc thêm mới)
  const handleSave = () => {
    if (currentRule.id) {
      setRules(rules.map((rule) => (rule.id === currentRule.id ? currentRule : rule)));
    } else {
      setRules([...rules, { ...currentRule, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setCurrentRule({ id: null, ruleName: "", description: "" });
  };

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Rule Name",
      dataIndex: "ruleName",
      key: "ruleName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (text, record) => (
        <div className="space-x-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
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
          <h2 className="text-xl font-semibold">Fraud Rule Management</h2>
          <Button type="primary" onClick={() => handleEdit(null)}>
            + Add Rule
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={rules.map((rule) => ({ ...rule, key: rule.id }))}
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>

      {/* Modal thêm / chỉnh sửa quy tắc */}
      <Modal
        title={currentRule.id ? "Edit Fraud Rule" : "Add New Fraud Rule"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Rule Name</label>
            <Input
              value={currentRule.ruleName}
              onChange={(e) => setCurrentRule({ ...currentRule, ruleName: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <Input.TextArea
              value={currentRule.description}
              onChange={(e) => setCurrentRule({ ...currentRule, description: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FraudRule;
