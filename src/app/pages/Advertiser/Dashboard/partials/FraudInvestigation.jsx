import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Tag, Tooltip, Spin, Empty, Input, Badge, Tabs } from "antd";
import { 
  InfoCircleOutlined, 
  SearchOutlined, 
  EyeOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  FilterOutlined
} from "@ant-design/icons";

const { TabPane } = Tabs;

export default function FraudInvestigation() {
  const [investigations, setInvestigations] = useState([
    {
      id: "1",
      caseName: "Click Spamming Investigation",
      status: "Under Review",
      severity: "High",
      description: "Unusual high click rate detected from multiple IPs within a short time period. Pattern suggests automated tool usage.",
      reportedDate: "2025-03-10",
      affectedCampaigns: ["Summer Promotion", "New User Signup"],
      reportedBy: "System Monitoring",
      expectedResolution: "2025-03-28",
      activityLog: [
        { date: "2025-03-10", action: "Case opened", user: "System" },
        { date: "2025-03-12", action: "Initial analysis completed", user: "John (Fraud Team)" },
        { date: "2025-03-15", action: "Additional data requested", user: "Sarah (Fraud Team)" },
        { date: "2025-03-18", action: "Analysis in progress", user: "John (Fraud Team)" }
      ]
    },
    {
      id: "2",
      caseName: "Multiple Account Abuse",
      status: "Resolved",
      severity: "Medium",
      description: "User suspected of using multiple accounts for fraud. IP analysis confirms same device creating multiple accounts to claim bonuses.",
      reportedDate: "2025-02-25",
      affectedCampaigns: ["Referral Program"],
      reportedBy: "Manual Review",
      expectedResolution: "2025-03-10",
      resolvedDate: "2025-03-08",
      resolution: "Accounts terminated, fraudulent conversions reversed",
      activityLog: [
        { date: "2025-02-25", action: "Case opened", user: "Melissa (Compliance)" },
        { date: "2025-02-27", action: "Investigation started", user: "John (Fraud Team)" },
        { date: "2025-03-02", action: "Evidence collected", user: "John (Fraud Team)" },
        { date: "2025-03-05", action: "Decision made to terminate accounts", user: "David (Manager)" },
        { date: "2025-03-08", action: "Case resolved", user: "John (Fraud Team)" }
      ]
    },
    {
      id: "3",
      caseName: "Conversion Attribution Manipulation",
      status: "Under Review",
      severity: "High",
      description: "Potential manipulation of tracking parameters to claim attribution for conversions not driven by the affiliate.",
      reportedDate: "2025-03-15",
      affectedCampaigns: ["Premium Product Launch", "Holiday Special"],
      reportedBy: "Data Analysis Team",
      expectedResolution: "2025-04-05",
      activityLog: [
        { date: "2025-03-15", action: "Case opened", user: "Emily (Analytics)" },
        { date: "2025-03-17", action: "Initial evidence review", user: "Michael (Fraud Team)" },
        { date: "2025-03-20", action: "Technical analysis started", user: "Michael (Fraud Team)" }
      ]
    },
    {
      id: "4",
      caseName: "Cookie Stuffing Detection",
      status: "Closed",
      severity: "Medium",
      description: "Affiliate suspected of placing multiple tracking cookies without user consent to claim commission on future purchases.",
      reportedDate: "2025-01-18",
      affectedCampaigns: ["Winter Sale"],
      reportedBy: "Technical Monitoring",
      expectedResolution: "2025-02-10",
      resolvedDate: "2025-02-07",
      resolution: "Investigation confirmed. Affiliate removed from program and payments withheld.",
      activityLog: [
        { date: "2025-01-18", action: "Case opened", user: "System" },
        { date: "2025-01-20", action: "Technical evidence collected", user: "Alex (Technical Team)" },
        { date: "2025-01-28", action: "Affiliate notified", user: "Sarah (Compliance)" },
        { date: "2025-02-05", action: "Response reviewed", user: "Sarah (Compliance)" },
        { date: "2025-02-07", action: "Case closed with action", user: "David (Manager)" }
      ]
    },
    {
      id: "5",
      caseName: "Incentivized Traffic Violation",
      status: "Resolved",
      severity: "Low",
      description: "Affiliate potentially using incentivized traffic sources not allowed by campaign terms.",
      reportedDate: "2025-03-05",
      affectedCampaigns: ["App Install Campaign"],
      reportedBy: "Quality Control Team",
      expectedResolution: "2025-03-20",
      resolvedDate: "2025-03-18",
      resolution: "Affiliate warned and provided additional training on allowed traffic sources.",
      activityLog: [
        { date: "2025-03-05", action: "Case opened", user: "Tina (QA Team)" },
        { date: "2025-03-08", action: "Traffic source analysis", user: "Michael (Fraud Team)" },
        { date: "2025-03-12", action: "Affiliate contacted for explanation", user: "Sarah (Compliance)" },
        { date: "2025-03-15", action: "Response received and reviewed", user: "Sarah (Compliance)" },
        { date: "2025-03-18", action: "Case resolved with warning", user: "Sarah (Compliance)" }
      ]
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter investigations based on search and active tab
  const filteredInvestigations = investigations.filter(
    caseItem => 
      (caseItem.caseName.toLowerCase().includes(searchText.toLowerCase()) ||
       caseItem.description.toLowerCase().includes(searchText.toLowerCase())) &&
      (activeTab === "all" || 
       (activeTab === "active" && (caseItem.status === "Under Review")) ||
       (activeTab === "resolved" && (caseItem.status === "Resolved" || caseItem.status === "Closed")))
  );

  // Helper function for status and severity colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Under Review': return 'blue';
      case 'Resolved': return 'green';
      case 'Closed': return 'gray';
      default: return 'default';
    }
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'blue';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // View case details
  const handleViewDetails = (caseItem) => {
    navigate(`${caseItem.id}`, { state: { caseData: caseItem } });
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Under Review': return <ClockCircleOutlined className="text-blue-500" />;
      case 'Resolved': return <CheckCircleOutlined className="text-green-500" />;
      case 'Closed': return <CheckCircleOutlined className="text-gray-500" />;
      default: return <InfoCircleOutlined />;
    }
  };
  
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (id) => <span className="text-gray-500">#{id}</span>,
    },
    {
      title: "Case",
      dataIndex: "caseName",
      key: "caseName",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500 mt-1">
            Reported: {formatDate(record.reportedDate)}
          </div>
        </div>
      )
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      width: 120,
      render: (severity) => (
        <Tag color={getSeverityColor(severity)} className="capitalize">
          {severity}
        </Tag>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <div className="flex items-center">
          {getStatusIcon(status)}
          <span className="ml-2">{status}</span>
        </div>
      )
    },
    {
      title: "Affected Campaigns",
      dataIndex: "affectedCampaigns",
      key: "affectedCampaigns",
      render: (campaigns) => (
        <div>
          {campaigns.map((campaign, index) => (
            <Tag key={index} className="mr-1 mb-1">
              {campaign}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: "Expected Resolution",
      dataIndex: "expectedResolution",
      key: "expectedResolution",
      width: 150,
      render: (date, record) => (
        <span>
          {record.resolvedDate ? (
            <span className="text-green-600">{formatDate(record.resolvedDate)}</span>
          ) : (
            formatDate(date)
          )}
        </span>
      )
    },
    {
      title: "",
      key: "actions",
      width: 70,
      render: (text, record) => (
        <Tooltip title="View Details">
          <button 
            onClick={() => handleViewDetails(record)}
            className="text-blue-500 hover:text-blue-700 flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 transition-all"
            aria-label="View case details"
          >
            <EyeOutlined />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-[1120px]">
      <div className="shadow-lg rounded-lg overflow-hidden p-0">
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-800 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AuditOutlined className="text-white text-2xl mr-3" />
              <h1 className="text-xl font-bold text-white m-0">Fraud Investigation Cases</h1>
            </div>
            <Tooltip title="These are investigations into potential fraudulent activities affecting your campaigns.">
              <InfoCircleOutlined className="text-white text-lg cursor-pointer" />
            </Tooltip>
          </div>
          <p className="text-indigo-100 mt-2 mb-0">
            View ongoing and past fraud investigations that may affect your advertising campaigns.
          </p>  
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="fraud-tabs"
            >
              <TabPane tab="All Cases" key="all" />
              <TabPane 
                tab={
                  <span>
                    Active Investigations <Badge 
                      count={investigations.filter(c => c.status === "Under Review").length} 
                      style={{ backgroundColor: '#1890ff' }} 
                    />
                  </span>
                } 
                key="active" 
              />
              <TabPane 
                tab={
                  <span>
                    Resolved Cases <Badge 
                      count={investigations.filter(c => c.status === "Resolved" || c.status === "Closed").length}
                      style={{ backgroundColor: '#52c41a' }} 
                    />
                  </span>
                } 
                key="resolved" 
              />
            </Tabs>

            <div className="flex items-center w-full md:w-auto">
              <Input
                placeholder="Search cases"
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full md:w-64"
                allowClear
              />
              <Tooltip title="Filter Options">
                <button className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <FilterOutlined />
                </button>
              </Tooltip>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Loading investigation cases..." />
            </div>
          ) : filteredInvestigations.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredInvestigations.map((caseItem) => ({ ...caseItem, key: caseItem.id }))}
              pagination={{ 
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} cases`,
                className: "mb-0"
              }}
              bordered={false}
              scroll={{ x: "max-content" }}
              rowClassName="hover:bg-gray-50"
            />
          ) : (
            <Empty 
              description="No matching investigation cases found" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </div>
  );
}