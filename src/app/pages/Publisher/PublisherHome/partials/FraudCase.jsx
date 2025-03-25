import React, { useState, useEffect } from 'react';
import { Table, Tag, Spin, Select, DatePicker } from 'antd';
import { motion } from 'framer-motion';
import getFraudCase from '../../../../modules/FraudCase/getFraudCase';

const { Option } = Select;

const FraudCase = () => {
  const [fraudCases, setFraudCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterFraudType, setFilterFraudType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    const fetchFraudCases = async () => {
      try {
        const data = await getFraudCase();
        setFraudCases(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fraud cases:", error);
        setLoading(false);
      }
    };

    fetchFraudCases();
  }, []);

  const filteredFraudCases = fraudCases.filter((fraudCase) => {
    const matchesFraudType = filterFraudType === "all" || fraudCase.fraudTypeName === filterFraudType;
    const matchesStatus = filterStatus === "all" || fraudCase.status === filterStatus;
    const matchesDate =
      !filterDate || new Date(fraudCase.detectionDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString();
    return matchesFraudType && matchesStatus && matchesDate;
  });

  const columns = [
    {
      title: "Mã vụ gian lận",
      dataIndex: "caseId",
      key: "caseId",
    },
    {
      title: "Loại gian lận",
      dataIndex: "fraudTypeName",
      key: "fraudTypeName",
    },
    {
      title: "Ngày phát hiện",
      dataIndex: "detectionDate",
      key: "detectionDate",
    },
    {
      title: "Bằng chứng",
      dataIndex: "evidence",
      key: "evidence",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Under Review" ? "orange" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Fraud Detection Cases
      </h2>
      <div className="flex flex-col md:flex-row justify-end items-center mb-4 gap-4">
        <Select
          value={filterFraudType}
          onChange={setFilterFraudType}
          className="md:w-40"
        >
          <Option value="all">Tất cả loại gian lận</Option>
          <Option value="Click Fraud">Click Fraud</Option>
          <Option value="Impression Fraud">Impression Fraud</Option>
          <Option value="Other">Other</Option>
        </Select>

        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          className="md:w-40"
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="Under Review">Đang xem xét</Option>
          <Option value="Resolved">Đã giải quyết</Option>
        </Select>

        <DatePicker
          value={filterDate ? new Date(filterDate) : null}
          onChange={(date, dateString) => setFilterDate(dateString)}
          className="md:w-40"
          format="yyyy-MM-dd"
          placeholder="Chọn ngày"
        />
      </div>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredFraudCases}
          rowKey="caseId"
          pagination={{ pageSize: 5 }}
          rowClassName="hover:bg-gray-50 transition-colors duration-200"
        />
      )}
    </motion.div>
  );
};

export default FraudCase;
