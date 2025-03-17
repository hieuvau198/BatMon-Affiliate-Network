import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, Table, message } from "antd";
import mockPerformance from "./mock_performance.json";

export default function CampaignPerformance() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerformance() {
      try {
        // Tìm dữ liệu theo campaignId từ mock JSON
        const data = mockPerformance.find(p => p.campaignId.toString() === campaignId);
        if (!data) throw new Error("Không tìm thấy dữ liệu hiệu suất!");
        setPerformance(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPerformance();
  }, [campaignId]);

  if (loading) return <p className="text-center mt-6">Đang tải...</p>;
  if (!performance) return <p className="text-center mt-6 text-red-600">Không có dữ liệu hiệu suất!</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow rounded-lg bg-white p-6 max-w-[1500px] w-full">
        
        {/* Điều hướng */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate(-1)} className="mr-4">
            ⬅ Quay lại
          </Button>
          <span className="text-gray-500">Chiến dịch / Hiệu suất</span>
        </div>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold mb-4">📊 Hiệu suất Chiến Dịch</h2>

        {/* Tổng quan hiệu suất */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">📈 Tổng quan</h3>
          <p><strong>Lượt Click:</strong> {performance.totalClicks.toLocaleString()}</p>
          <p><strong>Số Chuyển Đổi:</strong> {performance.totalConversions.toLocaleString()}</p>
          <p><strong>Tỷ Lệ Chuyển Đổi:</strong> {performance.conversionRate}%</p>
        </Card>

        {/* Doanh thu & công thức tính */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">💰 Doanh thu</h3>
          <p><strong>Doanh thu thực tế:</strong> {performance.totalRevenue.toLocaleString()} VND</p>
          <p><strong>Mức hoa hồng:</strong> {performance.commissionRate}%</p>
          <p><strong>Giá trị đơn hàng trung bình:</strong> {performance.averageOrderValue.toLocaleString()} VND</p>
          <p><strong>Doanh thu ước tính:</strong> {performance.estimatedRevenue.toLocaleString()} VND</p>
          <p className="text-gray-600 mt-2">📌 Công thức: <br/>
            <i>Estimated Revenue = Total Conversions × Average Order Value × (Commission Rate / 100)</i>
          </p>
        </Card>

        {/* Clicks theo ngày */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">📅 Clicks theo ngày</h3>
          <Table
            columns={[
              { title: "Ngày", dataIndex: "date", key: "date" },
              { title: "Lượt Click", dataIndex: "clicks", key: "clicks" },
              { title: "Chuyển Đổi", dataIndex: "conversions", key: "conversions" }
            ]}
            dataSource={performance.clicksByDay}
            pagination={false}
          />
        </Card>

        {/* Traffic nguồn */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">🔝 Nguồn Traffic</h3>
          <Table
            columns={[
              { title: "Nguồn", dataIndex: "source", key: "source" },
              { title: "Lượt Click", dataIndex: "clicks", key: "clicks" },
              { title: "Chuyển Đổi", dataIndex: "conversions", key: "conversions" }
            ]}
            dataSource={performance.topTrafficSources}
            pagination={false}
          />
        </Card>

        {/* Hiệu suất theo Quốc gia */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">🌍 Hiệu suất theo quốc gia</h3>
          <Table
            columns={[
              { title: "Quốc gia", dataIndex: "country", key: "country" },
              { title: "Lượt Click", dataIndex: "clicks", key: "clicks" },
              { title: "Chuyển Đổi", dataIndex: "conversions", key: "conversions" }
            ]}
            dataSource={performance.geoPerformance}
            pagination={false}
          />
        </Card>

        {/* Hiệu suất theo thiết bị */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">📱 Hiệu suất theo thiết bị</h3>
          <Table
            columns={[
              { title: "Thiết bị", dataIndex: "device", key: "device" },
              { title: "Lượt Click", dataIndex: "clicks", key: "clicks" },
              { title: "Chuyển Đổi", dataIndex: "conversions", key: "conversions" }
            ]}
            dataSource={performance.devicePerformance}
            pagination={false}
          />
        </Card>

        {/* Quảng cáo hiệu suất cao nhất */}
        <Card className="bg-gray-50 mt-6">
          <h3 className="text-lg font-semibold mb-3">🏆 Quảng cáo hiệu suất cao nhất</h3>
          <Table
            columns={[
              { title: "Tên quảng cáo", dataIndex: "adName", key: "adName" },
              { title: "Lượt Click", dataIndex: "clicks", key: "clicks" },
              { title: "Chuyển Đổi", dataIndex: "conversions", key: "conversions" },
              { title: "Tỷ lệ chuyển đổi (%)", dataIndex: "conversionRate", key: "conversionRate" }
            ]}
            dataSource={performance.bestPerformingAds}
            pagination={false}
          />
        </Card>

      </Card>
    </div>
  );
}
