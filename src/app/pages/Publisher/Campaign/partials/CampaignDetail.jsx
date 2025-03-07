"use client";

import { useState } from "react";

export default function CampaignDetail() {
  const [selectedKey, setSelectedKey] = useState("campaigns");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({ agreement: false, promotion: false });

  const menuItems = [
    { key: "overview", icon: "📊", label: "Tổng quan" },
    { key: "campaigns", icon: "🎯", label: "Chiến dịch" },
    { key: "reports", icon: "⏰", label: "Báo cáo" },
    { key: "tools", icon: "🛠️", label: "Tool" },
    { key: "payments", icon: "💳", label: "Thanh toán" },
    { key: "violations", icon: "⚠️", label: "Vi Phạm" },
  ];

  const campaign = {
    id: "SHOP12122023",
    name: "Shopee Siêu Sale 12.12",
    merchant: "Shopee",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png",
    banner: "https://tse2.mm.bing.net/th?id=OIP.igJLABRafUEUJWTjs0sc6gHaEK&pid=Api&P=0&h=180",
    category: "E-commerce",
    commission: {
      type: "CPS",
      rate: "Lên đến 12%",
      details: [
        { category: "Thời trang", rate: "12%" },
        { category: "Điện tử", rate: "8%" },
        { category: "Gia dụng", rate: "10%" },
        { category: "Mỹ phẩm", rate: "15%" },
      ],
    },
    status: "Đang chạy",
    platform: ["web", "mobile"],
    startDate: "01/12/2023",
    endDate: "12/12/2023",
    description: "Chương trình khuyến mãi lớn nhất năm của Shopee với hàng ngàn sản phẩm giảm giá sốc và miễn phí vận chuyển toàn quốc.",
    longDescription: `
      Shopee 12.12 Birthday Sale là sự kiện mua sắm lớn nhất năm của Shopee, diễn ra từ ngày 01/12/2023 đến ngày 12/12/2023. 
      
      Trong thời gian diễn ra chương trình, khách hàng có thể tận hưởng nhiều ưu đãi hấp dẫn như:
      - Giảm giá lên đến 50% cho tất cả các sản phẩm
      - Miễn phí vận chuyển toàn quốc với đơn hàng từ 0đ
      - Flash Sale hàng ngày với giá sốc
      - Mã giảm giá độc quyền lên đến 100K
      - Hoàn xu 15% cho mọi đơn hàng
      
      Đây là cơ hội tuyệt vời để các Publisher tăng doanh thu cuối năm với mức hoa hồng hấp dẫn lên đến 12% tùy theo danh mục sản phẩm.
    `,
    rules: [
      "Không được sử dụng từ khóa thương hiệu để chạy quảng cáo Google, Facebook",
      "Không được sử dụng hình ảnh gây hiểu nhầm về chương trình khuyến mãi",
      "Không được tự ý tạo mã giảm giá hoặc khuyến mãi giả mạo",
      "Thời gian cookie: 30 ngày",
      "Thời gian duyệt đơn: 45-60 ngày sau khi đơn hàng hoàn thành",
    ],
    stats: {
      publishers: 1245,
      orders: 45678,
      revenue: "12,345,678,000đ",
      conversion: "3.5%",
    },
    materials: [
      { type: "Banner", size: "728x90", url: "https://example.com/banner1.jpg" },
      { type: "Banner", size: "300x250", url: "https://example.com/banner2.jpg" },
      { type: "Banner", size: "160x600", url: "https://example.com/banner3.jpg" },
      { type: "Social Media", size: "1200x628", url: "https://example.com/social1.jpg" },
    ],
    relatedCampaigns: [
      { id: "2", name: "Lazada Khuyến Mãi Tết", merchant: "Lazada", commission: "15% mọi đơn hàng" },
      { id: "3", name: "Tiki Săn Sale", merchant: "Tiki", commission: "10% + 50k/đơn" },
    ],
  };

  const handleRegister = () => setIsModalVisible(true);

  const handleModalOk = (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("Vui lòng đồng ý với điều khoản chiến dịch");
      return;
    }
    console.log("Form values:", formData);
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg mr-4"
          >
            <span className="mr-2">⬅️</span> Quay lại danh sách
          </button>
          <span className="text-gray-500">Chiến dịch / Chi tiết / {campaign.name}</span>
        </div>

        {/* Campaign Banner */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="relative">
            <img
              src={campaign.banner}
              alt={campaign.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={campaign.logo}
                    alt={campaign.merchant}
                    className="w-20 h-20 bg-white p-2 rounded-full shadow"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{campaign.name}</h2>
                    <div className="flex space-x-2 mt-2">
                      <span className="px-2 py-1 bg-blue-600 rounded">{campaign.merchant}</span>
                      <span className="px-2 py-1 bg-green-600 rounded">{campaign.status}</span>
                      <span className="px-2 py-1 bg-orange-600 rounded">{campaign.commission.type}</span>
                      {campaign.platform.includes("web") && (
                        <span className="px-2 py-1 bg-gray-600 rounded">Web</span>
                      )}
                      {campaign.platform.includes("mobile") && (
                        <span className="px-2 py-1 bg-gray-600 rounded">Mobile</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleRegister}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg"
                >
                  Đăng ký tham gia
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button className="px-4 py-2 font-semibold text-blue-600 border-b-2 border-blue-600">
                  ℹ️ Tổng quan
                </button>
                <button className="px-4 py-2 font-semibold text-gray-700">📄 Tài liệu quảng cáo</button>
                <button className="px-4 py-2 font-semibold text-gray-700">❓ Câu hỏi thường gặp</button>
              </div>

              {/* Overview Tab */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Mô tả chiến dịch</h3>
                <p>{campaign.description}</p>
                <p className="mt-2 whitespace-pre-line">{campaign.longDescription}</p>

                <hr className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Thông tin hoa hồng</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p><strong>Loại hoa hồng:</strong> <span className="px-2 py-1 bg-blue-200 rounded">{campaign.commission.type}</span></p>
                  </div>
                  <div>
                    <p><strong>Mức hoa hồng:</strong> <span className="text-blue-600 font-semibold">{campaign.commission.rate}</span></p>
                  </div>
                </div>
                <h4 className="text-md font-semibold mt-4">Chi tiết theo danh mục</h4>
                <ul className="border rounded-lg mt-2">
                  {campaign.commission.details.map((item, index) => (
                    <li key={index} className="flex justify-between p-2 border-b last:border-b-0">
                      <span>{item.category}</span>
                      <span className="text-blue-600 font-semibold">{item.rate}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Quy định chiến dịch</h3>
                <ul className="list-decimal pl-5">
                  {campaign.rules.map((rule, index) => (
                    <li key={index} className="mb-2">{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Campaign Stats */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Thống kê chiến dịch</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Publisher tham gia</p>
                  <p className="text-xl font-semibold">{campaign.stats.publishers}</p>
                </div>
                <div>
                  <p className="text-gray-600">Đơn hàng</p>
                  <p className="text-xl font-semibold">{campaign.stats.orders}</p>
                </div>
                <div>
                  <p className="text-gray-600">Doanh thu</p>
                  <p className="text-xl font-semibold">{campaign.stats.revenue}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tỷ lệ chuyển đổi</p>
                  <p className="text-xl font-semibold">{campaign.stats.conversion}</p>
                </div>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin chiến dịch</h3>
              <div className="space-y-2">
                <p><strong>Mã chiến dịch:</strong> {campaign.id}</p>
                <p><strong>Thời gian bắt đầu:</strong> 📅 {campaign.startDate}</p>
                <p><strong>Thời gian kết thúc:</strong> 📅 {campaign.endDate}</p>
                <p><strong>Trạng thái:</strong> <span className="px-2 py-1 bg-green-200 text-green-800 rounded">{campaign.status}</span></p>
                <p><strong>Danh mục:</strong> {campaign.category}</p>
              </div>
              <hr className="my-4" />
              <p className="font-semibold">Tiến độ chiến dịch</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">Còn 3 ngày nữa kết thúc</p>
            </div>

            {/* Related Campaigns */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Chiến dịch liên quan</h3>
              <ul className="space-y-4">
                {campaign.relatedCampaigns.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">{item.merchant}</p>
                      <p className="text-green-600">{item.commission}</p>
                    </div>
                    <button className="text-blue-600">Xem ➡️</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h3 className="text-lg font-semibold mb-4">Đăng ký tham gia chiến dịch</h3>
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <p className="font-semibold">Thông tin quan trọng</p>
              <p>
                Bằng việc đăng ký tham gia chiến dịch này, bạn đồng ý tuân thủ tất cả các quy định của chiến dịch và điều khoản sử dụng của AffiHub.
              </p>
            </div>
            <form onSubmit={handleModalOk} className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                  className="h-4 w-4"
                />
                <span>
                  Tôi đã đọc và đồng ý với <a href="#" className="text-blue-600">quy định chiến dịch</a> và{" "}
                  <a href="#" className="text-blue-600">điều khoản sử dụng</a>
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.promotion}
                  onChange={(e) => setFormData({ ...formData, promotion: e.target.checked })}
                  className="h-4 w-4"
                />
                <span>Tôi muốn nhận thông báo về các chiến dịch tương tự trong tương lai</span>
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalVisible(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}