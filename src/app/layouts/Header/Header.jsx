"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Space,
  Divider,
  Avatar,
  Dropdown,
} from "antd";
import {
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  TeamOutlined,
  ShareAltOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import logOut from "../../components/Logout";
import logo from "../../assets/img/download (1).png";
const { Header } = Layout;

export default function CustomHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      key: "publisher",
      label: <Link to="/publisher" className="text-white hover:text-orange-300">Publisher</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "advertiser",
      label: <Link to="/advertiser/dashboard" className="text-white hover:text-orange-300">Advertiser</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "share",
      label: <Link to="/share" className="text-white hover:text-orange-300">Góc Chia sẻ</Link>,
      icon: <ShareAltOutlined />,
    },
    {
      key: "affihub",
      label: <Link to="/affihub" className="text-white hover:text-orange-300">Về AffiHub</Link>,
      icon: <InfoCircleOutlined />,
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: <Link to="/profile" className="text-gray-700 hover:text-gray-900">Tài khoản</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: <Link to="/settings" className="text-gray-700 hover:text-gray-900">Cài đặt</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: () => logOut(),
    },
  ];

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoClick = () => {
    navigate("/"); // Điều hướng về trang Home khi nhấn logo
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        padding: "0 50px",
        background: scrolled
          ? "linear-gradient(to right, #4a5568, #d97706)"
          : "linear-gradient(to right, #2d3748, #f97316)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
        transition: "all 0.3s ease",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <button onClick={handleLogoClick} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
          <img
            src={logo}
            alt="AffiHub Logo"
            style={{ height: "160px", marginRight: "64px" }}
          />
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: "flex", alignItems: "center" }}>
        <Menu
          mode="horizontal"
          style={{
            background: "transparent",
            borderBottom: "none",
            minWidth: "400px",
          }}
          className="desktop-nav"
          items={menuItems}
        />

        <Space style={{ marginLeft: "24px" }}>
          {isLoggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Avatar
                style={{
                  backgroundColor: "#f97316",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          ) : (
            <>
              <Button
                type="primary"
                onClick={handleRegisterClick}
                style={{
                  background: "#2563eb",
                  borderColor: "#2563eb",
                  fontWeight: "semibold",
                }}
                target="_top"
              >
                Đăng Ký
              </Button>
              <Button
                type="default"
                onClick={handleLoginClick}
                style={{
                  borderColor: "#2563eb",
                  color: "#2563eb",
                  fontWeight: "semibold",
                }}
                target="_top"
              >
                Đăng Nhập
              </Button>
            </>
          )}
        </Space>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        style={{ background: "#f5f5f5" }}
      >
        <Menu
          mode="vertical"
          style={{ border: "none", background: "transparent" }}
          items={menuItems}
        />

        <Divider />

        {isLoggedIn ? (
          <Menu
            mode="vertical"
            style={{ border: "none", background: "transparent" }}
            items={userMenuItems}
          />
        ) : (
          <Space direction="vertical" style={{ width: "100%", marginTop: "16px" }}>
            <Button
              type="primary"
              onClick={handleRegisterClick}
              style={{ width: "100%", background: "#2563eb", borderColor: "#2563eb", fontWeight: "semibold" }}
            >
              Đăng Ký
            </Button>
            <Button
              type="default"
              onClick={handleLoginClick}
              style={{ width: "100%", borderColor: "#2563eb", color: "#2563eb", fontWeight: "semibold" }}
            >
              Đăng Nhập
            </Button>
          </Space>
        )}
      </Drawer>
    </Header>
  );
}