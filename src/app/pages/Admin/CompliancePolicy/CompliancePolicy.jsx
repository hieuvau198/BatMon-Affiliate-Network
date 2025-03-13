import { useState, useEffect } from "react"
import { Table, Button, Modal, Typography, Popconfirm, message } from "antd"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import mockPolicies from "./mock_CompliancePolicy"
const { Title, Text } = Typography

export default function CompliancePolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState(null)
  const [policies, setPolicies] = useState([])
  useEffect(() => { setPolicies(mockPolicies) }, [])
  const showPenaltyDetails = (penaltyInfo) => {
    setCurrentPenalty(penaltyInfo)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const showUpdateModal = (record = null) => {
    if (record) {
      setEditingPolicy({
        ...record,
        penaltyTitle: record.penaltyInfo.title,
        penaltyContent: record.penaltyInfo.content,
      })
    } else {
      setEditingPolicy({
        key: String(policies.length + 1),
        stt: String(policies.length + 1),
        policy: "",
        regulation: "",
        appliedTo: "Tất cả campaign",
        penaltyTitle: "",
        penaltyContent: "",
      })
    }
    setIsUpdateModalOpen(true)
  }

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setEditingPolicy((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdatePolicy = () => {
    const updatedPolicy = {
      ...editingPolicy,
      penaltyInfo: {
        title: editingPolicy.penaltyTitle,
        content: editingPolicy.penaltyContent,
      },
    }

    delete updatedPolicy.penaltyTitle
    delete updatedPolicy.penaltyContent

    const newPolicies = [...policies]
    const index = newPolicies.findIndex((item) => item.key === updatedPolicy.key)

    if (index > -1) {
      newPolicies[index] = updatedPolicy
    } else {
      newPolicies.push(updatedPolicy)
    }

    setPolicies(newPolicies)
    message.success("Chính sách đã được cập nhật thành công!")
    setIsUpdateModalOpen(false)
  }

  const handleDeletePolicy = (key) => {
    const newPolicies = policies.filter((item) => item.key !== key)
    // Renumber the STT
    const renumberedPolicies = newPolicies.map((item, index) => ({
      ...item,
      stt: String(index + 1),
    }))
    setPolicies(renumberedPolicies)
    message.success("Chính sách đã được xóa thành công!")
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Chính sách",
      dataIndex: "policy",
      key: "policy",
      width: 200,
      render: (text) => <div className="font-medium">{text}</div>,
    },
    {
      title: "Quy định",
      dataIndex: "regulation",
      key: "regulation",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: "Hình thức xử phạt",
      dataIndex: "penalty",
      key: "penalty",
      width: 150,
      render: (_, record) => (
        <div className="text-center">
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => showPenaltyDetails(record.penaltyInfo)}
          >
            Xem chi tiết
          </Button>
        </div>
      ),
    },
    {
      title: "Áp dụng cho",
      dataIndex: "appliedTo",
      key: "appliedTo",
      width: 200,
      render: (text) => <div className="text-center italic">{text}</div>,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => showUpdateModal(record)}
          />
          <Popconfirm
            title="Xóa chính sách"
            description="Bạn có chắc chắn muốn xóa chính sách này?"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDeletePolicy(record.key)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Chính sách và Quy định</Title>
        <div className="flex items-center gap-3">
          <Link to="../AdminCampaignApproval">
            <Button icon={<ArrowLeftOutlined />} className="hover:bg-gray-100">
              Quay lại phê duyệt
            </Button>
          </Link>
          <Button type="primary" className="bg-green-600 hover:bg-green-700" onClick={() => showUpdateModal()}>
            Thêm chính sách mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={policies}
        pagination={false}
        bordered
        className="policy-table"
        rowClassName={(record, index) => (index % 2 === 0 ? "bg-gray-50" : "")}
      />

      <Modal
        title={currentPenalty?.title || "Chi tiết hình thức xử phạt"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        <div className="py-4">{currentPenalty?.content || "Không có thông tin chi tiết."}</div>
      </Modal>

      <Modal
        title={editingPolicy && editingPolicy.key ? "Cập nhật chính sách" : "Thêm chính sách mới"}
        open={isUpdateModalOpen}
        onCancel={handleUpdateModalClose}
        footer={[
          <Button key="cancel" onClick={handleUpdateModalClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" className="bg-blue-600" onClick={handleUpdatePolicy}>
            Lưu
          </Button>,
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

      <style jsx global>{`
        .policy-table .ant-table-thead > tr > th {
          background-color: #0056b3 !important;
          color: white !important;
          text-align: center !important;
          padding: 12px !important;
          font-weight: bold !important;
        }
        .policy-table .ant-table-tbody > tr > td {
          vertical-align: top;
          padding: 12px;
        }
        .ant-btn-primary {
          background-color: #1890ff;
        }
      `}</style>
    </div>
  )
}

