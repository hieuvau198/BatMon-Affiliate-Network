import {   Tabs,   Card,   Typography,  Button,  Space,  Tooltip,  notification} from "antd";
import { useState } from "react";
import {   WalletOutlined,  DownloadOutlined,  SettingOutlined,  HistoryOutlined,  ArrowUpOutlined,  LineChartOutlined,  BankOutlined,ArrowDownOutlined} from '@ant-design/icons';
import BalanceManagement from './BalanceManagement';
import TransactionManagement from './TransactionManagement';
import WithdrawalRequest from './Withdrawalrequest';
import CampaignSpendTracking from './CampaignSpendTracking';
import BankAccountManagement from './BankAccountManagement';
import DepositRequest from './DepositRequest';

const { Title } = Typography;
const { TabPane } = Tabs;
export default function Wallet() {
  // State chung có thể chia sẻ giữa các component
  const [advertiserBalance, setAdvertiserBalance] = useState({
    balanceId: 1,
    advertiserId: 101,
    availableBalance: 8500000,
    pendingBalance: 1500000,
    lifetimeDeposits: 15000000,
    lifetimeWithdrawals: 4000000,
    lifetimeSpend: 2500000,
    lastUpdated: "2024-03-15",
    currencyCode: "VND"
  });
  // Transaction history
  const [transactions, setTransactions] = useState([
    {
      id: "T001",
      transactionId: "TXN-20240301",
      type: "Deposit",
      amount: 5000000,
      status: "Completed",
      date: "2024-03-01",
      description: "Bank transfer deposit"
    },
    {
      id: "T002",
      transactionId: "TXN-20240302",
      type: "Withdrawal",
      amount: 3200000,
      status: "Pending",
      date: "2024-03-02",
      description: "Regular withdrawal"
    },
    {
      id: "T003",
      transactionId: "TXN-20240310",
      type: "Campaign",
      amount: 1200000,
      status: "Completed",
      date: "2024-03-10",
      description: "Campaign ID: CP-302 spend"
    },
  ]);
  // Withdrawal requests
  const [withdrawalRequests, setWithdrawalRequests] = useState([
    {
      requestId: 1,
      advertiserId: 101,
      amount: 2000000,
      requestDate: "2024-03-10",
      status: "Pending",
      rejectionReason: null,
      reviewedBy: null,
      currencyCode: "VND",
      bankInfo: "Techcombank - 19025678910 - Nguyen Van A"
    },
    {
      requestId: 2,
      advertiserId: 101,
      amount: 1500000,
      requestDate: "2024-02-25",
      status: "Completed",
      rejectionReason: null,
      reviewedBy: 5,
      currencyCode: "VND",
      bankInfo: "Techcombank - 19025678910 - Nguyen Van A"
    },
    {
      requestId: 3,
      advertiserId: 101,
      amount: 500000,
      requestDate: "2024-02-15",
      status: "Rejected",
      rejectionReason: "Insufficient funds",
      reviewedBy: 8,
      currencyCode: "VND",
      bankInfo: "Techcombank - 19025678910 - Nguyen Van A"
    }
  ]);
  // Campaign spend data
  const [campaignSpend, setCampaignSpend] = useState([
    { campaignId: "CP-301", name: "Summer Promotion", spend: 800000, status: "Active" },
    { campaignId: "CP-302", name: "New Product Launch", spend: 1200000, status: "Active" },
    { campaignId: "CP-299", name: "Holiday Special", spend: 500000, status: "Paused" }
  ]);

  // User bank accounts
  const [userBankAccounts, setUserBankAccounts] = useState([
    { id: 1, bankName: "Techcombank", accountNumber: "19025678910", accountHolder: "Nguyen Van A", isDefault: true },
    { id: 2, bankName: "Vietcombank", accountNumber: "0123456789", accountHolder: "Nguyen Van A", isDefault: false }
  ]);

  // State cho các modal
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [bankAccountModal, setBankAccountModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const formatCurrency = (value) => { return `${value.toLocaleString()}đ`;};
  const addTransaction = (newTransaction) => {   setTransactions([...transactions, newTransaction]);  };

  return (
    <div className="p-4 max-w-[1500px] mx-auto">
      <Card className="shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0 flex items-center">
            <WalletOutlined className="mr-2" /> Advertiser Wallet
          </Title>
          <Space>
            <Button icon={<DownloadOutlined />}>
              Export Report
            </Button>
          </Space>
        </div>
        
        {/* Component quản lý số dư */}
        <BalanceManagement 
          advertiserBalance={advertiserBalance}
          setAdvertiserBalance={setAdvertiserBalance}
          transactions={transactions}
          setTransactions={setTransactions}
          setStatusFilter={setStatusFilter}
          setWithdrawalModal={setWithdrawalModal}
          setDepositModal={setDepositModal}
          formatCurrency={formatCurrency}
        />
        
        {/* Tabs cho các chức năng ví */}
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={
              <span>
                <HistoryOutlined /> Lịch sử giao dịch
              </span>
            } 
            key="1"
          >
            <TransactionManagement 
              transactions={transactions}
              setTransactions={setTransactions}
              formatCurrency={formatCurrency}
            />
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ArrowDownOutlined /> Nạp tiền
              </span>
            } 
            key="2"
          >
            <DepositRequest 
              advertiserBalance={advertiserBalance}
              setAdvertiserBalance={setAdvertiserBalance}
              transactions={transactions}
              setTransactions={setTransactions}
              formatCurrency={formatCurrency}
              depositModal={depositModal}
              setDepositModal={setDepositModal}
            />
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ArrowUpOutlined /> Rút tiền
              </span>
            } 
            key="3"
          >
            <WithdrawalRequest 
              withdrawalRequests={withdrawalRequests}
              setWithdrawalRequests={setWithdrawalRequests}
              advertiserBalance={advertiserBalance}
              setAdvertiserBalance={setAdvertiserBalance}
              userBankAccounts={userBankAccounts}
              addTransaction={addTransaction}
              formatCurrency={formatCurrency}
              withdrawalModal={withdrawalModal}
              setWithdrawalModal={setWithdrawalModal}
              bankAccountModal={bankAccountModal}
              setBankAccountModal={setBankAccountModal}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <LineChartOutlined /> Chi tiêu
              </span>
            } 
            key="4"
          >
            <CampaignSpendTracking 
              campaignSpend={campaignSpend}
              formatCurrency={formatCurrency}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BankOutlined /> Tài khoản ngân hàng
              </span>
            } 
            key="5"
          >
            <BankAccountManagement 
              userBankAccounts={userBankAccounts}
              setUserBankAccounts={setUserBankAccounts}
              bankAccountModal={bankAccountModal}
              setBankAccountModal={setBankAccountModal}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}