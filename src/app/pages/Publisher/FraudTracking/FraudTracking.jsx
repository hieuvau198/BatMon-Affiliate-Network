"use client";

import { useState, useEffect } from "react";
import { Table, message } from "antd";
import Cookies from "js-cookie";
import getAllTrafficSource from "../../../modules/TrafficSource/getAllTrafficSource";
import { IdcardOutlined, UserOutlined, TagOutlined, LinkOutlined, CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function FraudTracking() {
  const [trafficSources, setTrafficSources] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Traffic Sources
  useEffect(() => {
    const fetchTrafficSources = async () => {
      setLoading(true);
      const data = await getAllTrafficSource();
      if (data) setTrafficSources(data);
      setLoading(false);
    };
    fetchTrafficSources();
  }, []);

  // Columns for Traffic Sources Table
  const trafficSourceColumns = [
    {
      title: (
        <span>
          <IdcardOutlined className="mr-2" /> ID
        </span>
      ),
      dataIndex: "sourceId",
      key: "sourceId",
    },
    {
      title: (
        <span>
          <UserOutlined className="mr-2" /> Publisher ID
        </span>
      ),
      dataIndex: "publisherId",
      key: "publisherId",
    },
    {
      title: (
        <span>
          <TagOutlined className="mr-2" /> Tên Nguồn
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span>
          <TagOutlined className="mr-2" /> Loại
        </span>
      ),
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <span className={`px-2 py-1 rounded ${text === "Social Media" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"}`}>
          {text}
        </span>
      ),
    },
    {
      title: (
        <span>
          <LinkOutlined className="mr-2" /> URL
        </span>
      ),
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {text}
        </a>
      ),
    },
    {
      title: (
        <span>
          <CalendarOutlined className="mr-2" /> Ngày Thêm
        </span>
      ),
      dataIndex: "addedDate",
      key: "addedDate",
    },
    {
      title: (
        <span>
          <CheckCircleOutlined className="mr-2" /> Trạng thái
        </span>
      ),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span className={`px-2 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="mr-2">🌐</span> Hệ thống theo dõi Nguồn Lưu lượng
        </h2>

        {/* Traffic Sources Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🌐</span> Danh sách Nguồn Lưu lượng
          </h3>
          <Table
            columns={trafficSourceColumns}
            dataSource={trafficSources}
            loading={loading}
            rowKey="sourceId"
            pagination={{ pageSize: 5 }}
            className="bg-white shadow rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}