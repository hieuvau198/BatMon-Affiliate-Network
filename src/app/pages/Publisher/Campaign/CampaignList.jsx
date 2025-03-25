import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Select, Table, Tag, Spin, Modal, Button } from "antd";
import { motion } from "framer-motion";
import getCampaign from "../../../modules/Publisher/getCampaign";
import getCampaignPublishers from "../../../modules/PublisherCampaign"

const { Option } = Select;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [publishersLoading, setPublishersLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await getCampaign();
        console.log("Campaigns data:", data); // Debug
        if (Array.isArray(data)) {
          setCampaigns(data);
          setStatusOptions([...new Set(data.map(campaign => campaign.status))]);
        } else {
          setCampaigns([]);
          setStatusOptions([]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setCampaigns([]);
        setStatusOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleViewPublishers = async (campaignId) => {
    console.log("Fetching publishers for campaignId:", campaignId); // Debug
    setSelectedCampaignId(campaignId);
    setPublishersLoading(true);
    setIsModalVisible(true);

    const data = await getCampaignPublishers(campaignId);
    console.log("Publishers data:", data); // Debug
    if (Array.isArray(data)) {
      setPublishers(data);
    } else {
      setPublishers([]);
    }
    setPublishersLoading(false);
  };

  const filteredCampaigns = Array.isArray(campaigns)
    ? campaigns.filter((campaign) => {
        const matchesSearch = campaign.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const matchesStatus =
          filterStatus === "all" || campaign.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
    : [];

  const publisherColumns = [
    {
      title: "Tên Publisher",
      dataIndex: "publisherName",
      key: "publisherName",
    },
    {
      title: "Tổng hoa hồng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount, record) => `${amount?.toLocaleString()} ${record.currencyCode || "VND"}`,
    },
    {
      title: "Hoa hồng đang chờ",
      dataIndex: "pendingAmount",
      key: "pendingAmount",
      render: (amount, record) => `${amount?.toLocaleString()} ${record.currencyCode || "VND"}`,
    },
    {
      title: "Trạng thái hoa hồng",
      dataIndex: "commissionStatus",
      key: "commissionStatus",
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "yellow"}>{status}</Tag>
      ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const columns = [
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/campaigndetail/${String(record.campaignId)}`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
      render: (budget, record) => `${budget?.toLocaleString()} ${record.currencyCode || "VND"}`,
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <div>
          <div>Bắt đầu: {record.startDate}</div>
          <div>Kết thúc: {record.endDate}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "yellow"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleViewPublishers(record.campaignId)}
        >
          Xem Publisher
        </Button>
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
        Featured Campaigns
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Input
          placeholder="Tìm kiếm chiến dịch..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="md:w-64"
        />
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          className="md:w-40"
        >
          <Option value="all">Tất cả trạng thái</Option>
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={filteredCampaigns}
            rowKey="campaignId"
            pagination={{ pageSize: 5 }}
            rowClassName="hover:bg-gray-50 transition-colors duration-200"
          />
          <Modal
            title="Danh sách Publisher đã tham gia"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={800}
          >
            {publishersLoading ? (
              <div className="text-center">
                <Spin size="large" />
              </div>
            ) : publishers.length === 0 ? (
              <div className="text-center text-gray-500">
                Không có publisher nào tham gia chiến dịch này.
              </div>
            ) : (
              <Table
                columns={publisherColumns}
                dataSource={publishers}
                rowKey="commissionId"
                pagination={{ pageSize: 5 }}
              />
            )}
          </Modal>
        </>
      )}
    </motion.div>
  );
}