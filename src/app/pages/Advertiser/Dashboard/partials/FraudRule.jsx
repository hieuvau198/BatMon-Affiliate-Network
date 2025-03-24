import React, { useState, useEffect } from "react";
import { Table, Card, Tag, Tooltip, Spin, Empty, Input, Badge } from "antd";
import { InfoCircleOutlined, SafetyOutlined , SearchOutlined, EyeOutlined } from "@ant-design/icons";

const FraudRule = () => {
  const [rules, setRules] = useState([
    { 
      id: 1, 
      ruleName: "Block High-Risk IPs", 
      description: "Block IPs with fraudulent activity history or from suspicious locations.",
      severity: "high",
      status: "active",
      lastUpdated: "2025-03-10T14:30:00",
      category: "IP Filtering"
    },
    { 
      id: 2, 
      ruleName: "Multiple Accounts Detection", 
      description: "Detect multiple accounts created from the same IP address or device fingerprint.",
      severity: "medium",
      status: "active",
      lastUpdated: "2025-03-12T09:15:00",
      category: "Account Security"
    },
    { 
      id: 3, 
      ruleName: "Click Spamming Prevention", 
      description: "Prevent excessive clicks within a short time period from the same source.",
      severity: "high",
      status: "active",
      lastUpdated: "2025-03-15T16:45:00",
      category: "Click Fraud"
    },
    { 
      id: 4, 
      ruleName: "Conversion Time Validation", 
      description: "Flag conversions that occur too quickly after click as potentially fraudulent.",
      severity: "medium",
      status: "active", 
      lastUpdated: "2025-03-20T11:20:00",
      category: "Conversion Validation"
    },
    { 
      id: 5, 
      ruleName: "Device Fingerprinting", 
      description: "Identify and flag suspicious devices based on browser and hardware characteristics.",
      severity: "low",
      status: "active",
      lastUpdated: "2025-03-22T08:30:00",
      category: "Device Filtering"
    }
  ]);
  
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedRule, setSelectedRule] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter rules based on search
  const filteredRules = rules.filter(
    rule => 
      rule.ruleName.toLowerCase().includes(searchText.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchText.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // Get color for severity tag
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // View rule details
  const handleViewDetails = (rule) => {
    setSelectedRule(rule);
    setIsDetailsVisible(true);
  };
  
  // Close details view
  const handleCloseDetails = () => {
    setIsDetailsVisible(false);
    setTimeout(() => setSelectedRule(null), 300);
  };
  
  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Rule Name",
      dataIndex: "ruleName",
      key: "ruleName",
      render: (text, record) => (
        <div className="font-medium">{text}</div>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color="blue">{category}</Tag>
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
      width: 120,
      render: (status) => (
        <Badge 
          status={status === "active" ? "success" : "default"} 
          text={<span className="capitalize">{status}</span>} 
        />
      )
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      width: 200,
      render: (date) => formatDate(date)
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <Tooltip title="View Details">
          <button 
            onClick={() => handleViewDetails(record)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-all"
          >
            <EyeOutlined className="text-lg" />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-full">
      <div className="shadow-lg rounded-lg overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SafetyOutlined  className="text-white text-2xl mr-3" />
              <h1 className="text-xl font-bold text-white m-0">Fraud Protection Rules</h1>
            </div>
            <Tooltip title="These rules are configured by the network admin to protect against fraudulent activities.">
              <InfoCircleOutlined className="text-white text-lg cursor-pointer" />
            </Tooltip>
          </div>
          <p className="text-blue-100 mt-2 mb-0">
            These rules determine how the system identifies and prevents fraudulent activities in your advertising campaigns.
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Search rules by name, category or description"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full max-w-md"
              allowClear
            />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Loading fraud rules..." />
            </div>
          ) : filteredRules.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredRules.map((rule) => ({ ...rule, key: rule.id }))}
              pagination={{ 
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} rules`,
                className: "mb-0"
              }}
              bordered={false}
              className="fraud-rules-table"
              scroll={{ x: "max-content" }}
              rowClassName="hover:bg-gray-50"
            />
          ) : (
            <Empty 
              description="No matching rules found" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
      
      {/* Rule Details Drawer/Modal */}
      {selectedRule && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity ${isDetailsVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleCloseDetails}>
          <div 
            className={`bg-white rounded-lg w-full max-w-2xl transform transition-transform ${isDetailsVisible ? 'scale-100' : 'scale-95'} overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
              <h2 className="text-white font-bold text-lg m-0">{selectedRule.ruleName}</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Category</p>
                  <p className="font-medium">{selectedRule.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Severity</p>
                  <Tag color={getSeverityColor(selectedRule.severity)} className="capitalize">
                    {selectedRule.severity}
                  </Tag>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <Badge 
                    status={selectedRule.status === "active" ? "success" : "default"} 
                    text={<span className="capitalize">{selectedRule.status}</span>} 
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Last Updated</p>
                  <p className="font-medium">{formatDate(selectedRule.lastUpdated)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-1">Description</p>
                <p className="text-gray-800">{selectedRule.description}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
                  <p className="text-blue-800 text-sm m-0">
                    This rule is managed by the network administrator. If you believe this rule is affecting your legitimate traffic, please contact support.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-end">
              <button 
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudRule;