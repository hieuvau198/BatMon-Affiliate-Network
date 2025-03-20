"use client";

import React, { useState } from "react";
import { BellOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Avatar } from "antd";

export default function AdvertiserHeader({ toggleSidebar, collapsed }) {
  const [notifications, setNotifications] = useState(3);

  const userMenuItems = [
    {
      key: '1',
      label: 'Hồ sơ cá nhân',
    },
    {
      key: '2',
      label: 'Cài đặt',
    },
    {
      key: '3',
      label: 'Trợ giúp',
    },
    {
      key: '4',
      type: 'divider',
    },
    {
      key: '5',
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  return (
    <div className={`fixed top-0 ${collapsed ? 'left-20' : 'left-72'} right-0 transition-all duration-300 bg-white backdrop-blur-sm bg-opacity-80 px-6 py-3 shadow-sm z-40 flex items-center justify-between`}>
      {/* Left section with menu toggle and page title */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-500 hover:text-blue-600 focus:outline-none"
        >
          {collapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : <MenuFoldOutlined style={{ fontSize: '20px' }} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Advertiser</h1>
      </div>
      
      {/* Right section with notifications and user profile */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="py-1.5 px-4 pl-10 rounded-full bg-gray-100 border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-sm w-48"
          />
          <span className="absolute left-3 top-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        
        {/* Notifications */}
        <Badge count={notifications} size="small">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <BellOutlined style={{ fontSize: '18px' }} />
          </button>
        </Badge>
        
        {/* Settings */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <SettingOutlined style={{ fontSize: '18px' }} />
        </button>
        
        {/* User Profile */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div className="flex items-center gap-3 cursor-pointer ml-2 group hover:bg-gray-50 rounded-full p-1 pr-4 transition-all">
            <Avatar 
              size={38} 
              src="/api/placeholder/38/38" 
              className="border-2 border-white shadow-sm" 
            />
            <div className="text-gray-700 hidden md:block">
              <p className="font-medium text-sm leading-tight">Nguyễn Văn A</p>
              <p className="text-xs text-gray-500 leading-tight">Quản lý chiến dịch</p>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}