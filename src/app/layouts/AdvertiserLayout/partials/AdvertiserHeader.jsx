"use client";

import React from "react";

export default function AdvertiserHeader() {
  return (
    <div className="fixed top-0 left-64 w-[calc(100%-16rem)] flex items-center justify-end bg-white px-6 py-4 shadow-md z-50">
      {/* User Profile */}
      <div className="flex items-center gap-4 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div className="text-gray-700">
          <p className="font-semibold">Advertiser</p>
          <p className="text-sm text-gray-500">Manager</p>
        </div>
      </div>
    </div>
  );
}
