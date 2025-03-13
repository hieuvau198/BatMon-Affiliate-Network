import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Progress } from "antd";

export default function PubMaDetail() {
  const { publisherId } = useParams();
  const [publisher, setPublisher] = useState(null);

  const publishers = [
    {
      id: "P001",
      name: "Affiliate Hub",
      clicks: 5000,
      conversions: 320,
      revenue: "15,000,000đ",
      status: "Active",
      joinDate: "2023-05-10",
      totalOrders: 1200,
      ctr: 6.4,
      industry: "E-commerce",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "P002",
      name: "Marketing Pro",
      clicks: 4200,
      conversions: 250,
      revenue: "12,500,000đ",
      status: "Pending",
      joinDate: "2023-06-15",
      totalOrders: 950,
      ctr: 5.9,
      industry: "Digital Marketing",
      paymentMethod: "PayPal",
    },
    {
      id: "P003",
      name: "Media Network",
      clicks: 3100,
      conversions: 150,
      revenue: "8,750,000đ",
      status: "Inactive",
      joinDate: "2023-03-22",
      totalOrders: 720,
      ctr: 4.8,
      industry: "Social Media",
      paymentMethod: "Crypto",
    },
  ];

  useEffect(() => {
    const foundPublisher = publishers.find((p) => p.id === publisherId);
    setPublisher(foundPublisher);
  }, [publisherId]);

  if (!publisher) {
    return <p className="text-center mt-6 text-red-600">Publisher không tồn tại!</p>;
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow rounded-lg bg-white p-6 max-w-[1500px] w-full">
        {/* Breadcrumb + Back Button */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4"
          >
            ⬅ Quay lại
          </button>
          <span className="text-gray-500">Publisher / Chi tiết / {publisher.name}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">{publisher.name}</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Thông tin cơ bản */}
          <Card className="bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Thông tin tổng quan</h3>
            <p><strong>Ngày tham gia:</strong> {publisher.joinDate}</p>
            <p><strong>Ngành hàng:</strong> {publisher.industry}</p>
            <p><strong>Phương thức thanh toán:</strong> {publisher.paymentMethod}</p>
            <p><strong>Status:</strong> 
              <span className={`px-2 py-1 ml-2 rounded ${
                publisher.status === "Active" ? "bg-green-200 text-green-800" :
                publisher.status === "Pending" ? "bg-yellow-200 text-yellow-800" :
                "bg-red-200 text-red-800"
              }`}>
                {publisher.status}
              </span>
            </p>
          </Card>

          {/* Hiệu suất Publisher */}
          <Card className="bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Hiệu suất</h3>
            <p><strong>Tổng Clicks:</strong> {publisher.clicks.toLocaleString()}</p>
            <p><strong>Tổng Chuyển Đổi:</strong> {publisher.conversions.toLocaleString()}</p>
            <p><strong>Doanh Thu:</strong> {publisher.revenue}</p>
            <p><strong>Tổng Đơn Hàng:</strong> {publisher.totalOrders.toLocaleString()}</p>
            <p><strong>Tỷ lệ CTR:</strong> {publisher.ctr}%</p>
            <Progress percent={publisher.ctr} status="active" />
          </Card>
        </div>

        {/* Chi tiết báo cáo */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card className="bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Biểu đồ tỷ lệ chuyển đổi</h3>
            <Progress type="circle" percent={(publisher.conversions / publisher.clicks) * 100} />
            <p className="mt-4 text-center">
              Tỷ lệ chuyển đổi: {((publisher.conversions / publisher.clicks) * 100).toFixed(2)}%
            </p>
          </Card>

          <Card className="bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Tăng trưởng doanh thu</h3>
            <Progress percent={(publisher.revenue.replace(/\D/g, '') / 20000000) * 100} />
            <p className="mt-4 text-center">
              Mục tiêu đạt: {((publisher.revenue.replace(/\D/g, '') / 20000000) * 100).toFixed(2)}%
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
