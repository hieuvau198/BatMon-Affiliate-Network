import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Thêm Outlet để hiển thị nội dung con
import Loading from "../components/Loading";
import Login from "../components/Login/Login"; // Import Login
import Register from "../components/Register/Register";
import AdminLayout from "../layouts/AdminLayout";
import AdvertiserLayout from "../layouts/AdvertiserLayout";
import PublisherLayout from "../layouts/PublisherLayOut";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AboutUs from "../pages/About Us/AboutUs";
import CampaignAdminList from "../pages/Admin/CampaignAdminList/CampaignAdminList";
import CampaignApproval from "../pages/Admin/CampaignApproval/AdminCampaignApproval";
import CompliancePolicy from "../pages/Admin/CompliancePolicy/CompliancePolicy";
import FraudDashboard from "../pages/Admin/FraudDashboard/FraudDashboard";
import FraudAdjustmentForm from "../pages/Admin/FraudDashboard/partials/FraudAdjustmentForm";
import FraudAdjustmentsList from "../pages/Admin/FraudDashboard/partials/FraudAdjustmentsList";
import FraudCaseDetail from "../pages/Admin/FraudDashboard/partials/FraudCaseDetail";
import FraudCasesList from "../pages/Admin/FraudDashboard/partials/FraudCasesList";
import FraudDetectionSettings from "../pages/Admin/FraudDashboard/partials/FraudDetectionSettings";
import FraudReportDetail from "../pages/Admin/FraudDashboard/partials/FraudReportDetail";
import FraudReportsList from "../pages/Admin/FraudDashboard/partials/FraudReportsList";
import TaxDashboard from "../pages/Admin/TaxDashboard/TaxDashboard";
import TaxPayment from "../pages/Admin/TaxPayment/TaxPayment";
import TaxReporting from "../pages/Admin/TaxReporting/TaxReporting";
import CampaignAdverList from "../pages/Advertiser/Campaign/CampaignAdList";
import CampaignAdverDetail from "../pages/Advertiser/Campaign/partials/CampaignAdDetail";
import CampaignAdverCreate from "../pages/Advertiser/Campaign/partials/CampaignCreating";
import CampaignPerformance from "../pages/Advertiser/Campaign/partials/CampaignPerformance";
import CampaignPolicy from "../pages/Advertiser/Campaign/partials/CampaignPolicy";
import AdverDashboard from "../pages/Advertiser/Dashboard/AdvertiserDashBoard";
import AdverFraudInves from "../pages/Advertiser/Dashboard/partials/FraudInvestigation";
import AdverFraudInvesCaseDetails from "../pages/Advertiser/Dashboard/partials/invespartials/InvesCaseDetails";
import AdverFraudRule from "../pages/Advertiser/Dashboard/partials/FraudRule";
import PublisherManagement from "../pages/Advertiser/Dashboard/partials/PubManagement";
import PubMaDetail from "../pages/Advertiser/Dashboard/partials/pubpartials/PubMaDetail";
import AdverWallet from "../pages/Advertiser/Dashboard/partials/Wallet";
import Home from "../pages/Home";
import CampaignList from "../pages/Publisher/Campaign/CampaignList";
import CampaignDetail from "../pages/Publisher/Campaign/partials/CampaignDetail";
import FraudTracking from "../pages/Publisher/FraudTracking/FraudTracking";
import PublisherHome from "../pages/Publisher/PublisherHome/PublisherHome";
import ReportLostOrder from "../pages/Publisher/ReportLostOrder/Report";
const PageNotFound = lazy(() => import("../layouts/PageNotFound"));
const ServerError = lazy(() => import("../layouts/ServerError/ServerError"));
const Maintenance = lazy(() => import("../layouts/Maintenance/Maintenance"));

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="AdminCampaignApproval" element={<CampaignApproval />} /> 
          <Route path="CampaignAdminList" element={<CampaignAdminList />} />
          <Route path="CompliancePolicy" element={<CompliancePolicy />} />
          <Route path="TaxDashboard" element={<TaxDashboard />} />
          <Route path="TaxReporting" element={<TaxReporting />} />
          <Route path="TaxPayment" element={<TaxPayment />} />
          <Route path="FraudDashboard" element={<FraudDashboard />} />
          <Route path="FraudDashboard/FraudCasesList" element={<FraudCasesList />} />
          <Route path="FraudDashboard/FraudCaseDetail" element={<FraudCaseDetail />} />
          <Route path="FraudDashboard/FraudReportsList" element={<FraudReportsList />} />
          <Route path="FraudDashboard/FraudReportDetail" element={<FraudReportDetail />} />
          <Route path="FraudDashboard/FraudAdjustmentForm" element={<FraudAdjustmentForm />} />
          <Route path="FraudDashboard/FraudAdjustmentsList" element={<FraudAdjustmentsList />} />
          <Route path="FraudDashboard/FraudDetectionSettings" element={<FraudDetectionSettings />} />

        </Route>

        <Route path="/publisher" element={<PublisherLayout />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="dashboard/wallet" element={<Wallet />} /> */}
          <Route path="publisherhome" element={<PublisherHome />} />
          <Route path="campaignlist" element={<CampaignList />} />
          <Route path="report" element={<ReportLostOrder />} />
          <Route path="fraudtracking" element={<FraudTracking />}/>
        </Route>

        <Route path="campaigndetail/:campaignId" element={<CampaignDetail />} />

        <Route path="/advertiser" element={<AdvertiserLayout />}>
          <Route path="dashboard" element={<AdverDashboard />} />
          <Route path="campaignList" element={<CampaignAdverList />} />
          <Route path="campaignList/campaigndetail/:campaignId" element={<CampaignAdverDetail />} />
          <Route path="campaignList/campaigndetail/:campaignId/CampaignPolicy" element={<CampaignPolicy />} />
          <Route path="campaignList/campaigndetail/:campaignId/CampaignPerformance" element={<CampaignPerformance />} />
          <Route path="campaignList/CampaignCreating" element={<CampaignAdverCreate />} />
          <Route path="wallet" element={<AdverWallet />} />
          <Route path="fraud-rule" element={<AdverFraudRule />} />
          <Route path="publisher-management" element={<PublisherManagement />} />
          <Route path="publisher-management/publisherdetail/:publisherId" element={<PubMaDetail />} />
          <Route path="fraud-investigation" element={<AdverFraudInves />} />
          <Route path="fraud-investigation/:fraudId" element={<AdverFraudInvesCaseDetails />} />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/500"
          element={
            <Suspense fallback={<Loading />}>
              <ServerError />
            </Suspense>
          }
        />
        <Route
          path="/maintenance"
          element={
            <Suspense fallback={<Loading />}>
              <Maintenance />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}