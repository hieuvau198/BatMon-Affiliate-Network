"use client";

import { BellOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import logo from "../../../assets/img/download (1).png"; // Đảm bảo đường dẫn logo đúng

export default function PublisherHeader({ activeMenu }) {
    return (
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] flex items-center justify-between bg-white px-6 py-4 shadow-md z-50">
            {/* Tiêu đề động theo activeMenu */}
            <h1 className="text-2xl font-semibold text-gray-800">{activeMenu}</h1>

            {/* Phần bên phải: Icon Thông báo + Avatar User */}
            <div className="flex items-center gap-6">
                {/* Nút thông báo */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                    <BellOutlined className="text-xl text-gray-600" />
                </button>

                {/* Thông tin User */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="text-gray-600">
                        <p className="font-semibold">Hoàng</p>
                        <p className="text-sm">Publisher</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
