"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Spin, message, Button } from "antd";
import getCampaignDetail from "../../../../modules/Publisher/getCampaignDetail";

export default function CampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (!campaignId) {
          throw new Error("Missing campaignId");
        }

        const data = await getCampaignDetail(campaignId);
        console.log("Fetched campaign data:", data);

        if (!data || !data.campaignId) {
          throw new Error("Invalid campaign data");
        }

        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error.message);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Đang tải chi tiết chiến dịch..." />
      </div>
    );
  }

  if (!campaign) {
    return <p>Không tìm thấy chiến dịch!</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <Card title={campaign.name} bordered className="max-w-4xl w-full shadow-lg">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Mô tả">{campaign.description || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Ngân sách">
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
          <Descriptions.Item label="Quốc gia mục tiêu">{campaign.targetingCountries}</Descriptions.Item>
          <Descriptions.Item label="Thiết bị mục tiêu">{campaign.targetingDevices}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{campaign.status}</Descriptions.Item>
          <Descriptions.Item label="Riêng tư">{campaign.isPrivate ? "Có" : "Không"}</Descriptions.Item>
          <Descriptions.Item label="Tỷ lệ chuyển đổi">{campaign.conversionRate}%</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{campaign.createdDate}</Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">{campaign.lastUpdated}</Descriptions.Item>
          <Descriptions.Item label="Tên nhà quảng cáo">{campaign.advertiserName || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Tên tiền tệ">{campaign.currencyName || "N/A"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Button className="mt-6" type="primary" onClick={() => navigate(-1)}>
        ← Quay lại
      </Button>
    </div>
  );
}
