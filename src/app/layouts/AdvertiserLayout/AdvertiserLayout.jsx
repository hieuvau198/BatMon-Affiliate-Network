"use client";

import { Outlet, useNavigate } from "react-router-dom";
import AdvertiserHeader from "./partials/AdvertiserHeader";
import AdvertiserSidebar from "./partials/AdvertiserSideBar";
import { useState } from "react";

export default function AdvertiserLayout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Sidebar */}
      <AdvertiserSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        {/* Header */}
        <AdvertiserHeader toggleSidebar={toggleSidebar} collapsed={sidebarCollapsed} isHeaderOnly/>

        {/* Content Area */}
        <div className="mt-20 p-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}