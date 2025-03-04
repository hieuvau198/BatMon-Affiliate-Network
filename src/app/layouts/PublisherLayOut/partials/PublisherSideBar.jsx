"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  AimOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  WalletOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { TbLogout } from "react-icons/tb";
import logOut from "../../../modules/Logout";

const PublisherSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: "overview", label: "Tổng quan", icon: <BarChartOutlined />, link: "/publisher/overview" },
    { id: "campaigns", label: "Chiến dịch", icon: <AimOutlined />, link: "/publisher/campaigns" },
    { id: "reports", label: "Báo cáo", icon: <ClockCircleOutlined />, link: "/publisher/reports" },
    { id: "tools", label: "Tool", icon: <ToolOutlined />, link: "/publisher/tools" },
    { id: "payments", label: "Thanh toán", icon: <WalletOutlined />, link: "/publisher/payments" },
    { id: "violations", label: "Vi Phạm", icon: <WarningOutlined />, link: "/publisher/violations" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen lg:w-64 md:w-56 bg-white shadow-md z-50 flex flex-col items-center">
      {/* Logo */}
      <div className="mt-4">
        <img
          src="https://cms.imgworlds.com/assets/473cfc50-242c-46f8-80be-68b867e28919.jpg?key=home-gallery"
          alt="Logo"
          className="w-20 h-20 rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className="mt-9 w-4/6">
        <ul className="space-y-2 -ml-1 text-gray-600">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.link);

            return (
              <li
                key={item.id}
                className={`group flex items-center justify-center gap-3 px-6 py-3 cursor-pointer rounded-lg 
                  ${isActive ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"}
                `}
              >
                <Link to={item.link} className="flex items-center gap-3 w-full">
                  {item.icon}
                  <span className="text-lg font-semibold">{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Logout */}
          <li className="group hover:bg-gray-200 rounded-lg">
            <button
              onClick={logOut}
              className="flex items-center gap-3 px-6 py-3 w-full text-red-500 hover:text-red-600 cursor-pointer"
            >
              <TbLogout />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PublisherSidebar;
