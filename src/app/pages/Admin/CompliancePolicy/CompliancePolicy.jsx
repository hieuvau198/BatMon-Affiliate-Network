import { useState, useEffect } from "react"
import { Table, Button, Modal, Typography, Popconfirm, message } from "antd"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import getCampaignPolicy from "../../../modules/CampaignPolicy/getCampaignPolicy"
import editCampaignPolicy from "../../../modules/CampaignPolicy/editCampaignPolicy"
import addCampaignPolicy from "../../../modules/CampaignPolicy/addCampaignPolicy"
import EditCampaignPolicy from "./partials/EditCampaignPolicy"

const { Title, Text } = Typography

export default function CompliancePolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState(null)
  const [policies, setPolicies] = useState([])

  // Fetch policies from API on mount
  useEffect(() => {
    async function fetchPolicies() {
      try {
        const data = await getCampaignPolicy()
        const transformed = data.map((policy, index) => ({
          key: policy.policyId.toString(),
          stt: (index + 1).toString(),
          policy: policy.policyName,
          regulation: policy.description,
          penaltyInfo: policy.penaltyInfo,
          appliedTo: policy.appliedTo,
        }))
        setPolicies(transformed)
      } catch (error) {
        console.error("Error fetching policies:", error)
        message.error("Không thể lấy dữ liệu chính sách.")
      }
    }
    fetchPolicies()
  }, [])

  const showPenaltyDetails = (penaltyInfo) => {
    setCurrentPenalty(penaltyInfo)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Open the update modal with prefilled data for editing
  // If record is null, then we're adding a new policy.
  const showUpdateModal = (record = null) => {
    if (record) {
      setEditingPolicy({
        ...record,
        penaltyTitle: record.penaltyInfo,
        isNew: false,
      })
    } else {
      // New policy: set default values and mark as new.
      setEditingPolicy({
        key: String(policies.length + 1),
        stt: String(policies.length + 1),
        policy: "",
        regulation: "",
        appliedTo: "Tất cả campaign",
        penaltyTitle: "",
        isNew: true,
      })
    }
    setIsUpdateModalOpen(true)
  }

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false)
  }

  // This function is called when the EditCampaignPolicy modal calls onSave.
  const handleUpdatePolicy = async (updatedData) => {
    if (updatedData.isNew) {
      // Create a new policy via addCampaignPolicy API
      const payload = {
        policyName: updatedData.policy,
        description: updatedData.regulation,
        penaltyInfo: updatedData.penaltyTitle,
        appliedTo: updatedData.appliedTo,
      }
      try {
        const result = await addCampaignPolicy(payload)
        if (result) {
          const newPolicy = {
            key: result.policyId.toString(),
            policy: result.policyName,
            regulation: result.description,
            penaltyInfo: result.penaltyInfo,
            appliedTo: result.appliedTo,
          }
          const newPolicies = [...policies, newPolicy]
          const renumberedPolicies = newPolicies.map((item, idx) => ({
            ...item,
            stt: (idx + 1).toString(),
          }))
          setPolicies(renumberedPolicies)
          setIsUpdateModalOpen(false)
        }
      } catch (error) {
        console.error("Error adding policy:", error)
      }
    } else {
      // Update an existing policy via editCampaignPolicy API
      const campaignPolicyData = {
        policyId: Number(updatedData.key),
        policyName: updatedData.policy,
        description: updatedData.regulation,
        penaltyInfo: updatedData.penaltyTitle,
        appliedTo: updatedData.appliedTo,
      }
      try {
        const result = await editCampaignPolicy({ campaignPolicyData })
        const newPolicies = [...policies]
        const index = newPolicies.findIndex((item) => item.key === updatedData.key)
        const updatedPolicy = {
          key: result.policyId.toString(),
          policy: result.policyName,
          regulation: result.description,
          penaltyInfo: result.penaltyInfo,
          appliedTo: result.appliedTo,
        }
        if (index > -1) {
          newPolicies[index] = { ...newPolicies[index], ...updatedPolicy }
        }
        const renumberedPolicies = newPolicies.map((item, idx) => ({
          ...item,
          stt: (idx + 1).toString(),
        }))
        setPolicies(renumberedPolicies)
        setIsUpdateModalOpen(false)
      } catch (error) {
        console.error("Error updating policy:", error)
      }
    }
  }

  const handleDeletePolicy = (key) => {
    const newPolicies = policies.filter((item) => item.key !== key)
    const renumberedPolicies = newPolicies.map((item, index) => ({
      ...item,
      stt: (index + 1).toString(),
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
      dataIndex: "penaltyInfo",
      key: "penaltyInfo",
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
        title="Chi tiết hình thức xử phạt"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        <div className="py-4">{currentPenalty || "Không có thông tin chi tiết."}</div>
      </Modal>

      <EditCampaignPolicy
        visible={isUpdateModalOpen}
        initialData={editingPolicy}
        onCancel={handleUpdateModalClose}
        onSave={handleUpdatePolicy}
      />

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
