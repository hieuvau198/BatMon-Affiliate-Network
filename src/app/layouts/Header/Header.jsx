import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar, Button, Input, Card } from "antd";
import { UserOutlined, SearchOutlined, StarFilled, EyeOutlined } from "@ant-design/icons";
import logOut from "../../modules/Logout";

const categories = [
  { title: "Social Business", icon: "🧑‍🤝‍🧑", border: "border-blue-400" },
  { title: "Price Comparison", icon: "⚖️", border: "border-yellow-400" },
  { title: "Multivendor Store", icon: "🏪", border: "border-red-400" },
  { title: "Product Review", icon: "⭐", border: "border-blue-400" },
];

const products = [
  {
    id: 1,
    name: "Yamaha Speed Star Mod Class",
    price: "$899.00-$999.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/yv1-f-4.png",
    rating: 4,
  },
  {
    id: 2,
    name: "Toyota Prius Speed Fast",
    price: "$899.00-$999.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/tc22-f-4.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Asus Max Twenty Six Laptop",
    price: "$499.00-$699.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/ac220-f-4.png",
    rating: 3,
  },
  {
    id: 4,
    name: "Samsung Galaxy Mini Prime",
    price: "$379.00-$399.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/j4-f-4-2.png",
    rating: 2,
  },
];

const aliExpressProducts = [
  {
    id: 1,
    name: "Asus Slim Extreme Laptop",
    price: "$450.00-$699.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/ac221-f-4.png",
    rating: 3,
  },
  {
    id: 2,
    name: "Samsung Galaxy Xpro Classic",
    price: "$259.00-$299.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/j5-f-4.png",
    rating: 3,
  },
  {
    id: 3,
    name: "Samsung Grand Prime Plus",
    price: "$299.00-$399.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/j6-f-4.png",
    rating: 3,
  },
  {
    id: 4,
    name: "Samsung Grand Prime Mini",
    price: "$250.00-$299.00",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/2019/05/mobile-feature-4.png",
    rating: 3,
  },
];

const ebayProducts = [
  {
    id: 1,
    name: "Asus Max Twenty Six Laptop",
    price: "$499.00-$699.00",
    img: "https://your-image-url.com/asus-max-laptop.png",
    rating: 3,
  },
  {
    id: 2,
    name: "Asus Slim Extreme Laptop",
    price: "$450.00-$699.00",
    img: "https://your-image-url.com/asus-slim-laptop.png",
    rating: 3,
  },
  {
    id: 3,
    name: "Samsung Galaxy Xpro Classic",
    price: "$259.00-$299.00",
    img: "https://your-image-url.com/samsung-xpro.png",
    rating: 3,
  },
  {
    id: 4,
    name: "Samsung Grand Prime Plus",
    price: "$299.00-$399.00",
    img: "https://your-image-url.com/grand-prime-plus.png",
    rating: 3,
  },
];

const aliexpressDeals = [
  {
    id: 1,
    title: "DISCOVER PRO",
    description: "Ultimate Multitasking",
    img: "https://themeim.com/wp/blurb/wp-content/uploads/elementor/thumbs/slider1-qzw653d7qv0lbua9t3hn7q5jmucn2fsb12kbd9lsqw.jpg",
    rating: 4.5,
    user: {
      name: "ThemelM",
      role: "Team Leader",
      review: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
    },
  },
  {
    id: 2,
    title: "AliExpress Exclusive Video",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];


export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = [
    { key: "profile", label: <Link to="/profile">Profile</Link> },
    { key: "schedule", label: <Link to="/schedule">Schedule</Link> },
    { key: "logout", danger: true, label: <span onClick={logOut}>Logout</span> },
  ];

  const navItems = [
    { key: "home", label: "HOME", link: "/home" },
    { key: "market", label: "MARKET COMPARE", link: "/market-compare" },
    { key: "reviews", label: "REVIEWS", link: "/reviews" },
    { key: "coupons", label: "COUPONS", link: "/coupons" },
    { key: "explore", label: "EXPLORE", link: "/explore" },
  ];

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="flex items-center text-xl font-bold text-orange-500">
            <span className="text-2xl">▶</span> Blurb
          </Link>
          <div className="relative w-1/3">
            <Input placeholder="Search..." className="px-4 py-2 rounded-lg border-gray-300" suffix={<SearchOutlined className="text-gray-500" />} />
          </div>
          <div>
            {isLoggedIn ? (
              <Dropdown menu={{ items: menuItems }}>
                <Avatar size={40} icon={<UserOutlined />} className="cursor-pointer" />
              </Dropdown>
            ) : (
              <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">Login</Link>
            )}
          </div>
        </div>
        <nav className="mt-4 flex justify-center space-x-6 text-gray-600 font-medium">
          {navItems.map((item) => (
            <Link key={item.key} to={item.link} className="hover:text-orange-500">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
