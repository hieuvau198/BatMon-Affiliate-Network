"use client"

import {
  BellOutlined,
  // GlobalOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Avatar, Badge, Dropdown, Input, Menu, Tooltip } from "antd"
import { motion } from "framer-motion"
import logout from "../../../components/Logout"

const PublisherHeader = () => {
  const profileMenu = (
    <Menu
      items={[
        { key: "1", label: "Your Profile" },
        { key: "2", label: "Settings" },
        {
          key: "3",
          label: "Logout",
          onClick: () => logout(),
          style: { color: '#F97316' }
        },
      ]}
    />
  )

  return (
    <header className="bg-gradient-to-r from-[#4B2E1E] to-[#8B5A2B] shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section: Logo and Name */}
        <div className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center"
          >
            {/* <GlobalOutlined className="text-white" /> */}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-bold text-white"
          >
            AffiHub
          </motion.h1>
        </div>

        {/* Middle Section: Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 mx-4 max-w-2xl"
        >
          <Input
            prefix={<SearchOutlined className="text-gray-500 text-lg flex items-center" />}
            placeholder="Search..."
            className="w-full h-10 text-sm rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent"
            style={{ paddingLeft: '2.75rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          />
        </motion.div>

        {/* Right Section: Notification and Profile */}
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Badge dot>
              <Tooltip title="Notifications">
                <BellOutlined className="text-xl text-white cursor-pointer hover:text-[#A855F7]" />
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
                  style={{ backgroundColor: "#A855F7" }}
                  icon={<UserOutlined />}
                />
                <span className="text-sm font-medium text-white hidden sm:inline-block">
                  John Doe
                </span>
              </a>
            </Dropdown>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default PublisherHeader