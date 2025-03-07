"use client";

import { useState } from "react";

export default function ReportLostOrder() {
  const [selectedKey, setSelectedKey] = useState("reports");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const menuItems = [
    { key: "overview", icon: "📊", label: "Tổng quan" },
    { key: "campaigns", icon: "🎯", label: "Chiến dịch" },
    { key: "reports", icon: "⏰", label: "Báo cáo" },
    { key: "tools", icon: "🛠️", label: "Tool" },
    { key: "payments", icon: "💳", label: "Thanh toán" },
    { key: "violations", icon: "⚠️", label: "Vi Phạm" },
  ];

  const reportData = [
    {
      key: "1",
      id: "LO-2023-001",
      campaign: "Shopee Siêu Sale 12.12",
      orderDate: "10/12/2023",
      reportDate: "15/12/2023",
      amount: "1,250,000đ",
      status: "Đang xử lý",
    },
    {
      key: "2",
      id: "LO-2023-002",
      campaign: "Lazada Khuyến Mãi Tết",
      orderDate: "05/12/2023",
      reportDate: "08/12/2023",
      amount: "850,000đ",
      status: "Đã duyệt",
    },
    {
      key: "3",
      id: "LO-2023-003",
      campaign: "Tiki Săn Sale",
      orderDate: "01/12/2023",
      reportDate: "05/12/2023",
      amount: "450,000đ",
      status: "Từ chối",
    },
  ];

  const onFinish = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const values = Object.fromEntries(form.entries());
    console.log("Form values:", values);
    setFormData(values);
    setCurrentStep(1);
    setTimeout(() => {
      setCurrentStep(2);
      e.target.reset();
    }, 2000);
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
            <span className="mr-2">⬅️</span> Quay lại báo cáo
          </button>
          <span className="text-gray-500">Báo cáo / Báo cáo đơn hàng bị mất</span>
        </div>

        {/* Report Lost Order Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2 text-yellow-500">⚠️</span> Báo Cáo Đơn Hàng Bị Mất
          </h2>

          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <p className="font-semibold">Thông tin quan trọng</p>
            <p>
              Vui lòng cung cấp đầy đủ thông tin về đơn hàng bị mất để chúng tôi có thể xác minh và xử lý nhanh chóng.
            </p>
            <p>Thời gian xử lý báo cáo: 3-5 ngày làm việc.</p>
          </div>

          {/* Steps */}
          <div className="flex justify-between mb-8">
            <div className={`text-center ${currentStep >= 0 ? "text-blue-600" : "text-gray-400"}`}>
              <div className="text-2xl">📄</div>
              <p>Gửi báo cáo</p>
              <p className="text-sm">Điền thông tin</p>
            </div>
            <div className={`text-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div className="text-2xl">⏰</div>
              <p>Đang xử lý</p>
              <p className="text-sm">Xác minh thông tin</p>
            </div>
            <div className={`text-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div className="text-2xl">✅</div>
              <p>Hoàn thành</p>
              <p className="text-sm">Kết quả xử lý</p>
            </div>
          </div>

          {currentStep === 0 && (
            <form onSubmit={onFinish} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-1">Chiến dịch</label>
                  <select name="campaign" className="w-full p-2 border rounded-lg" required>
                    <option value="">Chọn chiến dịch</option>
                    <option value="shopee">Shopee Siêu Sale 12.12</option>
                    <option value="lazada">Lazada Khuyến Mãi Tết</option>
                    <option value="tiki">Tiki Săn Sale</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ngày đặt hàng</label>
                  <input
                    type="date"
                    name="orderDate"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-1">Mã đơn hàng</label>
                  <input
                    type="text"
                    name="orderID"
                    placeholder="Nhập mã đơn hàng"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Giá trị đơn hàng</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="orderAmount"
                      placeholder="Nhập giá trị đơn hàng"
                      className="w-full p-2 border rounded-l-lg"
                      required
                    />
                    <span className="p-2 bg-gray-200 border rounded-r-lg">VNĐ</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Link theo dõi đơn hàng (nếu có)</label>
                <div className="flex">
                  <span className="p-2 bg-gray-200 border rounded-l-lg">🔗</span>
                  <input
                    type="url"
                    name="trackingLink"
                    placeholder="https://"
                    className="w-full p-2 border rounded-r-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 flex items-center">
                  Thông tin khách hàng
                  <span className="ml-2 text-gray-500" title="Chỉ cung cấp thông tin cần thiết để xác minh đơn hàng">ℹ️</span>
                </label>
                <input
                  type="text"
                  name="customerInfo"
                  placeholder="Tên khách hàng hoặc thông tin liên hệ (nếu có)"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Lý do báo cáo</label>
                <select name="reason" className="w-full p-2 border rounded-lg" required>
                  <option value="">Chọn lý do</option>
                  <option value="not_tracked">Đơn hàng không được ghi nhận</option>
                  <option value="wrong_commission">Hoa hồng không chính xác</option>
                  <option value="cancelled">Đơn hàng bị hủy nhưng đã giao thành công</option>
                  <option value="other">Lý do khác</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Mô tả chi tiết</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Mô tả chi tiết về đơn hàng và lý do bạn tin rằng đơn hàng này thuộc về bạn"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Bằng chứng</label>
                <input
                  type="file"
                  name="evidence"
                  multiple
                  accept=".jpg,.png,.pdf"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <p className="text-sm text-gray-500">Hỗ trợ định dạng: JPG, PNG, PDF. Kích thước tối đa: 5MB</p>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Gửi báo cáo
                </button>
                <button
                  type="reset"
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                  onClick={() => setFormData({})}
                >
                  Làm lại
                </button>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <div className="text-center py-10">
              <div className="text-5xl text-blue-600 mb-6">⏰</div>
              <h3 className="text-xl font-semibold">Đang xử lý báo cáo của bạn</h3>
              <p>Vui lòng đợi trong giây lát...</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center py-10">
              <div className="text-5xl text-green-600 mb-6">✅</div>
              <h3 className="text-xl font-semibold">Báo cáo đã được gửi thành công!</h3>
              <p>
                Mã báo cáo của bạn là: <strong>LO-2023-004</strong>
              </p>
              <p>
                Chúng tôi sẽ xem xét báo cáo của bạn trong vòng 3-5 ngày làm việc. Bạn có thể theo dõi trạng thái báo cáo trong danh sách bên dưới.
              </p>
              <button
                onClick={() => setCurrentStep(0)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Tạo báo cáo mới
              </button>
            </div>
          )}
        </div>

        {/* Previous Reports Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Các báo cáo đã gửi</h2>
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
            >
              <span className="mr-2">➕</span> Tạo báo cáo mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Mã báo cáo</th>
                  <th className="p-2">Chiến dịch</th>
                  <th className="p-2">Ngày đặt hàng</th>
                  <th className="p-2">Ngày báo cáo</th>
                  <th className="p-2">Giá trị</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item) => (
                  <tr key={item.key}>
                    <td className="p-2">
                      <a href="#" className="text-blue-600">{item.id}</a>
                    </td>
                    <td className="p-2">{item.campaign}</td>
                    <td className="p-2">{item.orderDate}</td>
                    <td className="p-2">{item.reportDate}</td>
                    <td className="p-2">{item.amount}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.status === "Đã duyệt"
                            ? "bg-green-200 text-green-800"
                            : item.status === "Đang xử lý"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setIsModalVisible(true)}
                        className="text-blue-600"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {[
              {
                q: "Khi nào tôi nên báo cáo đơn hàng bị mất?",
                a: "Bạn nên báo cáo khi đơn hàng đã được đặt qua link của bạn nhưng không được ghi nhận. Đảm bảo qua 24-48 giờ, đơn hàng đã xác nhận và bạn có bằng chứng."
              },
              {
                q: "Tôi cần cung cấp những bằng chứng gì?",
                a: "Ảnh chụp xác nhận đơn hàng, email từ merchant, lịch sử click, thông tin khách hàng (nếu được phép)."
              },
              {
                q: "Mất bao lâu để xử lý báo cáo?",
                a: "Thông thường 3-5 ngày làm việc, có thể lâu hơn nếu cần thêm thông tin hoặc trong dịp cao điểm."
              },
            ].map((faq, index) => (
              <details key={index} className="border-b pb-2">
                <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                <p className="mt-2 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Chi tiết báo cáo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <p><strong>Mã báo cáo:</strong> LO-2023-001</p>
              <p><strong>Trạng thái:</strong> <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">Đang xử lý</span></p>
              <p><strong>Chiến dịch:</strong> Shopee Siêu Sale 12.12</p>
              <p><strong>Ngày đặt hàng:</strong> 10/12/2023</p>
              <p><strong>Mã đơn hàng:</strong> SP12345678</p>
              <p><strong>Giá trị đơn hàng:</strong> 1,250,000đ</p>
              <p><strong>Ngày báo cáo:</strong> 15/12/2023</p>
              <p><strong>Lý do báo cáo:</strong> Đơn hàng không được ghi nhận</p>
            </div>
            <p className="mb-4"><strong>Mô tả:</strong> Khách hàng đã click vào link của tôi và đặt hàng thành công, nhưng đơn hàng không được ghi nhận trong hệ thống.</p>
            <p className="mb-4"><strong>Bằng chứng:</strong> <a href="#" className="text-blue-600">order_confirmation.jpg</a>, <a href="#" className="text-blue-600">tracking_info.pdf</a></p>
            <p className="mb-4"><strong>Ghi chú từ Admin:</strong> Đang xác minh thông tin với Shopee. Dự kiến hoàn thành xử lý vào ngày 18/12/2023.</p>
            <hr className="my-4" />
            <h4 className="font-semibold mb-2">Lịch sử xử lý</h4>
            <ul className="space-y-2">
              <li>✅ <strong>Đã tiếp nhận báo cáo:</strong> 15/12/2023 10:30</li>
              <li>⏰ <strong>Đang xác minh với Merchant:</strong> 16/12/2023 14:45</li>
              <li>⏳ <strong>Dự kiến hoàn thành:</strong> 18/12/2023</li>
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}