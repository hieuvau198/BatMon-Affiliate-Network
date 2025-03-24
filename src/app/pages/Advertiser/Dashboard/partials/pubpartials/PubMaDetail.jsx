import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Progress, Tabs, Table, Button, Statistic, Divider, Select, DatePicker } from "antd";
import { ArrowLeftOutlined, DownloadOutlined, LineChartOutlined, PieChartOutlined, BarChartOutlined, AlertOutlined } from '@ant-design/icons';
import publishersDtail from "./mock_pubMaDetail.json";

export default function PublisherDetail() {
  const { publisherId } = useParams();
  const [publisher, setPublisher] = useState();
  const [activeTabKey, setActiveTabKey] = useState("overview");
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;
  const [publishers, setPublishers] = useState(publishersDtail);

  useEffect(() => {
    const foundPublisher = publishers.find((p) => p.id === publisherId);
    setPublisher(foundPublisher);
  }, [publisherId]);

  if (!publisher) {
    return <p className="text-center mt-6 text-red-600">Nhà phát hành không tồn tại!</p>;
  }

  const monthlyDataColumns = [
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Lưu lượng",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic) => (
        <div className="text-right">{traffic.toLocaleString()}</div>
      ),
    },
    {
      title: "Chuyển đổi",
      dataIndex: "conversions",
      key: "conversions",
      render: (conversions) => (
        <div className="text-right">{conversions.toLocaleString()}</div>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => (
        <div className="text-right">{revenue}</div>
      ),
    },
    {
      title: "Tỷ lệ CR%",
      key: "cr",
      render: (text, record) => (
        <div className="text-right">
          {((record.conversions / record.traffic) * 100).toFixed(2)}%
        </div>
      ),
    },
  ];

  const getFraudRiskColor = (risk) => {
    switch (risk) {
      case "Thấp":
        return "green";
      case "Trung bình":
        return "orange";
      case "Cao":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="p-6 max-w-[1500px] mx-auto">
      <Card className="shadow rounded-lg bg-white p-6 w-full">
        {/* Header with Breadcrumb + Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
              className="mr-4"
            >
              Quay lại danh sách
            </Button>
            <div>
              <div className="text-gray-500 text-sm">Phân tích nhà phát hành</div>
              <h1 className="text-2xl font-bold">{publisher.name}</h1>
            </div>
          </div>
        </div>

        {/* Publisher Overview Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <Card className="bg-gray-50 shadow-sm">
            <Statistic 
              title="Lưu lượng" 
              value={publisher.traffic} 
            />
          <div className="text-xs text-gray-500 mt-1">Lượt truy cập</div>

          </Card>
          
          <Card className="bg-gray-50 shadow-sm">
            <Statistic 
              title="Chuyển đổi" 
              value={publisher.conversions} 
            />
          </Card>
          
          <Card className="bg-gray-50 shadow-sm">
            <Statistic 
              title="Doanh thu" 
              value={publisher.revenue} 
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
          
          <Card className="bg-gray-50 shadow-sm">
            <Statistic 
              title="Hoa hồng đã trả" 
              value={publisher.commission} 
              valueStyle={{ color: '#cf9700' }}
            />
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs activeKey={activeTabKey} onChange={(key) => setActiveTabKey(key)}
        ><TabPane 
            tab={<span><LineChartOutlined />Tổng quan </span> }  key="overview" >
            <div className="grid grid-cols-2 gap-6">
              {/* Publisher Information */}
              <Card className="bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Thông tin nhà phát hành</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      publisher.status === "Hoạt động"
                        ? "bg-green-100 text-green-800"
                        : publisher.status === "Đang chờ"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {publisher.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID:</span>
                    <span className="font-medium">{publisher.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ngày tham gia:</span>
                    <span className="font-medium">{publisher.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ngành:</span>
                    <span className="font-medium">{publisher.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phương thức thanh toán:</span>
                    <span className="font-medium">{publisher.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rủi ro gian lận:</span>
                    <span className="font-medium" style={{ color: getFraudRiskColor(publisher.fraudRisk) }}>
                      {publisher.fraudRisk}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Conversion Metrics */}
              <Card className="bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Chỉ số hiệu suất</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tỷ lệ chuyển đổi</span>
                      <span className="text-sm font-medium">
                        {((publisher.conversions / publisher.traffic) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress 
                      percent={((publisher.conversions / publisher.traffic) * 100)} 
                      status="active" 
                      showInfo={false} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tỷ lệ nhấp chuột (CTR)</span>
                      <span className="text-sm font-medium">{publisher.ctr}%</span>
                    </div>
                    <Progress 
                      percent={publisher.ctr} 
                      status="active" 
                      showInfo={false} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Hoàn tất đơn hàng</span>
                      <span className="text-sm font-medium">
                        {((publisher.totalOrders / publisher.traffic) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress 
                      percent={((publisher.totalOrders / publisher.traffic) * 100)} 
                      status="active" 
                      showInfo={false} 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mục tiêu doanh thu</span>
                      <span className="text-sm font-medium">
                        {((publisher.revenue.replace(/\D/g, '') / 20000000) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress 
                      percent={(publisher.revenue.replace(/\D/g, '') / 20000000) * 100} 
                      status="active" 
                      showInfo={false} 
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Traffic Sources & Monthly Performance */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <Card className="bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Nguồn lưu lượng</h3>
                <div className="space-y-3">
                  {publisher.trafficSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{source.source}</span>
                        <span className="text-sm font-medium">{source.percentage}%</span>
                      </div>
                      <Progress 
                        percent={source.percentage} 
                        showInfo={false} 
                        strokeColor={
                          index === 0 ? "#1890ff" : 
                          index === 1 ? "#52c41a" : 
                          index === 2 ? "#faad14" : 
                          "#f5222d"
                        }
                      />
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Hiệu suất hàng tháng</h3>
                <Table 
                  dataSource={publisher.monthlyData} 
                  columns={monthlyDataColumns}
                  pagination={false}
                  size="small"
                  rowKey="month"
                />
              </Card>
            </div>
          </TabPane>               
        </Tabs>
      </Card>
    </div>
  );
}