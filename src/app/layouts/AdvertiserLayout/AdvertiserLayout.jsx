"use client";

import { Outlet, useNavigate } from "react-router-dom";
import AdvertiserHeader from "./partials/AdvertiserHeader";
import AdvertiserSidebar from "./partials/AdvertiserSideBar";

export default function AdvertiserLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdvertiserSidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <AdvertiserHeader />

        {/* Content Area */}
        <div className="mt-[77px] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
