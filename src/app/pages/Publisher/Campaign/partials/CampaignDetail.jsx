"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Spin, message, Button, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import mockData from "../../../Publisher/Campaign/partials/mockdata.json";

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
        const campaignData = mockData.find((item) => String(item.campaignId) === String(campaignId));
        if (!campaignData) {
          throw new Error("Campaign not found");
        }
        setCampaign(campaignData);
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
    return <p className="text-center text-red-500 text-lg">Không tìm thấy chiến dịch!</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <Card title={<span className="text-xl font-semibold">{campaign.name}</span>} bordered className="max-w-4xl w-full shadow-lg rounded-lg">
        <Descriptions bordered column={1} className="text-gray-700">
          <Descriptions.Item label="Mô tả" className="font-semibold">{campaign.description || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Ngân sách" className="font-semibold">{campaign.budget?.toLocaleString()} {campaign.currencyCode}</Descriptions.Item>
          <Descriptions.Item label="Giới hạn hàng ngày">{campaign.dailyCap?.toLocaleString()} {campaign.currencyCode}</Descriptions.Item>
          <Descriptions.Item label="Giới hạn hàng tháng">{campaign.monthlyCap?.toLocaleString()} {campaign.currencyCode}</Descriptions.Item>
          <Descriptions.Item label="Bắt đầu">{campaign.startDate}</Descriptions.Item>
          <Descriptions.Item label="Kết thúc">{campaign.endDate}</Descriptions.Item>
          <Descriptions.Item label="Quốc gia mục tiêu">{campaign.targetingCountries}</Descriptions.Item>
          <Descriptions.Item label="Thiết bị mục tiêu">{campaign.targetingDevices}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={campaign.status === "Đang hoạt động" ? "green" : "orange"}>{campaign.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Riêng tư">{campaign.isPrivate ? "Có" : "Không"}</Descriptions.Item>
          <Descriptions.Item label="Tỷ lệ chuyển đổi">{campaign.conversionRate}%</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{campaign.createdDate}</Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">{campaign.lastUpdated}</Descriptions.Item>
          <Descriptions.Item label="Tên nhà quảng cáo">{campaign.advertiserName || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Tên tiền tệ">{campaign.currencyName || "N/A"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Button className="mt-6 flex items-center gap-2" type="primary" onClick={() => navigate(-1)}>
        <LeftOutlined /> Quay lại
      </Button>
    </div>
  );
}