import { useState } from "react";

export default function FraudTracking() {
  const [selectedKey, setSelectedKey] = useState("fraud");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const menuItems = [
    { key: "overview", icon: "📊", label: "Tổng quan" },
    { key: "campaigns", icon: "🎯", label: "Chiến dịch" },
    { key: "reports", icon: "⏰", label: "Báo cáo" },
    { key: "tools", icon: "🛠️", label: "Tool" },
    { key: "payments", icon: "💳", label: "Thanh toán" },
    { key: "fraud", icon: "🛡️", label: "Chống gian lận" },
  ];

  const fraudCases = [
    {
      key: "1",
      id: "FR-2023-001",
      campaign: "Shopee Siêu Sale 12.12",
      publisher: "publisher123",
      type: "Click Fraud",
      detectedDate: "10/12/2023",
      amount: "2,500,000đ",
      risk: "High",
      status: "Đang điều tra",
    },
    {
      key: "2",
      id: "FR-2023-002",
      campaign: "Lazada Khuyến Mãi Tết",
      publisher: "affiliate456",
      type: "Self-referral",
      detectedDate: "05/12/2023",
      amount: "1,850,000đ",
      risk: "Medium",
      status: "Đã xác nhận",
    },
    // ... (other fraud cases remain the same)
  ];

  const fraudCaseDetails = {
    "FR-2023-001": {
      id: "FR-2023-001",
      campaign: "Shopee Siêu Sale 12.12",
      publisher: {
        id: "publisher123",
        name: "Nguyễn Văn A",
        email: "publisher123@example.com",
        joinDate: "01/06/2023",
        status: "Active",
      },
      type: "Click Fraud",
      detectedDate: "10/12/2023",
      amount: "2,500,000đ",
      risk: "High",
      status: "Đang điều tra",
      description: "Phát hiện lưu lượng click bất thường...",
      evidence: ["Lưu lượng click cao bất thường", "..."],
      timeline: [{ date: "10/12/2023 08:30", action: "Hệ thống phát hiện...", by: "Automated System" }],
      actions: ["Tạm dừng thanh toán hoa hồng", "..."],
      ipAddresses: ["192.168.1.1", "..."],
      devices: ["Windows PC", "Android Phone"],
      conversionRate: "0.1%",
      normalConversionRate: "2.5%",
    },
    // ... (other fraud case details remain the same)
  };

  const showCaseDetails = (caseId) => {
    setSelectedCase(fraudCaseDetails[caseId]);
    setIsModalVisible(true);
  };

  const handleFilterChange = (e) => setFilterStatus(e.target.value);
  const handleSearch = (e) => setSearchText(e.target.value);
  const handleDateRangeChange = (e) => setDateRange(e.target.value);

  const filteredData = fraudCases.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.campaign.toLowerCase().includes(searchText.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="mr-2">🛡️</span> Hệ thống theo dõi gian lận
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-blue-600 font-semibold">Tổng số case</div>
            <div className="text-2xl text-blue-600">{fraudCases.length}</div>
            <div className="text-gray-500 text-sm">Tháng này</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-blue-600 font-semibold">Đang điều tra</div>
            <div className="text-2xl text-blue-600">
              {fraudCases.filter((c) => c.status === "Đang điều tra").length}
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-red-600 font-semibold">Đã xác nhận gian lận</div>
            <div className="text-2xl text-red-600">
              {fraudCases.filter((c) => c.status === "Đã xác nhận" || c.status === "Đã xử lý").length}
            </div>
            <div className="text-gray-500 text-sm">Tổng giá trị: 5,300,000đ</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-red-600 font-semibold">Rủi ro cao</div>
            <div className="text-2xl text-red-600">
              {fraudCases.filter((c) => c.risk === "High").length}
            </div>
            <div className="text-gray-500 text-sm">Cần xử lý ưu tiên</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex border-b">
            <button className="px-4 py-2 font-semibold text-gray-700 border-b-2 border-blue-500">
              📄 Tất cả
            </button>
            <button className="px-4 py-2 font-semibold text-gray-700">
              ⏰ Đang điều tra (
              {fraudCases.filter((c) => c.status === "Đang điều tra").length})
            </button>
            <button className="px-4 py-2 font-semibold text-gray-700">
              ❗ Đã xác nhận (
              {fraudCases.filter((c) => c.status === "Đã xác nhận").length})
            </button>
            <button className="px-4 py-2 font-semibold text-gray-700">
              ✅ Đã xử lý (
              {fraudCases.filter((c) => c.status === "Đã xử lý").length})
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, chiến dịch, publisher..."
              className="w-72 p-2 border rounded-lg"
              value={searchText}
              onChange={handleSearch}
            />
            <select
              className="w-48 p-2 border rounded-lg"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Đang điều tra">Đang điều tra</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đã xử lý">Đã xử lý</option>
              <option value="Đã bác bỏ">Đã bác bỏ</option>
            </select>
            <input type="date" className="p-2 border rounded-lg" onChange={handleDateRangeChange} />
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Lọc</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Mã Case</th>
                  <th className="p-2">Chiến dịch</th>
                  <th className="p-2">Publisher</th>
                  <th className="p-2">Loại gian lận</th>
                  <th className="p-2">Ngày phát hiện</th>
                  <th className="p-2">Giá trị</th>
                  <th className="p-2">Mức độ rủi ro</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.key} className={item.risk === "High" ? "bg-red-50" : ""}>
                    <td className="p-2">
                      <a
                        href="#"
                        onClick={() => showCaseDetails(item.id)}
                        className="text-blue-600"
                      >
                        {item.id}
                      </a>
                    </td>
                    <td className="p-2">{item.campaign}</td>
                    <td className="p-2">{item.publisher}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.type === "Click Fraud"
                            ? "bg-red-200 text-red-800"
                            : "bg-orange-200 text-orange-800"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="p-2">{item.detectedDate}</td>
                    <td className="p-2">{item.amount}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.risk === "High"
                            ? "bg-red-200 text-red-800"
                            : item.risk === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {item.risk}
                      </span>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.status === "Đang điều tra"
                            ? "bg-blue-200 text-blue-800"
                            : item.status === "Đã xác nhận"
                            ? "bg-yellow-200 text-yellow-800"
                            : item.status === "Đã xử lý"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => showCaseDetails(item.id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
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

        {/* Fraud Prevention Tips */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🛡️</span> Hướng dẫn phòng chống gian lận
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold">Nhận diện Click Fraud</h4>
              <ul className="list-disc pl-5">
                <li>Lưu lượng click cao bất thường</li>
                <li>Tỷ lệ chuyển đổi thấp</li>
                <li>Nhiều click từ cùng một địa chỉ IP</li>
                <li>Thời gian giữa các click quá ngắn</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold">Phát hiện Self-referral</h4>
              <ul className="list-disc pl-5">
                <li>Thông tin thanh toán trùng với thông tin Publisher</li>
                <li>Nhiều đơn hàng có giá trị cao trong thời gian ngắn</li>
                <li>Địa chỉ giao hàng trùng với địa chỉ đăng ký</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold">Biện pháp phòng ngừa</h4>
              <ul className="list-disc pl-5">
                <li>Thiết lập ngưỡng cảnh báo cho các chỉ số bất thường</li>
                <li>Xác minh thông tin Publisher trước khi thanh toán</li>
                <li>Sử dụng công cụ theo dõi IP và thiết bị</li>
                <li>Đào tạo đội ngũ về các dấu hiệu gian lận mới</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2 text-red-600">🛡️</span> Chi tiết case gian lận
            </h3>
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <p className="font-semibold">
                Case {selectedCase.id} - {selectedCase.status}
              </p>
              <p>{selectedCase.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Thông tin cơ bản</h4>
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Mã case:</strong> {selectedCase.id}</p>
                <p><strong>Chiến dịch:</strong> {selectedCase.campaign}</p>
                <p><strong>Loại gian lận:</strong> {selectedCase.type}</p>
                <p><strong>Ngày phát hiện:</strong> {selectedCase.detectedDate}</p>
                <p><strong>Giá trị:</strong> {selectedCase.amount}</p>
                <p><strong>Mức độ rủi ro:</strong> {selectedCase.risk}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Đóng
              </button>
              {selectedCase.status === "Đang điều tra" && (
                <>
                  <button className="px-4 py-2 bg-red-600 text-white rounded">
                    Xác nhận gian lận
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded">
                    Bác bỏ
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}