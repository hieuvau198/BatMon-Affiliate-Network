import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, message, Space, Typography, Divider } from "antd";
import { ArrowLeftOutlined, FileTextOutlined, BarChartOutlined } from "@ant-design/icons";
import getCampaignDetail from "../../../../modules/Campaign/getCampaignDetail";

const { Title, Text } = Typography;

export default function CampaignAdDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const data = await getCampaignDetail(campaignId);
        if (!data) throw new Error("Không tìm thấy chiến dịch!");
        setCampaign(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaign();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text className="text-lg text-gray-500">Đang tải...</Text>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text className="text-lg text-red-600">Chiến dịch không tồn tại!</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center p-6">
      <div className="max-w-[1200px] w-full">
        {/* Container chính */}
        <div
          className="shadow-lg rounded-xl bg-white p-6"
          bordered={false}
        >
          {/* Điều hướng */}
          <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate(-1)} className="mr-4">
            ⬅ Quay lại
          </Button>
        </div>

          {/* Tiêu đề */}
          <Title level={2} className="text-blue-800 mb-6">
            {campaign.name}
          </Title>

          {/* Thông tin tổng quan */}
          <Card
            title={<Text strong className="text-lg">Thông tin tổng quan</Text>}
            className="mb-6 shadow-sm rounded-lg border-none bg-gray-50"
          >
            <Space direction="vertical" size="middle" className="w-full">
              <div className="flex">
                <Text strong className="w-32">Mô tả:</Text>
                <Text>{campaign.description}</Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Ngân sách:</Text>
                <Text>
                  {campaign.budget.toLocaleString()} {campaign.currencyCode || "VND"}
                </Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Hạn mức ngày:</Text>
                <Text>
                  {campaign.dailyCap.toLocaleString()} {campaign.currencyCode || "VND"}
                </Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Hạn mức tháng:</Text>
                <Text>
                  {campaign.monthlyCap.toLocaleString()} {campaign.currencyCode || "VND"}
                </Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Thời gian:</Text>
                <Text>{`${campaign.startDate} - ${campaign.endDate}`}</Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Trạng thái:</Text>
                <Text
                  className={
                    campaign.status === "Active"
                      ? "text-green-600"
                      : "text-orange-600"
                  }
                >
                  {campaign.status}
                </Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Quốc gia mục tiêu:</Text>
                <Text>{campaign.targetingCountries}</Text>
              </div>
              <div className="flex">
                <Text strong className="w-32">Thiết bị mục tiêu:</Text>
                <Text>{campaign.targetingDevices}</Text>
              </div>
            </Space>
          </Card>

          {/* Chính sách & Hạn chế */}
          <Card
            title={<Text strong className="text-lg">📜 Chính sách & Hạn chế</Text>}
            className="mb-6 shadow-sm rounded-lg border-none bg-gray-50"
          >
            <ul className="list-disc pl-6 text-gray-700">
              <li>Không được sử dụng từ khóa thương hiệu trên quảng cáo.</li>
              <li>Không chạy quảng cáo trên các trang web có nội dung vi phạm.</li>
              <li>Cookie tracking có thời hạn 30 ngày.</li>
            </ul>
          </Card>

          {/* Nút điều hướng */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              onClick={() =>
                navigate(`/advertiser/campaignList/campaigndetail/${campaignId}/CampaignPolicy`)
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Chính sách chiến dịch
            </Button>
            <Button
              type="default"
              icon={<BarChartOutlined />}
              onClick={() =>
                navigate(`/advertiser/campaignList/campaigndetail/${campaignId}/CampaignPerformance`)
              }
              className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
            >
              Xem hiệu suất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}