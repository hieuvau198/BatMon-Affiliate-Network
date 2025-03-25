import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag, Timeline, Avatar } from "antd";
import { 
  InfoCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

export default function InvesCaseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { caseData } = location.state || {};

  if (!caseData) {
    return <div>Không có dữ liệu vụ việc</div>;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Đang Xem Xét': return 'blue';
      case 'Đã Giải Quyết': return 'green';
      case 'Đã Đóng': return 'gray';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Cao': return 'red';
      case 'Trung Bình': return 'orange';
      case 'Thấp': return 'green';
      default: return 'blue';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleClose = () => {
    navigate("/advertiser/fraud-investigation");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[100vh] overflow-y-auto shadow-xl flex flex-col">
        <div className={`bg-gradient-to-r p-4 ${
          caseData.severity === "Cao" ? "from-red-600 to-red-800" : 
          caseData.severity === "Trung Bình" ? "from-orange-500 to-orange-700" : 
          "from-green-600 to-green-800"
        }`}>
          <div className="flex justify-between">
            <h2 className="text-white font-bold text-lg m-0">Vụ Việc #{caseData.id}: {caseData.caseName}</h2>
            <Tag color={getStatusColor(caseData.status)}>
              {caseData.status}
            </Tag>
          </div>
        </div>

        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông Tin Vụ Việc</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Mức Độ Nghiêm Trọng</p>
                  <Tag color={getSeverityColor(caseData.severity)} className="capitalize">
                    {caseData.severity}
                  </Tag>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Ngày Báo Cáo</p>
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-400" />
                    <span>{formatDate(caseData.reportedDate)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Người Báo Cáo</p>
                  <div className="flex items-center">
                    <UserOutlined className="mr-2 text-gray-400" />
                    <span>{caseData.reportedBy}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Ngày Dự Kiến Giải Quyết</p>
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-400" />
                    <span>{formatDate(caseData.expectedResolution)}</span>
                  </div>
                </div>
                {caseData.resolvedDate && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Ngày Giải Quyết</p>
                    <div className="flex items-center">
                      <CheckCircleOutlined className="mr-2 text-green-500" />
                      <span className="text-green-600">{formatDate(caseData.resolvedDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Chiến Dịch Bị Ảnh Hưởng</h3>
              <div className="space-y-2">
                {caseData.affectedCampaigns.map((campaign, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex items-center">
                      <FileTextOutlined className="mr-2 text-indigo-500" />
                      <span>{campaign}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Mô Tả</h3>
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <p className="text-gray-800 m-0">{caseData.description}</p>
              </div>
              
              {caseData.resolution && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Kết Quả Giải Quyết</h3>
                  <div className="p-4 bg-green-50 rounded border border-green-200">
                    <p className="text-green-800 m-0">{caseData.resolution}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Dòng Thời Gian Hoạt Động</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <Timeline>
                {caseData.activityLog.map((activity, index) => (
                  <Timeline.Item 
                    key={index} 
                    dot={index === 0 ? <ExclamationCircleOutlined className="text-red-500" /> : undefined}
                  >
                    <div>
                      <p className="font-medium m-0">{activity.action}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarOutlined className="mr-1" /> 
                        <span>{formatDate(activity.date)}</span>
                        <span className="mx-2">•</span>
                        <Avatar size="small" icon={<UserOutlined />} className="mr-1" /> 
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <div className="flex items-start">
              <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
              <p className="text-blue-800 text-sm m-0">
                Cuộc điều tra này được quản lý bởi đội ngũ phòng chống gian lận của chúng tôi. Nếu bạn có câu hỏi về vụ việc này hoặc muốn cung cấp thêm thông tin, vui lòng liên hệ với bộ phận hỗ trợ.
              </p>
            </div>
          </div>
        </div>

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