import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tag, Badge } from "antd";

const FraudRuleDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const rule = state?.rule;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "cao": return "red";
      case "trung bình": return "orange";
      case "thấp": return "green";
      default: return "blue";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!rule) {
    return (
      <div className="p-6 text-center text-gray-500">
        Không tìm thấy dữ liệu quy tắc. Vui lòng quay lại trang trước.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
          <h2 className="text-white font-bold text-lg m-0">{rule.ruleName}</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Danh Mục</p>
              <p className="font-medium">{rule.category}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Mức Độ Nghiêm Trọng</p>
              <Tag color={getSeverityColor(rule.severity)} className="capitalize">
                {rule.severity}
              </Tag>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Trạng Thái</p>
              <Badge
                status={rule.status === "hoạt động" ? "success" : "default"}
                text={<span className="capitalize">{rule.status}</span>}
              />
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Cập Nhật Lần Cuối</p>
              <p className="font-medium">{formatDate(rule.lastUpdated)}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-1">Mô Tả</p>
            <p className="text-gray-800">{rule.description}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
              <p className="text-blue-800 text-sm m-0">
                Quy tắc này được quản lý bởi quản trị viên mạng. Nếu bạn cho rằng quy tắc này đang ảnh hưởng đến lưu lượng hợp pháp của bạn, vui lòng liên hệ với bộ phận hỗ trợ.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraudRuleDetail;
