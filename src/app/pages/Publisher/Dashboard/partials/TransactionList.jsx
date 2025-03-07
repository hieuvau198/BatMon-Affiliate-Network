// src/components/TransactionList.js
import { TransactionOutlined } from "@ant-design/icons";

export function TransactionList() {
  const transactions = [
    {
      id: 1,
      date: "2025-03-01",
      description: "Shopee 12.12 Campaign",
      amount: "$500.00",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-03-02",
      description: "Lazada Tết Campaign",
      amount: "$750.00",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-03-03",
      description: "Tiki Sale Campaign",
      amount: "$300.00",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-2">
            <TransactionOutlined className="text-gray-600 dark:text-gray-400" />
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{transaction.amount}</p>
            <span
              className={`px-2 py-1 text-xs rounded ${
                transaction.status === "Completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}