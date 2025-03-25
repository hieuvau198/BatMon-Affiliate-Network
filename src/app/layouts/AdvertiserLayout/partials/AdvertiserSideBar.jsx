"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  SecurityScanOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import logOut from "../../../components/Logout";

const AdvertiserSidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      label: "Tổng quan", 
      icon: <DashboardOutlined />, 
      link: "/advertiser/dashboard" 
    },
    { 
      label: "Chiến dịch", 
      icon: <BarChartOutlined />, 
      link: "/advertiser/campaignList" 
    },
    { 
      label: "Quản lý đối tác", 
      icon: <TeamOutlined />, 
      link: "/advertiser/publisher-management" 
    },
    { 
      label: "Quy tắc chống gian lận", 
      icon: <SecurityScanOutlined />, 
      link: "/advertiser/fraud-rule" 
    },
    { 
      label: "Kiểm tra gian lận", 
      icon: <SearchOutlined />, 
      link: "/advertiser/fraud-investigation" 
    },
    { 
      label: "Quản lý đơn hàng", 
      icon: <ShoppingCartOutlined />, 
      link: "/advertiser/order-management" 
    },
    { 
      label: "Báo cáo", 
      icon: <FileTextOutlined />, 
      link: "/advertiser/reports" 
    },
    { 
      label: "Ví của tôi", 
      icon: <DollarOutlined />, 
      link: "/advertiser/wallet" 
    },
    { 
      label: "Cài đặt", 
      icon: <SettingOutlined />, 
      link: "/advertiser/settings" 
    },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} flex flex-col`}>
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} py-6 ${collapsed ? 'px-2' : 'px-6'} border-b`}>
        <img
          src="/api/placeholder/40/40"
          alt="Logo"
          className={`${collapsed ? 'w-12 h-12' : 'w-10 h-10 mr-3'} rounded-lg transition-all duration-300`}
        />
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">AD PLATFORM</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className={`mt-6 flex-1 ${collapsed ? 'px-2' : 'px-4'}`}>
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            
            return (
              <Tooltip 
                key={index} 
                title={collapsed ? item.label : ''} 
                placement="right"
                mouseEnterDelay={0.5}
              >
                <li className={`relative ${isActive ? 'bg-blue-50' : ''} ${collapsed ? 'justify-center' : ''} group rounded-lg`}>
                  <Link 
                    to={item.link} 
                    className={`flex items-center ${collapsed ? 'justify-center' : ''} py-3 px-4 rounded-lg ${isActive ? 'text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-600 transition-all`}
                  >
                    <span className={`${collapsed ? 'text-lg' : 'text-base'}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    )}
                    {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full"></span>}
                  </Link>
                </li>
              </Tooltip>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className={`mt-auto px-4 pb-8 ${collapsed ? 'flex justify-center' : ''}`}>
        <Tooltip title={collapsed ? "Đăng xuất" : ''} placement="right">
          <button 
            onClick={() => logOut()} 
            className={`flex items-center ${collapsed ? 'justify-center w-12 h-12' : ''} text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all px-4 py-3 w-full`}
          >
            <LogoutOutlined />
            {!collapsed && <span className="ml-3 text-sm font-medium">Đăng xuất</span>}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default AdvertiserSidebar;