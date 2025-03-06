import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"; // Thêm Outlet để hiển thị nội dung con
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AboutUs from "../pages/About Us/AboutUs";
import Login from "../modules/Login/Login"; // Import Login
import Register from "../modules/Register/Register";
import PublisherLayout from "../layouts/PublisherLayOut";
import AdvertiserLayout from "../layouts/AdvertiserLayout";
import AdvertiserDashboard from "../pages/Advertiser/Dashboard/AdvertiserDashBoard";
import Home from "../pages/Home";
import Loading from "../components/Loading";
import CampaignList from "../pages/Publisher/Campaign/CampaignList";
import CampaignDetail from "../pages/Publisher/Campaign/partials/CampaignDetail";
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
        </Route>

        <Route path="/publisher" element={<PublisherLayout />}>
          <Route path="campaignlist" element={<CampaignList />} />
          <Route path="campaignlist/campaigndetail" element={<CampaignDetail />} />
        </Route>


        <Route path="/advertiser" element={<AdvertiserLayout />}>
          <Route path="dashboard" element={<AdvertiserDashboard />} />

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