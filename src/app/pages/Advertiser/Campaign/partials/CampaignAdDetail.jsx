import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "antd";

export default function CampaignDetail() {
  const { campaignId } = useParams(); // Lấy ID từ URL
  const [campaign, setCampaign] = useState(null);

  // Danh sách campaign giả lập (sẽ được lấy từ API trong thực tế)
  const campaigns = [
    {
      id: "1",
      name: "Shopee Super Sale 12.12",
      merchant: "Shopee",
      category: "E-commerce",
      status: "Đang chạy",
      budget: "50,000,000đ",
      impressions: 120000,
      clicks: 8500,
      conversions: 450,
      revenue: "12,500,000đ",
      startDate: "01/12/2023",
      endDate: "12/12/2023",
      commission: {
        type: "CPS",
        rate: "12%",
        details: [
          { category: "Thời trang", rate: "12%" },
          { category: "Điện tử", rate: "8%" },
          { category: "Gia dụng", rate: "10%" },
        ],
      },
      materials: [
        { type: "Banner", size: "728x90", url: "https://example.com/banner1.jpg" },
        { type: "Social Media", size: "1200x628", url: "https://example.com/social1.jpg" },
      ],
      rules: [
        "Không sử dụng từ khóa thương hiệu chạy quảng cáo.",
        "Không tạo mã giảm giá giả mạo.",
        "Cookie tracking: 30 ngày.",
      ],
    },
    {
      id: "2",
      name: "Lazada Tết Sale",
      merchant: "Lazada",
      category: "E-commerce",
      status: "Sắp diễn ra",
      budget: "30,000,000đ",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: "0đ",
      startDate: "15/12/2023",
      endDate: "31/12/2023",
      commission: {
        type: "CPA",
        rate: "10%",
        details: [
          { category: "Điện tử", rate: "10%" },
          { category: "Nhà cửa", rate: "15%" },
        ],
      },
      materials: [
        { type: "Banner", size: "300x250", url: "https://example.com/banner2.jpg" },
      ],
      rules: [
        "Không chạy quảng cáo trên từ khóa thương hiệu.",
        "Hoa hồng được tính sau khi đơn hàng hoàn tất.",
      ],
    },
  ];

  useEffect(() => {
    // Tìm campaign theo ID
    const foundCampaign = campaigns.find((c) => c.id === campaignId);
    setCampaign(foundCampaign);
  }, [campaignId]);

  if (!campaign) {
    return <p className="text-center mt-6 text-red-600">Chiến dịch không tồn tại!</p>;
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow rounded-lg bg-white p-6 max-w-[1500px] w-full">
        <div className="flex items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4"
          >
            ⬅ Quay lại
          </button>
          <span className="text-gray-500">Chiến dịch / Chi tiết / {campaign.name}</span>
        </div>

        <h2 className="text-2xl font-semibold mb-4">{campaign.name}</h2>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-gray-50">
            <p><strong>Danh mục:</strong> {campaign.category}</p>
            <p><strong>Ngân sách:</strong> {campaign.budget}</p>
            <p><strong>Thời gian:</strong> {campaign.startDate} - {campaign.endDate}</p>
          </Card>

          <Card className="bg-gray-50">
            <p><strong>Lượt hiển thị:</strong> {campaign.impressions.toLocaleString()}</p>
            <p><strong>Số lần nhấp:</strong> {campaign.clicks.toLocaleString()}</p>
            <p><strong>Chuyển đổi:</strong> {campaign.conversions.toLocaleString()}</p>
            <p><strong>Doanh thu:</strong> {campaign.revenue}</p>
          </Card>
        </div>

        <Card className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Chi tiết hoa hồng</h3>
          <p><strong>Loại hoa hồng:</strong> {campaign.commission.type}</p>
          <p><strong>Mức hoa hồng:</strong> {campaign.commission.rate}</p>
          <h4 className="text-md font-semibold mt-3">Chi tiết theo danh mục:</h4>
          <ul className="border rounded-lg mt-2">
            {campaign.commission.details.map((item, index) => (
              <li key={index} className="flex justify-between p-2 border-b last:border-b-0">
                <span>{item.category}</span>
                <span className="text-blue-600 font-semibold">{item.rate}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tài liệu quảng cáo</h3>
          <div className="grid grid-cols-1 gap-4">
            {campaign.materials.map((material, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p><strong>{material.type} ({material.size})</strong></p>
                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  Xem tài liệu
                </a>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}
