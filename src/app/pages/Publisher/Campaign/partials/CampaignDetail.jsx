import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Spin, message, Button, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getCampaignById } from "../../../../modules/Publisher/getCampaignByID"; // Thay bằng đường dẫn thực tế
import createPromote from "../../../../modules/Promote/createPromote";


export default function CampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPromoted, setHasPromoted] = useState(false); // Trạng thái đã tạo promote
  const [promoting, setPromoting] = useState(false); // Trạng thái loading khi tạo promote

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

        // Kiểm tra xem đã tạo promote cho chiến dịch này chưa
        // Ở đây tôi giả sử chưa có API kiểm tra, nên để mặc định là chưa tạo
        setHasPromoted(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [campaignId]);

  const handleCreatePromote = async () => {
    if (!publisherId) {
      message.error("Không thể tạo promote: Thiếu thông tin nhà xuất bản.");
      return;
    }

    setPromoting(true);
    const promoteData = {
      publisherId: parseInt(publisherId), // Chuyển publisherId thành số
      campaignId: parseInt(campaignId), // Chuyển campaignId thành số
      campaignAdvertiserUrlId: 1, // Giả lập, bạn có thể lấy từ dữ liệu chiến dịch nếu có
      baseTrackingUrl: "https://example.com/tracking", // Giả lập, có thể lấy từ dữ liệu chiến dịch hoặc form
      isApproved: false, // Mặc định là false, có thể điều chỉnh dựa trên logic
      status: "Pending", // Mặc định là Pending
    };

    const result = await createPromote(promoteData);
    if (result) {
      setHasPromoted(true); // Đánh dấu đã tạo promote
    }
    setPromoting(false);
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
          onClick={handleCreatePromote}
          loading={promoting}
          disabled={promoting || hasPromoted} // Vô hiệu hóa nếu đang tạo hoặc đã tạo
        >
          {hasPromoted ? "Xin chờ phê duyệt" : "Tham Gia Chiến Dịch"}
        </Button>
      </div>
    </div>
  );
}