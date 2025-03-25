import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, message, Table } from "antd";
import getCampaignDetail from "../../../../modules/Campaign/getCampaignDetail";

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

  if (loading) return <p className="text-center mt-6">Đang tải...</p>;
  if (!campaign) return <p className="text-center mt-6 text-red-600">Chiến dịch không tồn tại!</p>;

  return (
    <div>
      <div className="shadow-sm rounded-xl bg-white p-6 max-w-[1200px] w-full">
        {/* Điều hướng */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate(-1)} className="mr-4">
            ⬅ Quay lại
          </Button>
        </div>

        {/* Thông tin tổng quan */}
        <h2 className="text-2xl font-semibold mb-4">{campaign.name}</h2>
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <p><strong>Mô tả:</strong> {campaign.description}</p>
          <p>
            <strong>Ngân sách:</strong>{" "}
            {campaign.budget.toLocaleString()} {campaign.currencyCode || "VND"}
          </p>
          <p>
            <strong>Hạn mức ngày:</strong>{" "}
            {campaign.dailyCap.toLocaleString()} {campaign.currencyCode || "VND"}
          </p>
          <p>
            <strong>Hạn mức tháng:</strong>{" "}
            {campaign.monthlyCap.toLocaleString()} {campaign.currencyCode || "VND"}
          </p>
          <p>
            <strong>Thời gian:</strong> {campaign.startDate} - {campaign.endDate}
          </p>
          <p><strong>Trạng thái:</strong> {campaign.status}</p>
          <p><strong>Quốc gia mục tiêu:</strong> {campaign.targetingCountries}</p>
          <p><strong>Thiết bị mục tiêu:</strong> {campaign.targetingDevices}</p>
        </Card>

        {/* Hiệu suất thực tế */}
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold">📊 Hiệu suất chiến dịch</h3>
          <Table
            columns={[
              { title: "Chỉ số", dataIndex: "metric", key: "metric" },
              { title: "Giá trị", dataIndex: "value", key: "value" },
            ]}
            dataSource={[
              { metric: "Tổng Clicks", value: "12,500" },
              { metric: "Tổng Chuyển Đổi", value: "1,250" },
              { metric: "Tỷ Lệ Chuyển Đổi", value: `${campaign.conversionRate}%` },
              { metric: "Doanh Thu", value: "50,000,000 VND" },
            ]}
            pagination={false}
            bordered={true}
            className="campaign-table"
          />
        </Card>

        {/* Danh sách Publisher */}
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold">👥 Publisher đang chạy chiến dịch</h3>
          <Table
            columns={[
              { title: "Publisher", dataIndex: "name", key: "name" },
              { title: "Clicks", dataIndex: "clicks", key: "clicks" },
              { title: "Conversions", dataIndex: "conversions", key: "conversions" },
              { title: "Doanh thu", dataIndex: "revenue", key: "revenue" },
            ]}
            dataSource={[
              { name: "Affiliate_001", clicks: "5000", conversions: "600", revenue: "10,000,000 VND" },
              { name: "Publisher_VN", clicks: "4000", conversions: "450", revenue: "8,500,000 VND" },
              { name: "MarketingHub", clicks: "2500", conversions: "200", revenue: "5,000,000 VND" },
            ]}
            pagination={false}
            bordered={true}
            className="campaign-table"
          />
        </Card>

        {/* Chính sách & Hạn chế */}
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold">📜 Chính sách & Hạn chế</h3>
          <ul className="list-disc pl-6">
            <li>Không được sử dụng từ khóa thương hiệu trên quảng cáo.</li>
            <li>Không chạy quảng cáo trên các trang web có nội dung vi phạm.</li>
            <li>Cookie tracking có thời hạn 30 ngày.</li>
          </ul>
        </Card>

        {/* Lịch sử thay đổi */}
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold">🕒 Lịch sử thay đổi</h3>
          <Table
            columns={[
              { title: "Thời gian", dataIndex: "date", key: "date" },
              { title: "Thay đổi", dataIndex: "change", key: "change" },
            ]}
            dataSource={[
              { date: campaign.createdDate, change: "Chiến dịch được tạo" },
              { date: campaign.lastUpdated, change: "Cập nhật thông tin chiến dịch" },
            ]}
            pagination={false}
            bordered={true}
            className="campaign-table"
          />
        </Card>

        {/* Thanh toán */}
        <Card className="bg-white mb-6 shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold">💰 Thanh toán & Billing</h3>
          <Table
            columns={[
              { title: "Thời gian", dataIndex: "date", key: "date" },
              { title: "Số tiền", dataIndex: "amount", key: "amount" },
              { title: "Trạng thái", dataIndex: "status", key: "status" },
            ]}
            dataSource={[
              { date: "2025-03-10", amount: "25,000,000 VND", status: "Đã thanh toán" },
              { date: "2025-02-10", amount: "20,000,000 VND", status: "Đã thanh toán" },
            ]}
            pagination={false}
            bordered={true}
            className="campaign-table"
          />
        </Card>

        {/* Nút điều hướng */}
        <div className="flex justify-between mt-6">
          <Button
            type="primary"
            onClick={() => navigate(`/advertiser/campaignList/campaigndetail/${campaignId}/CampaignPolicy`)}
          >
            📜 Chính sách chiến dịch
          </Button>
          <Button
            type="default"
            onClick={() => navigate(`/advertiser/campaignList/campaigndetail/${campaignId}/CampaignPerformance`)}
          >
            📊 Xem hiệu suất
          </Button>
        </div>
      </div>
    </div>
  );
}