import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Spin, message, Button, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getCampaignById } from "../../../../modules/Publisher/getCampaignByID";
import  createPromote  from "../../../../modules/Promote/createPromote";
import { getCampaignAdvertiserUrl } from "../../../../modules/PublisherCampaign/partials/getCampaignAdvertiserUrl";
import  getAdvertiserUrl  from "../../../../modules/AdvertiserUrl/getAdverUrlByAdverId"; // Adjust path as needed

export default function CampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [campaignAdvertiserUrl, setCampaignAdvertiserUrl] = useState(null);
  const [advertiserUrl, setAdvertiserUrl] = useState(null); // New state for AdvertiserUrl
  const [loading, setLoading] = useState(true);
  const [hasPromoted, setHasPromoted] = useState(false);
  const [promoting, setPromoting] = useState(false);

  const publisherId = localStorage.getItem("publisherId") || "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!campaignId) {
          throw new Error("Missing campaignId");
        }

        // Fetch campaign details
        const campaignData = await getCampaignById(campaignId);
        if (!campaignData) {
          throw new Error("Campaign not found");
        }
        setCampaign(campaignData);

        // Fetch CampaignAdvertiserUrl data
        const advertiserUrlData = await getCampaignAdvertiserUrl(campaignId);
        if (!advertiserUrlData || advertiserUrlData.length === 0) {
          throw new Error("No CampaignAdvertiserUrl found for this campaign");
        }
        setCampaignAdvertiserUrl(advertiserUrlData[0]);

        // Fetch AdvertiserUrl data using advertiserUrlId
        const advertiserUrlId = advertiserUrlData[0].advertiserUrlId;
        const advertiserUrlDetails = await getAdvertiserUrl(advertiserUrlId);
        if (!advertiserUrlDetails) {
          throw new Error("No AdvertiserUrl found for this advertiserUrlId");
        }
        setAdvertiserUrl(advertiserUrlDetails);

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

    if (!campaignAdvertiserUrl) {
      message.error("Không thể tạo promote: Thiếu thông tin CampaignAdvertiserUrl.");
      return;
    }

    setPromoting(true);
    try {
      const trackingBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const trackingParams = new URLSearchParams({
        campaignId: campaignId,
        publisherId: publisherId,
        campaignAdvertiserUrlId: campaignAdvertiserUrl.campaignUrlId,
        redirectUrl: advertiserUrl?.url || campaignAdvertiserUrl.landingPage, // Use AdvertiserUrl's URL if available, otherwise fall back to landingPage
      }).toString();

      const promoteData = {
        publisherId: parseInt(publisherId),
        campaignId: parseInt(campaignId),
        campaignAdvertiserUrlId: campaignAdvertiserUrl.campaignUrlId,
        baseTrackingUrl: `${trackingBaseUrl}?${trackingParams}`,
        isApproved: false,
        status: "Pending",
      };

      const result = await createPromote(promoteData);
      if (result) {
        setHasPromoted(true);
        message.success("Tham gia chiến dịch thành công! Đang chờ phê duyệt.");
      } else {
        throw new Error("Failed to create promote");
      }
    } catch (error) {
      console.error("Error creating promote:", error.message);
      message.error("Không thể tham gia chiến dịch: " + error.message);
    } finally {
      setPromoting(false);
    }
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
          {campaignAdvertiserUrl && (
            <Descriptions.Item label="Landing Page">
              {campaignAdvertiserUrl.landingPage}
            </Descriptions.Item>
          )}
          {advertiserUrl && (
            <Descriptions.Item label="Advertiser URL">
              {advertiserUrl.url || "N/A"}
            </Descriptions.Item>
          )}
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
          disabled={promoting || hasPromoted}
        >
          {hasPromoted ? "Xin chờ phê duyệt" : "Tham Gia Chiến Dịch"}
        </Button>
      </div>
    </div>
  );
}