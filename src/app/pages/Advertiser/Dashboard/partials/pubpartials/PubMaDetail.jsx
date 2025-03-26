import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Progress, Tabs, Table, Button, Statistic, message, Tag, Tooltip } from "antd";
import { ArrowLeftOutlined, LineChartOutlined, InfoCircleOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';
import getAllPublisherId from "../../../../../modules/Publisher/getAllPublisherId";
import { useNavigate } from "react-router-dom";

export default function PublisherDetail() {
  const { publisherId } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("overview");
  const [loading, setLoading] = useState(true);
  const { TabPane } = Tabs;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllPublisherId(publisherId);
      if (!data) {
        message.error("Không tìm thấy nhà phát hành!");
      } else {
        setPublisher(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [publisherId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>;
  }

  if (!publisher) {
    return <p className="text-center mt-6 text-red-600">Nhà phát hành không tồn tại!</p>;
  }

  const monthlyDataColumns = [
    { title: "Tháng", dataIndex: "month", key: "month" },
    { 
      title: "Lưu lượng", 
      dataIndex: "traffic", 
      key: "traffic", 
      render: (traffic) => <div className="text-right">{traffic?.toLocaleString() || 0}</div>,
    },
    { 
      title: "Chuyển đổi", 
      dataIndex: "conversions", 
      key: "conversions", 
      render: (conversions) => <div className="text-right">{conversions?.toLocaleString() || 0}</div>,
    },
    { 
      title: "Doanh thu", 
      dataIndex: "revenue", 
      key: "revenue", 
      render: (revenue) => <div className="text-right font-medium">{revenue || "0đ"}</div>,
    },
    { 
      title: "CR%", 
      key: "cr", 
      render: (_, record) => (
        <div className="text-right">
          {record.traffic ? ((record.conversions / record.traffic) * 100).toFixed(2) : "0.00"}%
        </div>
      ),
    },
  ];

  const getFraudRiskTag = (risk) => {
    const colors = {
      "Thấp": "green",
      "Trung bình": "orange",
      "Cao": "red"
    };
    return (
      <Tag color={colors[risk] || "gray"} className="font-medium">
        {risk || "Không xác định"}
      </Tag>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="shadow-xl rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => window.history.back()}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Quay lại
              </Button>
              <div>
                <span className="text-gray-500 text-sm">Chi tiết nhà phát hành</span>
                <h1 className="text-2xl font-bold text-gray-800">{publisher.username}</h1>
              </div>
            </div>
            <Tooltip title="Cập nhật lần cuối: vừa xong">
              <InfoCircleOutlined className="text-gray-400 hover:text-gray-600" />
            </Tooltip>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50">
          {[
            { title: "Lưu lượng", value: publisher.traffic?.toLocaleString() || 0, color: "blue" },
            { title: "Chuyển đổi", value: publisher.conversions?.toLocaleString() || 0, color: "green" },
            { title: "Doanh thu", value: publisher.revenue || "0đ", color: "purple" },
            { title: "Hoa hồng", value: publisher.commission || "0đ", color: "orange" },
          ].map((stat, index) => (
            <Card 
              key={index}
              className={`border-l-4 border-${stat.color}-500 bg-white shadow-sm hover:shadow-md transition-shadow`}
            >
              <Statistic
                title={<span className="text-gray-600 text-sm">{stat.title}</span>}
                value={stat.value}
                valueStyle={{ color: `var(--${stat.color}-600)`, fontSize: "1.5rem" }}
              />
            </Card>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs 
          activeKey={activeTabKey} 
          onChange={setActiveTabKey} 
          className="px-6"
          tabBarStyle={{ marginBottom: 0 }}
        >
          <TabPane 
            tab={<span><LineChartOutlined /> Tổng quan</span>} 
            key="overview"
          >
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Publisher Info */}
              <Card className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  Thông tin nhà phát hành
                  {getFraudRiskTag(publisher.fraudRisk)}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-blue-600">{publisher.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Công ty:</span>
                    <span className="font-medium">{publisher.companyName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Người liên hệ:</span>
                    <span className="font-medium">{publisher.contactName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điện thoại:</span>
                    <span className="font-medium">{publisher.phoneNumber || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-medium">{publisher.address || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày đăng ký:</span>
                    <span className="font-medium">{publisher.registrationDate || "N/A"}</span>
                  </div>
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hiệu suất</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tỷ lệ chuyển đổi</span>
                      <span className="font-medium text-blue-600">
                        {publisher.traffic ? ((publisher.conversions / publisher.traffic) * 100).toFixed(2) : "0.00"}%
                      </span>
                    </div>
                    <Progress 
                      percent={publisher.traffic ? (publisher.conversions / publisher.traffic) * 100 : 0} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Monthly Performance */}
            {publisher.monthlyData && (
              <div className="p-6">
                <Card className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Hiệu suất hàng tháng</h3>
                  <Table
                    dataSource={publisher.monthlyData}
                    columns={monthlyDataColumns}
                    pagination={{ pageSize: 6 }}
                    size="small"
                    rowKey="month"
                    bordered
                    className="rounded-lg overflow-hidden"
                  />
                </Card>
              </div>
            )}
          </TabPane>    
        </Tabs>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="primary"
          icon={<FileTextOutlined />}
          onClick={() =>
          navigate(`/advertiser/publisher-management/publisherdetail/${publisherId}/PubCampaignPolicy`)
         }
        className="bg-blue-600 hover:bg-blue-700"
        >
        Chính sách chiến dịch
        </Button>
        <Button
          type="default"
          icon={<BarChartOutlined />}
          onClick={() =>
          navigate(`/advertiser/campaignList`)
         }
         className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
        >
        Chiến Dịch
       </Button>
      </div>
    </div>
  );
}