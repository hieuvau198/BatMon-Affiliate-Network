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


export default function Home() {
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
    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-24 text-center">
        <h1 className="text-5xl font-bold">The Best <span className="text-gray-200">Comparison</span></h1>
        <p className="mt-4 text-lg">Multivendor Store</p>
        <Button type="primary" className="mt-6 bg-white text-orange-500 px-6 py-3 rounded-lg">Go To Store</Button>
      </section>

      {/* Category Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {categories.map((category, index) => (
            <div key={index} className={`p-6 text-center bg-white shadow-lg border-t-4 ${category.border} rounded-lg`}>
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-lg font-semibold mt-2">{category.title}</h3>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-red-500">Amazon</span> Top Deals
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt={product.name} src={product.img} className="h-48 object-cover" />}
                className="shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array(product.rating).fill(0).map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <EyeOutlined className="text-gray-500 text-lg" />
                </div>
                <h4 className="mt-2 font-semibold text-gray-700">{product.name}</h4>
                <p className="text-red-500 font-bold">{product.price}</p>
                <div className="mt-2 text-gray-500 text-sm flex items-center">
                  <span className="mr-2">👤 Admin</span> ⚖️
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ali Express Section */}
        <div className="container mx-auto px-6 mt-10">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-red-500">Ali Express</span> Top Deals
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aliExpressProducts.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt={product.name} src={product.img} className="h-48 object-cover" />}
                className="shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array(product.rating).fill(0).map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <EyeOutlined className="text-gray-500 text-lg" />
                </div>
                <h4 className="mt-2 font-semibold text-gray-700">{product.name}</h4>
                <p className="text-red-500 font-bold">{product.price}</p>
                <div className="mt-2 text-gray-500 text-sm flex items-center">
                  <span className="mr-2">👤 Admin</span> ⚖️
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ebay Section */}
        <div className="container mx-auto px-6 mt-10">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-red-500">Ebay</span> Top Deals
          </h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Design, refined performance and Windows 10 built in, it’s the smart choice for your business.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aliExpressProducts.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt={product.name} src={product.img} className="h-48 object-cover" />}
                className="shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array(product.rating).fill(0).map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <EyeOutlined className="text-gray-500 text-lg" />
                </div>
                <h4 className="mt-2 font-semibold text-gray-700">{product.name}</h4>
                <p className="text-red-500 font-bold">{product.price}</p>
                <div className="mt-2 text-gray-500 text-sm flex items-center">
                  <span className="mr-2">👤 Admin</span> ⚖️
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* AliExpress Section */}
        <div className="p-6 bg-gray-100">
          <h2 className="text-center text-2xl font-bold text-red-500">AliExpress <span className="text-gray-800">Top Deals</span></h2>
          <p className="text-center text-gray-600 mb-4">Affiliate, comparison performance and multivendor in, it’s the smart choice for clients.</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Product Banner */}
            <div className="bg-white p-4 rounded-lg shadow">
              <img src={aliexpressDeals[0].img} alt={aliexpressDeals[0].title} className="w-full rounded-lg" />
              <h3 className="text-lg font-semibold mt-2">{aliexpressDeals[0].title}</h3>
              <p className="text-gray-500">{aliexpressDeals[0].description}</p>
              <p className="text-sm mt-2 text-gray-700">⭐ {aliexpressDeals[0].rating}</p>
              <div className="mt-4 flex items-center">
                <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
                <div className="ml-2">
                  <p className="font-semibold">{aliexpressDeals[0].user.name}</p>
                  <p className="text-gray-500 text-sm">{aliexpressDeals[0].user.role}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{aliexpressDeals[0].user.review}</p>
            </div>
            {/* Video Section */}
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
              {aliexpressDeals[1].video ? (
                <iframe
                  className="w-full h-[250px] rounded-lg"
                  src={aliexpressDeals[1].video}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="AliExpress Video"
                ></iframe>
              ) : (
                <div className="text-center text-gray-500">
                  <p>This video is currently unavailable.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
