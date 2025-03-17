import React from 'react';
import {
 
  TrophyOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,

} from "@ant-design/icons";
import { motion } from "framer-motion";

import PublisherHeader from "../PublisherLayOut/partials/PublisherHeader";
import PublisherFooter from "../PublisherLayOut/partials/PublisherFooter";
import CampaignList from '../../pages/Publisher/Campaign/CampaignList';



export default function PublisherLayout() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 ">


      {/* Main Content */}

      {/* Header */}
      <PublisherHeader />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#A855F7]/50 flex flex-col items-center justify-center px-8 md:px-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            WELCOME TO AffiHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/90 max-w-xl text-lg"
          >
            Your ultimate platform to earn money online with affiliate marketing and D2C solutions.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 bg-[#3B82F6] text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
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
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#A855F7] transition-colors">
                  Access Affiliate
                </h2>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  {/* Removed GlobalOutlined */}
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
        <motion.div>
          <CampaignList />
        </motion.div>

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top Publishers</h2>
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
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-6 rounded-lg">
                <FileTextOutlined className="text-[#A855F7] text-2xl mb-4" />
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
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 bg-gray-50 rounded-lg">
                <QuestionCircleOutlined className="text-[#A855F7] text-2xl mb-2" />
                <h3 className="text-lg font-semibold">How do I get started?</h3>
                <p className="text-gray-600">Sign up, choose a campaign, and start promoting!</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <PublisherFooter />

    </div>
  );
}