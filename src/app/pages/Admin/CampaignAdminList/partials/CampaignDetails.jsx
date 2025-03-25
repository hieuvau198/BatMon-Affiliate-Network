import { Avatar, Card, Descriptions, Divider, Typography } from "antd";
import { FileTextOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons";
import VndFormat from "../../../../components/VndFormat";

const { Title, Paragraph } = Typography;

const CampaignDetails = ({ campaignDetail, getStatusTag }) => {
  if (!campaignDetail) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar size={64} icon={<FileTextOutlined />} className="bg-blue-500" />
        <div>
          <Title level={4} className="m-0">
            {campaignDetail.name}
          </Title>
          {getStatusTag(campaignDetail.status)}
        </div>
      </div>

      <Divider />

      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Advertiser">
          <div className="flex items-center">
            <UserOutlined className="mr-2" /> {campaignDetail.advertiserName}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          <div className="flex items-center">
            <CalendarOutlined className="mr-2" />
            {new Date(campaignDetail.createdDate).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Ngân sách">
          {campaignDetail.budget} {campaignDetail.currencyCode}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian thực hiện">
          {new Date(campaignDetail.startDate).toLocaleDateString("vi-VN")} -{" "}
          {new Date(campaignDetail.endDate).toLocaleDateString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Quốc gia mục tiêu">
          {campaignDetail.targetingCountries}
        </Descriptions.Item>
        <Descriptions.Item label="Thiết bị mục tiêu">
          {campaignDetail.targetingDevices}
        </Descriptions.Item>
        <Descriptions.Item label="Giới hạn ngày">
          <VndFormat amount={campaignDetail.dailyCap} />
        </Descriptions.Item>
        <Descriptions.Item label="Giới hạn tháng">
          <VndFormat amount={campaignDetail.monthlyCap} />
        </Descriptions.Item>
        <Descriptions.Item label="Tỷ lệ chuyển đổi">
          {campaignDetail.conversionRate}%
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật lần cuối">
          {new Date(campaignDetail.lastUpdated).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Chiến dịch riêng tư">
          {campaignDetail.isPrivate ? "Có" : "Không"}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Thông tin chi tiết</Divider>

      <Card title="Mô tả" size="small" className="bg-gray-50">
        <Paragraph>{campaignDetail.description}</Paragraph>
      </Card>
    </div>
  );
};

export default CampaignDetails;
