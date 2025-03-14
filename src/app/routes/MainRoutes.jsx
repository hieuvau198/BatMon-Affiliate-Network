import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"; // Thêm Outlet để hiển thị nội dung con
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AboutUs from "../pages/About Us/AboutUs";
import Login from "../modules/Login/Login"; // Import Login
import Register from "../modules/Register/Register";
import PublisherLayout from "../layouts/PublisherLayOut";
import AdvertiserLayout from "../layouts/AdvertiserLayout";
import AdverDashboard from "../pages/Advertiser/Dashboard/AdvertiserDashBoard";
import Home from "../pages/Home";
import Loading from "../components/Loading";
import CampaignList from "../pages/Publisher/Campaign/CampaignList";
import CampaignAdverList from "../pages/Advertiser/Campaign/CampaignAdList";
import AdverWallet from "../pages/Advertiser/Dashboard/partials/Wallet";
import AdverFraudRule from "../pages/Advertiser/Dashboard/partials/FraudRule";
import AdverOrderManagement from "../pages/Advertiser/Dashboard/partials/OrderManagement";
import PublisherManagement from "../pages/Advertiser/Dashboard/partials/PubManagement";
import PubMaDetail from "../pages/Advertiser/Dashboard/partials/pubpartials/PubMaDetail";
import AdverFraudInves from "../pages/Advertiser/Dashboard/partials/FraudInvestigation";
import CampaignAdverDetail from "../pages/Advertiser/Campaign/partials/CampaignAdDetail";
import CampaignAdverCreate from "../pages/Advertiser/Campaign/partials/CampaignCreating";
import CampaignDetail from "../pages/Publisher/Campaign/partials/CampaignDetail";
import ReportLostOrder from "../pages/Publisher/ReportLostOrder/Report";
import FraudTracking from "../pages/Publisher/FraudTracking/FraudTracking";
import Dashboard from "../pages/Publisher/Dashboard/Dashboard";
import Wallet from "../pages/Publisher/Dashboard/partials/Wallet";
import CampaignApproval from "../pages/Admin/CampaignApproval/AdminCampaignApproval";
import CampaignAdminList from "../pages/Admin/CampaignAdminList/CampaignAdminList";
import TaxReporting from "../pages/Admin/TaxReporting/TaxReporting";
import CompliancePolicy from "../pages/Admin/CompliancePolicy/CompliancePolicy";
import TaxDashboard from "../pages/Admin/TaxDashboard/TaxDashboard";
import TaxPayment from "../pages/Admin/TaxPayment/TaxPayment";
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

        </Route>

        <Route path="/publisher" element={<PublisherLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/wallet" element={<Wallet />} />
          <Route path="campaignlist" element={<CampaignList />} />
          <Route path="campaignlist/campaigndetail" element={<CampaignDetail />} />
          <Route path="report" element={<ReportLostOrder />} />
          <Route path="fraudtracking" element={<FraudTracking />}/>
        </Route>


        <Route path="/advertiser" element={<AdvertiserLayout />}>
          <Route path="dashboard" element={<AdverDashboard />} />
          <Route path="campaignList" element={<CampaignAdverList />} />
          <Route path="campaignList/campaigndetail/:campaignId" element={<CampaignAdverDetail />} />
          <Route path="campaignList/CampaignCreating" element={<CampaignAdverCreate />} />
          <Route path="wallet" element={<AdverWallet />} />
          <Route path="fraud-rule" element={<AdverFraudRule />} />
          <Route path="order-management" element={<AdverOrderManagement />} />
          <Route path="publisher-management" element={<PublisherManagement />} />
          <Route path="publisher-management/publisherdetail/:publisherId" element={<PubMaDetail />} />
          <Route path="fraud-investigation" element={<AdverFraudInves />} />
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