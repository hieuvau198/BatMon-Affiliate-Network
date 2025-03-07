import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-12 px-8 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand Section */}
        <div className="max-w-sm">
          <h3 className="text-2xl font-bold text-orange-400 drop-shadow-md">
            AffiHub
          </h3>
          <p className="mt-4 text-lg leading-relaxed">
            Empowering publishers and advertisers with top-tier affiliate marketing solutions across Vietnam & SEASIA.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">FOR PUBLISHERS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Earn Commissions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Training Academy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Tools & Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">FOR ADVERTISERS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Boost Revenue
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Campaign Management
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="text-sm text-gray-400">
          © 2025 AffiHub. All rights reserved.
        </p>
        <ul className="flex space-x-6 text-sm">
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              Terms
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              Cookies
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}