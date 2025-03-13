import { useParams } from "react-router-dom";
import { useState } from "react";

export default function CampaignDetail() {
  const { campaignId } = useParams(); // Lấy ID chiến dịch từ URL
  const [campaign, setCampaign] = useState({
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
  });

  return (
    <div className="shadow rounded-lg bg-white p-4">
        {/* Breadcrumb */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4"
          >
            ⬅ Quay lại
          </button>
          <span className="text-gray-500">Chiến dịch / Chi tiết / {campaign.name}</span>
        </div>

        {/* Campaign Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{campaign.name}</h2>
          <span
            className={`px-4 py-2 rounded ${
              campaign.status === "Đang chạy"
                ? "bg-green-200 text-green-800"
                : campaign.status === "Sắp diễn ra"
                ? "bg-blue-200 text-blue-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {campaign.status}
          </span>
        </div>

        {/* Thông tin tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p><strong>Danh mục:</strong> {campaign.category}</p>
            <p><strong>Ngân sách:</strong> {campaign.budget}</p>
            <p><strong>Thời gian:</strong> {campaign.startDate} - {campaign.endDate}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p><strong>Lượt hiển thị:</strong> {campaign.impressions.toLocaleString()}</p>
            <p><strong>Số lần nhấp:</strong> {campaign.clicks.toLocaleString()}</p>
            <p><strong>Chuyển đổi:</strong> {campaign.conversions.toLocaleString()}</p>
            <p><strong>Doanh thu:</strong> {campaign.revenue}</p>
          </div>
        </div>

        {/* Hoa hồng & Điều kiện */}
        <div className="mb-6">
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
        </div>

        {/* Tài liệu quảng cáo */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tài liệu quảng cáo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaign.materials.map((material, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <p><strong>{material.type} ({material.size})</strong></p>
                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  Xem tài liệu
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quy định chiến dịch */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quy định chiến dịch</h3>
          <ul className="list-disc pl-6">
            {campaign.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}
