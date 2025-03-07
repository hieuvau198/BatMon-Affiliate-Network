"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const [selectedKey, setSelectedKey] = useState("campaigns");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const menuItems = [
    { key: "overview", icon: "📊", label: "Tổng quan" },
    { key: "campaigns", icon: "🎯", label: "Chiến dịch" },
    { key: "reports", icon: "⏰", label: "Báo cáo" },
    { key: "tools", icon: "🛠️", label: "Tool" },
    { key: "payments", icon: "💳", label: "Thanh toán" },
    { key: "violations", icon: "⚠️", label: "Vi Phạm" },
  ];

  const campaigns = [
    {
      key: "1",
      name: "Shopee Siêu Sale 12.12",
      merchant: "Shopee",
      category: "E-commerce",
      commission: "Lên đến 12%",
      status: "Đang chạy",
      type: "CPS",
      platform: ["web", "mobile"],
      startDate: "01/12/2023",
      endDate: "12/12/2023",
      description: "Chương trình khuyến mãi lớn nhất năm của Shopee",
      earnings: "5,680,000đ",
      orders: 245,
    },
    {
      key: "2",
      name: "Lazada Khuyến Mãi Tết",
      merchant: "Lazada",
      category: "E-commerce",
      commission: "15% mọi đơn hàng",
      status: "Sắp diễn ra",
      type: "CPA",
      platform: ["web"],
      startDate: "15/12/2023",
      endDate: "31/12/2023",
      description: "Chương trình khuyến mãi Tết Nguyên Đán",
      earnings: "0đ",
      orders: 0,
    },
    {
      key: "3",
      name: "Tiki Săn Sale",
      merchant: "Tiki",
      category: "E-commerce",
      commission: "10% + 50k/đơn",
      status: "Đang chạy",
      type: "Hybrid",
      platform: ["web", "mobile"],
      startDate: "01/12/2023",
      endDate: "31/12/2023",
      description: "Chương trình khuyến mãi cuối năm",
      earnings: "2,890,000đ",
      orders: 156,
    },
    {
      key: "4",
      name: "Grab Food Delivery",
      merchant: "Grab",
      category: "Food & Beverage",
      commission: "25k/đơn thành công",
      status: "Tạm dừng",
      type: "CPA",
      platform: ["mobile"],
      startDate: "01/11/2023",
      endDate: "31/12/2023",
      description: "Chương trình đối tác giao đồ ăn",
      earnings: "1,250,000đ",
      orders: 50,
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          campaign.merchant.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === "all" || campaign.status.toLowerCase() === filterStatus;
    const matchesCategory = filterCategory === "all" || campaign.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 md:mb-0">Danh sách chiến dịch</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch..."
                className="w-full md:w-64 p-2 border rounded-lg"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                className="w-full md:w-40 p-2 border rounded-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="đang chạy">Đang chạy</option>
                <option value="sắp diễn ra">Sắp diễn ra</option>
                <option value="tạm dừng">Tạm dừng</option>
              </select>
              <select
                className="w-full md:w-40 p-2 border rounded-lg"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                <option value="e-commerce">E-commerce</option>
                <option value="food & beverage">Food & Beverage</option>
                <option value="travel">Travel</option>
              </select>
              <button className="px-4 py-2 bg-gray-200 rounded-lg flex items-center">
                <span className="mr-2">🔍</span> Lọc
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Tên chiến dịch</th>
                  <th className="p-2">Merchant</th>
                  <th className="p-2">Hoa hồng</th>
                  <th className="p-2">Thời gian</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Thống kê</th>
                  <th className="p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.key} className="border-b">
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="font-semibold">{campaign.name}</span>
                        <div className="flex space-x-2 mt-1">
                          {campaign.platform.includes("web") && (
                            <span title="Web" className="text-gray-600">🌐</span>
                          )}
                          {campaign.platform.includes("mobile") && (
                            <span title="Mobile" className="text-gray-600">📱</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="mr-2">🛒</span> {campaign.merchant}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="text-blue-600 font-semibold">{campaign.commission}</span>
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded mt-1">{campaign.type}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span>Bắt đầu: {campaign.startDate}</span>
                        <span>Kết thúc: {campaign.endDate}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          campaign.status === "Đang chạy"
                            ? "bg-green-200 text-green-800"
                            : campaign.status === "Sắp diễn ra"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span>💰 Doanh thu: {campaign.earnings}</span>
                        <span>🛒 Đơn hàng: {campaign.orders}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Link to={`/publisher/campaignlist/campaigndetail`}>
                        <button className="px-2 py-1 bg-blue-600 text-white rounded flex items-center">
                          <span className="mr-2">👁️</span> Chi tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}