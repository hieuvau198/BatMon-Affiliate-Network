"use client";

import { Outlet, useNavigate } from "react-router-dom";
import PublisherHeader from "./partials/PublisherHeader";
import PublisherSidebar from "./partials/PublisherSideBar";

export default function PublisherLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <PublisherSidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <PublisherHeader />

        {/* Content Area */}
        <div className="mt-[77px] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
