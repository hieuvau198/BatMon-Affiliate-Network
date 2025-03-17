"use client"

import { motion } from "framer-motion"

const PublisherFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="bg-gradient-to-r from-[#4B2E1E] to-[#8B5A2B] text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AffiHub</h3>
            <p className="text-gray-200">Empowering publishers to earn more.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Home</a></li>
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Campaigns</a></li>
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Blog</a></li>
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-200 hover:text-[#A855F7]">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-200">Email: support@AffiHub.com</p>
            <p className="text-gray-200">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default PublisherFooter