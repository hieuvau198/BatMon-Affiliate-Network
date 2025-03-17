import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import mockPolicy from "./mock_policy.json";

export default function CampaignPolicy() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolicy() {
      try {
        if (!mockPolicy || !Array.isArray(mockPolicy)) {
          throw new Error("Dữ liệu chính sách không hợp lệ!");
        }

        const policyData = mockPolicy.find(p => p.campaignId && p.campaignId.toString() === campaignId);
        
        if (!policyData) {
          throw new Error("Không tìm thấy chính sách chiến dịch!");
        }

        setPolicy(policyData);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPolicy();
  }, [campaignId]);

  if (loading) return <p className="text-center mt-6">Đang tải...</p>;
  if (!policy) return <p className="text-center mt-6 text-red-600">Chính sách chiến dịch không tồn tại!</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow rounded-lg bg-white p-6 max-w-[1500px] w-full">
        
        {/* Điều hướng */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate(-1)} className="mr-4">
            ⬅ Quay lại
          </Button>
          <span className="text-gray-500">Chiến dịch / Chính sách / {policy.policyTitle}</span>
        </div>

        {/* Nội dung chính sách */}
        <h2 className="text-2xl font-semibold mb-4">{policy.policyTitle}</h2>
        <p className="text-gray-600">{policy.description}</p>

        {/* Danh sách quy định */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">📜 Quy định</h3>
          <ul className="list-disc pl-6">
            {policy.rules.map((rule, index) => (
              <li key={index} className="mb-2">{rule}</li>
            ))}
          </ul>
        </Card>

        {/* Cấu trúc hoa hồng */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">💰 Cấu trúc hoa hồng</h3>
          <p><strong>Loại hoa hồng:</strong> {policy.commissionStructure.type}</p>
          <p><strong>Mức hoa hồng chung:</strong> {policy.commissionStructure.rate}</p>
          <h4 className="text-md font-semibold mt-3">Chi tiết theo danh mục:</h4>
          <ul className="list-disc pl-6">
            {policy.commissionStructure.details.map((item, index) => (
              <li key={index}>
                <strong>{item.category}</strong>: {item.rate}
              </li>
            ))}
          </ul>
        </Card>

        {/* Hạn chế */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">🚫 Hạn chế</h3>
          <ul className="list-disc pl-6">
            {policy.restrictions.map((restriction, index) => (
              <li key={index}>{restriction}</li>
            ))}
          </ul>
        </Card>

        {/* Hình phạt */}
        <Card className="bg-red-100 mt-6">
          <h3 className="text-lg font-semibold mb-3">⚠️ Hình phạt</h3>
          <p>{policy.penalty}</p>
        </Card>

      </Card>
    </div>
  );
}
