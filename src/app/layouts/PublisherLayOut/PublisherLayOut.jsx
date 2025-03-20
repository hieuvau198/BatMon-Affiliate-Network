import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import PublisherHeader from "../PublisherLayOut/partials/PublisherHeader";
import PublisherFooter from "../PublisherLayOut/partials/PublisherFooter";

export default function PublisherLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}

      {/* Header */}
      <PublisherHeader />

      {/* Content Section with Outlet */}
      <div className="container mx-auto px-4 py-8">
        {/* Outlet for rendering nested routes */}
        <Outlet />
      </div>

      {/* Footer */}
      <PublisherFooter />
    </div>
  );
}
