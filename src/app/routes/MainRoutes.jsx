import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"; // Thêm Outlet để hiển thị nội dung con
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";
import Home from "../pages/Home";
import Loading from "../components/Loading";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Employee from "../pages/Admin/Employee/Employee";
import Booking from "../pages/Admin/Booking/Booking";
import AboutUs from "../pages/About Us/AboutUs";
import Login from "../components/Login/Login"; // Import Login
import Register from "../components/Register/Register";

const PageNotFound = lazy(() => import("../layouts/PageNotFound"));
const ServerError = lazy(() => import("../layouts/ServerError/ServerError"));
const Maintenance = lazy(() => import("../layouts/Maintenance/Maintenance"));

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho UserLayout */}
        <Route
          element={
            <UserLayout>            
              <Outlet /> 
            </UserLayout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Route>

        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="booking" element={<Booking />} />
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