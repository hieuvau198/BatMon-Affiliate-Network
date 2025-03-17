"use client"

import {
  BellOutlined,
  CreditCardOutlined,
  GlobalOutlined,
  SearchOutlined,
  UserOutlined,
  LineChartOutlined,
  TrophyOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons"
import { Avatar, Badge, Dropdown, Input, Menu, Tooltip, Table, Progress } from "antd"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export default function PublisherLayout() {
  const profileMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Your Profile",
        },
        {
          key: "2",
          label: "Settings",
        },
        {
          key: "3",
          label: "Sign out",
        },
      ]}
    />
  )

  const campaigns = [
    {
      key: "1",
      name: "Mobile Game Campaign",
      category: "Gaming",
      conversionRate: "5.1%",
      revenue: "$1,200",
      progress: 70,
    },
    {
      key: "2",
      name: "Finance App Campaign",
      category: "Finance",
      conversionRate: "4.7%",
      revenue: "$2,500",
      progress: 85,
    },
    {
      key: "3",
      name: "E-commerce Campaign",
      category: "Shopping",
      conversionRate: "3.2%",
      revenue: "$1,800",
      progress: 60,
    },
  ]

  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Conversion Rate",
      dataIndex: "conversionRate",
      key: "conversionRate",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percent={progress} status="active" />,
    },
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center"
            >
              <GlobalOutlined className="text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-bold text-gray-900"
            >
              AccessMedia
            </motion.h1>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search..."
                className="w-64 hidden md:block"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Badge dot>
                <Tooltip title="Notifications">
                  <BellOutlined className="text-xl text-gray-500 cursor-pointer hover:text-blue-500" />
                </Tooltip>
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Dropdown overlay={profileMenu} trigger={["click"]}>
                <a
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center space-x-2"
                >
                  <Avatar
                    style={{ backgroundColor: "#1890ff" }}
                    icon={<UserOutlined />}
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                    John Doe
                  </span>
                </a>
              </Dropdown>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-500/50 flex flex-col items-start justify-center px-8 md:px-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Boost Your Online Earnings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/90 max-w-xl text-lg"
          >
            Unlock the potential of your website with our powerful affiliate
            marketing platform. Join thousands of publishers and start earning
            today!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-blue-100 transition-colors"
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Info Boxes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                  Access Affiliate
                </h2>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <GlobalOutlined className="text-blue-500" />
                </div>
              </div>
              <p className="text-gray-600">
                Monetize your content with our diverse range of affiliate offers.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Conversion Rate</span>
                  <span className="text-sm font-medium text-gray-900">3.2%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Campaigns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Featured Campaigns</h2>
          <Table dataSource={campaigns} columns={columns} pagination={false} />
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Your Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={fadeIn}
                className="bg-blue-50 p-6 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800">Total Earnings</h3>
                  <LineChartOutlined className="text-blue-500 text-2xl" />
                </div>
                <p className="text-3xl font-bold text-blue-800">$12,345</p>
                <p className="text-sm text-blue-600">+15% from last month</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Top Publishers</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <TrophyOutlined className="text-yellow-500 text-2xl" />
                  <span className="text-lg font-medium">Publisher {item}</span>
                </div>
                <span className="text-lg font-bold">${10000 - item * 1000}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-6 rounded-lg">
                <FileTextOutlined className="text-blue-500 text-2xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">How to Maximize Your Earnings</h3>
                <p className="text-gray-600">Learn the best strategies to boost your affiliate revenue.</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 bg-gray-50 rounded-lg">
                <QuestionCircleOutlined className="text-blue-500 text-2xl mb-2" />
                <h3 className="text-lg font-semibold">How do I get started?</h3>
                <p className="text-gray-600">Sign up, choose a campaign, and start promoting!</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AccessMedia</h3>
              <p className="text-gray-600">Empowering publishers to earn more.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Campaigns</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">Email: support@accessmedia.com</p>
              <p className="text-gray-600">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}