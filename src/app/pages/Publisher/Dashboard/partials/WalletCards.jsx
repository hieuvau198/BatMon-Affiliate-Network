// src/components/WalletCards.js
import { CreditCardOutlined } from "@ant-design/icons";

export function WalletCards() {
  const wallets = [
    {
      id: 1,
      name: "Primary Wallet",
      balance: "$5,240.00",
      type: "Bank Account",
    },
    {
      id: 2,
      name: "Secondary Wallet",
      balance: "$1,500.00",
      type: "PayPal",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {wallets.map((wallet) => (
        <div key={wallet.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCardOutlined className="text-blue-600 dark:text-blue-400" />
              <p className="font-semibold">{wallet.name}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.type}</p>
          </div>
          <p className="mt-2 text-lg font-bold">{wallet.balance}</p>
        </div>
      ))}
    </div>
  );
}