// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 pt-20 pb-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              All-in-One POS System for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg mt-6 mb-8 max-w-2xl">
              Complete solution for Retail, Restaurant, Multi-store operations with 
              integrated Inventory Management, Advanced Analytics, and Real-time Reporting.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400">POS Dashboard</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Today's Sales</div>
                  <div className="text-2xl font-bold text-white">$12,456</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Orders</div>
                  <div className="text-2xl font-bold text-white">89</div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">Revenue Chart</div>
                <div className="flex items-end h-32 space-x-1">
                  {[40, 65, 80, 60, 75, 90, 70].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;