import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Select, Table, Tag, Spin, Modal, Button } from "antd";
import { motion } from "framer-motion";
import getCampaign from "../../../modules/Publisher/getCampaign";
import getCampaignPromotes from "../../../modules/Promote/getCampaignPromotes"; // Adjust path as needed

const { Option } = Select;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [promotes, setPromotes] = useState([]);
  const [promotesLoading, setPromotesLoading] = useState(false);
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

  const handleViewPromotes = async (campaignId) => {
    console.log("Fetching promotes for campaignId:", campaignId); // Debug
    setSelectedCampaignId(campaignId);
    setPromotesLoading(true);
    setIsModalVisible(true);

    const data = await getCampaignPromotes(campaignId);
    console.log("Promotes data:", data); // Debug
    if (Array.isArray(data)) {
      setPromotes(data);
    } else {
      setPromotes([]);
    }
    setPromotesLoading(false);
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

  const promoteColumns = [
    {
      title: "Tên Publisher",
      dataIndex: "publisherName",
      key: "publisherName",
      render: (name) => name || "N/A",
      width: 150, // Fixed width to prevent overflow
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joinDate",
      key: "joinDate",
      width: 120,
    },
    {
      title: "Trạng thái phê duyệt",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved) => (
        <Tag color={isApproved ? "green" : "yellow"}>
          {isApproved ? "Approved" : "Pending"}
        </Tag>
      ),
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "yellow"}>{status}</Tag>
      ),
      width: 120,
    },
    {
      title: "Tracking URL",
      dataIndex: "baseTrackingUrl",
      key: "baseTrackingUrl",
      render: (url) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline block"
          style={{
            whiteSpace: "nowrap", // Prevent text wrapping
            overflow: "hidden", // Hide overflow
            textOverflow: "ellipsis", // Show ellipsis for long text
            maxWidth: "300px", // Limit the width of the URL
          }}
        >
          {url}
        </a>
      ),
      width: 300, // Fixed width for the URL column
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
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 250,
    },
    {
      title: "Ngân sách",
      dataIndex: "budget",
      key: "budget",
      render: (budget, record) => `${budget?.toLocaleString()} ${record.currencyCode || "VND"}`,
      width: 150,
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
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "yellow"}>{status}</Tag>
      ),
      width: 120,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleViewPromotes(record.campaignId)}
        >
          Xem Publisher
        </Button>
      ),
      width: 120,
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
            scroll={{ x: "max-content" }} // Add horizontal scroll for the main table
          />
          <Modal
            title="Danh sách Publisher đã tham gia"
            open={isModalVisible} // Change from visible to open (Ant Design v5)
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={1000} // Increase modal width to accommodate content
            style={{ top: 20 }} // Adjust modal position
            bodyStyle={{ padding: "16px", maxHeight: "60vh", overflowY: "auto" }} // Add vertical scroll for modal content
          >
            {promotesLoading ? (
              <div className="text-center">
                <Spin size="large" />
              </div>
            ) : promotes.length === 0 ? (
              <div className="text-center text-gray-500">
                Không có publisher nào tham gia chiến dịch này.
              </div>
            ) : (
              <Table
                columns={promoteColumns}
                dataSource={promotes}
                rowKey="promoteId"
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content" }} // Add horizontal scroll for the modal table
                style={{ overflowX: "auto" }} // Ensure table can scroll horizontally
              />
            )}
          </Modal>
        </>
      )}
    </motion.div>
  );
}