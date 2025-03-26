import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tag, Timeline, Avatar, Spin, message } from "antd";
import { 
  InfoCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import getFraudCaseDetail from "../../../../../modules/FraudCase/getFraudCaseId";

export default function InvesCaseDetails() {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetail = async () => {
      setLoading(true);
      try {
        const data = await getFraudCaseDetail(caseId);
        console.log("API Response:", data); // Debug dữ liệu trả về
        if (data) {
          setCaseData(data);
        } else {
          message.error("Không tìm thấy dữ liệu vụ việc từ API");
          setCaseData(null);
        }
      } catch (error) {
        console.error("Error fetching fraud case detail:", error); // Debug lỗi
        message.error("Lỗi khi tải chi tiết vụ gian lận: " + error.message);
        setCaseData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseDetail();
  }, [caseId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review": return "blue";
      case "Confirmed Fraud": return "red";
      default: return "gray";
    }
  };

  const handleClose = () => {
    navigate("/advertiser/fraud-investigation");
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin size="large" tip="Đang tải chi tiết vụ việc..." />
      </div>
    );
  }

  if (!caseData) {
    return <div className="text-center p-6 text-red-600">Không có dữ liệu vụ việc</div>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold text-lg m-0">
              Vụ Việc #{caseData.caseId}: {caseData.fraudTypeName || "Không xác định"}
            </h2>
            <Tag color={getStatusColor(caseData.status)}>
              {caseData.status === "Under Review" ? "Đang Xem Xét" : caseData.status === "Confirmed Fraud" ? "Xác Nhận Gian Lận" : "Không xác định"}
            </Tag>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Case Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông Tin Vụ Việc</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Ngày Phát Hiện</p>
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-400" />
                    <span>{formatDate(caseData.detectionDate)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Mã Giao Dịch</p>
                  <div className="flex items-center">
                    <FileTextOutlined className="mr-2 text-gray-400" />
                    <span>{caseData.conversionTransactionId || "N/A"}</span>
                  </div>
                </div>
                {caseData.resolutionDate && (
                  <div>
                    <p className="text-gray-500 mb-1">Ngày Giải Quyết</p>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="mr-2 text-green-500" />
                      <span className="text-green-600">{formatDate(caseData.resolutionDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence and Resolution */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Bằng Chứng</h3>
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <p className="text-gray-800 m-0">{caseData.evidence || "Không có bằng chứng chi tiết"}</p>
              </div>

              {caseData.resolution && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800">Kết Quả Giải Quyết</h3>
                  <div className="p-4 bg-green-50 rounded border border-green-200">
                    <p className="text-green-800 m-0">{caseData.resolution}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Dòng Thời Gian Hoạt Động</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <Timeline>
                <Timeline.Item dot={<ExclamationCircleOutlined className="text-red-500" />}>
                  <div>
                    <p className="font-medium m-0">Phát hiện gian lận</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <CalendarOutlined className="mr-1" /> 
                      <span>{formatDate(caseData.detectionDate)}</span>
                      <span className="mx-2">•</span>
                      <Avatar size="small" icon={<UserOutlined />} className="mr-1" /> 
                      <span>User #{caseData.detectedBy || "N/A"}</span>
                    </div>
                  </div>
                </Timeline.Item>
                {caseData.resolutionDate && (
                  <Timeline.Item>
                    <div>
                      <p className="font-medium m-0">Giải quyết vụ việc</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarOutlined className="mr-1" /> 
                        <span>{formatDate(caseData.resolutionDate)}</span>
                        <span className="mx-2">•</span>
                        <Avatar size="small" icon={<UserOutlined />} className="mr-1" /> 
                        <span>User #{caseData.resolvedBy || "N/A"}</span>
                      </div>
                    </div>
                  </Timeline.Item>
                )}
              </Timeline>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <div className="flex items-start">
              <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
              <p className="text-blue-800 text-sm m-0">
                Vụ việc này đang được đội ngũ phòng chống gian lận xử lý. Liên hệ hỗ trợ nếu cần thêm thông tin.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}