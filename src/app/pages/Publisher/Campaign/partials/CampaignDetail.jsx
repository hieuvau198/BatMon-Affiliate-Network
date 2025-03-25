

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Spin, message, Button, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getCampaignById } from "../../../../modules/Publisher/getCampaignByID"; // Thay bằng đường dẫn thực tế
import { joinCampaign } from "../../../../modules/Publisher/joinCampain";
export default function CampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false); // Trạng thái đã tham gia
  const [joining, setJoining] = useState(false); // Trạng thái loading khi tham gia

  // Giả định publisherId được lấy từ local storage hoặc context
  // Bạn cần thay thế logic này bằng cách lấy publisherId thực tế
  const publisherId = localStorage.getItem("publisherId") || "1"; // Ví dụ: Giả định publisherId là 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy thông tin chiến dịch từ API GET /api/Campaign/{id}
        if (!campaignId) {
          throw new Error("Missing campaignId");
        }
        const campaignData = await getCampaignById(campaignId);
        if (!campaignData) {
          throw new Error("Campaign not found");
        }
        setCampaign(campaignData);

        // Kiểm tra xem đã tham gia chiến dịch chưa (có thể dùng API GET /api/CampaignPublisherCommission/campaign/{campaignId})
        // Ở đây tôi giả sử chưa có API kiểm tra, nên để mặc định là chưa tham gia
        setHasJoined(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [campaignId]);

  const handleJoinCampaign = async () => {
    if (!publisherId) {
      message.error("Không thể tham gia chiến dịch: Thiếu thông tin nhà xuất bản.");
      return;
    }

    setJoining(true);
    const campaignData = {
      campaignId: parseInt(campaignId), // Chuyển campaignId thành số
      publisherId: parseInt(publisherId), // Chuyển publisherId thành số
      totalAmount: 0,
      pendingAmount: 0,
      approvedAmount: 0,
      rejectedAmount: 0,
      paidAmount: 0,
      lastConversionDate: new Date().toISOString(),
      lastApprovalDate: new Date().toISOString(),
      holdoutDays: 0,
      commissionStatus: "Pending",
      availableDate: new Date().toISOString(),
      currencyCode: campaign?.currencyCode || "VND",
    };

    const result = await joinCampaign(campaignData);
    if (result) {
      setHasJoined(true); // Đánh dấu đã tham gia
    }
    setJoining(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Đang tải chi tiết chiến dịch..." />
      </div>
    );
  }

  if (!campaign) {
    return <p className="text-center text-red-500 text-lg">Không tìm thấy chiến dịch!</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <Card
        title={<span className="text-xl font-semibold">{campaign.name}</span>}
        bordered
        className="max-w-4xl w-full shadow-lg rounded-lg"
      >
        <Descriptions bordered column={1} className="text-gray-700">
          <Descriptions.Item label="Mô tả" className="font-semibold">
            {campaign.description || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngân sách" className="font-semibold">
            {campaign.budget?.toLocaleString()} {campaign.currencyCode}
          </Descriptions.Item>
          <Descriptions.Item label="Giới hạn hàng ngày">
            {campaign.dailyCap?.toLocaleString()} {campaign.currencyCode}
          </Descriptions.Item>
          <Descriptions.Item label="Giới hạn hàng tháng">
            {campaign.monthlyCap?.toLocaleString()} {campaign.currencyCode}
          </Descriptions.Item>
          <Descriptions.Item label="Bắt đầu">{campaign.startDate}</Descriptions.Item>
          <Descriptions.Item label="Kết thúc">{campaign.endDate}</Descriptions.Item>
          <Descriptions.Item label="Quốc gia mục tiêu">
            {campaign.targetingCountries}
          </Descriptions.Item>
          <Descriptions.Item label="Thiết bị mục tiêu">
            {campaign.targetingDevices}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={campaign.status === "Đang hoạt động" ? "green" : "orange"}>
              {campaign.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Riêng tư">
            {campaign.isPrivate ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Tỷ lệ chuyển đổi">
            {campaign.conversionRate}%
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{campaign.createdDate}</Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">{campaign.lastUpdated}</Descriptions.Item>
          <Descriptions.Item label="Tên nhà quảng cáo">
            {campaign.advertiserName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Tên tiền tệ">
            {campaign.currencyName || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <div className="mt-6 flex gap-4">
        <Button
          className="flex items-center gap-2"
          type="primary"
          onClick={() => navigate(-1)}
        >
          <LeftOutlined /> Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleJoinCampaign}
          loading={joining}
          disabled={joining || hasJoined} // Vô hiệu hóa nếu đang tham gia hoặc đã tham gia
        >
          {hasJoined ? "Đã tham gia" : "Tham gia chiến dịch"}
        </Button>
      </div>
    </div>
  );
}