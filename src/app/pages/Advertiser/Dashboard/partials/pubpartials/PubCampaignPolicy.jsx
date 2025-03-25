import { useState, useEffect } from "react";
import { Table, Button, Modal, Typography, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import getCampaignPolicy from "../../../../../modules/CampaignPolicy/getCampaignPolicy";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export default function CampaignPolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPenalty, setCurrentPenalty] = useState(null);
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchPolicies() {
      try {
        const data = await getCampaignPolicy();
        const transformed = data.map((policy, index) => ({
          key: policy.policyId.toString(),
          stt: index + 1,
          policy: policy.policyName,
          regulation: policy.description,
          penaltyInfo: policy.penaltyInfo,
          appliedTo: policy.appliedTo,
        }));
        setPolicies(transformed);
      } catch (error) {
        console.error("Error fetching policies:", error);
        message.error("Không thể lấy dữ liệu chính sách.");
      }
    }
    fetchPolicies();
  }, []);

  const showPenaltyDetails = (penaltyInfo) => {
    setCurrentPenalty(penaltyInfo);
    setIsModalOpen(true);
  };

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
      render: (text) => <div className="font-medium text-blue-700">{text}</div>,
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
      width: 160,
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
      width: 160,
      render: (text) => <div className="text-center italic text-gray-600">{text}</div>,
    },
  ];

  return (
    <div className="p-6">
      {/* Điều hướng */}
      <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate(-1)} className="mr-4">
            ⬅ Quay lại
          </Button>
        </div>


      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!text-gray-800">📜 Chính sách & Quy định</Title>
      </div>

      <Table
        columns={columns}
        dataSource={policies}
        pagination={{ pageSize: 10 }}
        bordered
        className="policy-table rounded-lg overflow-hidden"
        rowClassName={(_, index) => (index % 2 === 0 ? "bg-gray-50" : "")}
      />

      <Modal
        title={<span className="text-blue-600 font-semibold">Chi tiết hình thức xử phạt</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p className="whitespace-pre-line leading-relaxed text-gray-700">
          {currentPenalty}
        </p>
      </Modal>

      <style jsx global>{`
        .policy-table .ant-table-thead > tr > th {
          background-color: #1d4ed8 !important;
          color: white !important;
          text-align: center;
          font-weight: bold;
        }
        .policy-table .ant-table-tbody > tr > td {
          vertical-align: top;
          padding: 12px;
        }
      `}</style>
    </div>
  );
}
