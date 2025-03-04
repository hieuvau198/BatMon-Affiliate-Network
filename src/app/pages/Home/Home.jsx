"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to AffiHub
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your ultimate platform to earn money online with Affiliate Marketing and D2C solutions.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </Link>
        </section>

        {/* Hero Section */}
        <div
          className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl shadow-lg overflow-hidden mb-12 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
          onMouseEnter={() => setHoveredCard("hero")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex flex-col md:flex-row items-center p-8 opacity-95 hover:opacity-100 transition-all duration-300">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.c5lgPUAZagGZc3PZJbxQ_QHaEK&pid=Api&P=0&h=180"
              alt="KGC App"
              className="w-full md:w-1/3 rounded-lg shadow-md mb-6 md:mb-0 md:mr-8 object-contain transform transition-all duration-300 hover:scale-105"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Increase Income With KGC APP
              </h2>
              <p className="text-white text-opacity-90 text-lg mb-6">
                Sign up to make money fast
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-md hover:bg-opacity-90 transition-all duration-300"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

        {/* Advertiser & Publisher Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Advertiser Card */}
          <div
            className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
            onMouseEnter={() => setHoveredCard("advertiser")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-8 h-8 text-orange-900 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-orange-900">Advertiser</h3>
            </div>
            <p className="text-orange-900 text-lg mb-6">
              You want to increase revenue effectively in Vietnam & SEASIA
            </p>
            <Link
              to="/advertiser"
              className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Learn Now
            </Link>
          </div>

          {/* Publisher Card */}
          <div
            className="bg-gradient-to-r from-yellow-200 to-orange-300 rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
            onMouseEnter={() => setHoveredCard("publisher")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-8 h-8 text-orange-900 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-orange-900">Publisher</h3>
            </div>
            <p className="text-orange-900 text-lg mb-6">
              Join the network of 2.5 million leading Publishers in Vietnam
            </p>
            <Link
              to="/publisher"
              className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Learn Now
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h4 className="text-3xl font-bold text-gray-800">2.5M+</h4>
            <p className="text-gray-600">Publishers</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h4 className="text-3xl font-bold text-gray-800">50M+</h4>
            <p className="text-gray-600">Monthly Income Potential</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h4 className="text-3xl font-bold text-gray-800">45%</h4>
            <p className="text-gray-600">Max Commission Rate</p>
          </div>
        </div>

        {/* Publishers Info Section */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
          onMouseEnter={() => setHoveredCard("info")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            For Publishers
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Easy Income – Prove Your Ability
          </p>
          <ul className="space-y-4 mb-6">
            {[
              "Income up to 50 million/month",
              "Freedom to make money online anytime, anywhere",
              "Get free training at AffiHub Academy",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 transform transition-all duration-300 hover:scale-102"
              >
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold text-blue-500">
            Special: Get the first 1 million just by registering!
          </p>
        </div>

        {/* Access Affiliate & Access D2C Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Access Affiliate */}
          <div
            className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
            onMouseEnter={() => setHoveredCard("affiliate")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-yellow-700 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l4-4a4 4 0 00-5.656-5.656l-4 4"
                />
              </svg>
              <h3 className="text-2xl font-bold text-yellow-700">
                ACCESS AFFILIATE
              </h3>
            </div>
            <p className="text-yellow-700 text-lg mb-6">
              Top Affiliate Marketing Online Money Making Platform in Vietnam & SEASIA
            </p>
            <Link
              to="/access-affiliate"
              className="text-blue-500 font-bold flex items-center hover:text-blue-700 transition-all duration-300"
            >
              See more
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Access D2C */}
          <div
            className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
            onMouseEnter={() => setHoveredCard("d2c")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-green-700 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18M3 9h18m-9 6h9M3 15h6m-6 6h18"
                />
              </svg>
              <h3 className="text-2xl font-bold text-green-700">ACCESS D2C</h3>
            </div>
            <p className="text-green-700 text-lg mb-6">
              Extremely legitimate online money making platform. Commission up to 45%
            </p>
            <Link
              to="/access-d2c"
              className="text-blue-500 font-bold flex items-center hover:text-blue-700 transition-all duration-300"
            >
              Download DimuaDi App to experience commissions up to 45%
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "John Doe",
                role: "Publisher",
                quote: "AffiHub helped me earn a stable income from home!",
              },
              {
                name: "Jane Smith",
                role: "Advertiser",
                quote: "The platform boosted my sales significantly.",
              },
              {
                name: "Alex Tran",
                role: "Publisher",
                quote: "Easy to use and great support from the team!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105"
              >
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 text-center rounded-t-2xl">
          <p className="text-lg mb-2">Join AffiHub Today</p>
          <Link
            to="/register"
            className="inline-block px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300"
          >
            Sign Up
          </Link>
          <p className="text-sm mt-4">
            © 2025 AffiHub. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}