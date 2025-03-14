"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCampaignList from "../../../modules/Publisher/getCampaignList"; // Import hàm API

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaignList(); // Gọi API qua hàm getCampaignList
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === "all" || campaign.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
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
                <option value="active">Đang chạy</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Tên chiến dịch</th>
                  <th className="p-2">Mô tả</th>
                  <th className="p-2">Ngân sách</th>
                  <th className="p-2">Thời gian</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.campaignId} className="border-b">
                    <td className="p-2 font-semibold">{campaign.name}</td>
                    <td className="p-2">{campaign.description}</td>
                    <td className="p-2">{campaign.budget.toLocaleString()} VND</td>
                    <td className="p-2">
                      <div>Bắt đầu: {campaign.startDate}</div>
                      <div>Kết thúc: {campaign.endDate}</div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          campaign.status === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <Link to={`/publisher/campaignlist/campaigndetail/${campaign.campaignId}`}>
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
