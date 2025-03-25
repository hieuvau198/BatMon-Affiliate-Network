import { Modal, Button } from "antd";
import { useState, useEffect } from "react";

const EditCampaignPolicy = ({ visible, initialData, onCancel, onSave }) => {
  const [editingPolicy, setEditingPolicy] = useState(
    initialData || {
      key: "",
      stt: "",
      policy: "",
      regulation: "",
      appliedTo: "Tất cả campaign",
      penaltyTitle: ""
    }
  );

  useEffect(() => {
    setEditingPolicy(
      initialData || {
        key: "",
        stt: "",
        policy: "",
        regulation: "",
        appliedTo: "Tất cả campaign",
        penaltyTitle: ""
      }
    );
  }, [initialData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editingPolicy);
  };

  return (
    <Modal
      title={editingPolicy && editingPolicy.key ? "Cập nhật chính sách" : "Thêm chính sách mới"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Lưu
        </Button>
      ]}
      width={800}
    >
      <div className="py-4">
        <form className="space-y-4">
          <div>
            <label className="block mb-1">STT:</label>
            <input
              type="text"
              name="stt"
              value={editingPolicy?.stt || ""}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          <div>
            <label className="block mb-1">Chính sách:</label>
            <input
              type="text"
              name="policy"
              value={editingPolicy?.policy || ""}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Quy định:</label>
            <textarea
              name="regulation"
              value={editingPolicy?.regulation || ""}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded h-32"
            />
          </div>
          <div>
            <label className="block mb-1">Hình thức xử phạt:</label>
            <input
              type="text"
              name="penaltyTitle"
              value={editingPolicy?.penaltyTitle || ""}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Áp dụng cho:</label>
            <select
              name="appliedTo"
              value={editingPolicy?.appliedTo || "Tất cả campaign"}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Tất cả campaign">Tất cả campaign</option>
              <option value="Tùy theo campaign">Tùy theo campaign</option>
            </select>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCampaignPolicy;
