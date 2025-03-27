import { useState, useEffect } from "react";
import { Card, Input, Table, Spin, message } from "antd";
import getPayoutRequestsByPublisher from "../../../../../modules/PublisherBalance/partials/getPayoutRequestsByPublisher";

export default function PayoutHistory({ publisherId, formatDynamicCurrency }) {
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [payoutLoading, setPayoutLoading] = useState(true);
  const [payoutSearch, setPayoutSearch] = useState("");

  useEffect(() => {
    const fetchPayoutRequests = async () => {
      try {
        setPayoutLoading(true);
        const data = await getPayoutRequestsByPublisher(publisherId);
        if (data) {
          setPayoutRequests(data);
        }
      } catch (error) {
        console.error(error);
        message.error("Có lỗi xảy ra khi tải lịch sử yêu cầu thanh toán!");
      } finally {
        setPayoutLoading(false);
      }
    };
    fetchPayoutRequests();
  }, [publisherId]);

  const filteredPayoutRequests = payoutRequests.filter((request) =>
    request.requestId.toString().includes(payoutSearch) ||
    request.publisherName?.toLowerCase().includes(payoutSearch.toLowerCase())
  );

  const columns = [
    {
      title: "Mã yêu cầu",
      dataIndex: "requestId",
      key: "requestId",
      width: 120
    },
    {
      title: "Nhà xuất bản",
      dataIndex: "publisherName",
      key: "publisherName",
      width: 200
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span style={{ fontWeight: 500 }}>
          {formatDynamicCurrency(amount, record.currencyCode)}
        </span>
      ),
      width: 150
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      width: 150
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Pending") color = "orange";
        if (status === "Completed") color = "green";
        if (status === "Failed") color = "red";
        return <span style={{ color }}>{status}</span>;
      },
      width: 120
    }
  ];

  return (
    <Card className="mt-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Lịch sử yêu cầu thanh toán</h3>
        <Input
          placeholder="Tìm kiếm theo mã hoặc tên..."
          value={payoutSearch}
          onChange={(e) => setPayoutSearch(e.target.value)}
          className="w-64"
          prefix={<i className="fas fa-search text-gray-400" />}
        />
      </div>
      {payoutLoading ? (
        <div className="text-center py-8">
          <Spin size="large" />
        </div>
      ) : filteredPayoutRequests.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredPayoutRequests}
          rowKey="requestId"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          className="wallet-transactions-table"
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          <img src="/empty-state.svg" alt="No transactions" className="h-40 mx-auto mb-4" />
          <p>Chưa có giao dịch nào được thực hiện</p>
        </div>
      )}
    </Card>
  );
}
