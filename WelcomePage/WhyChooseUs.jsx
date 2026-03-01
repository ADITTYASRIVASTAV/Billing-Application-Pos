// src/components/WhyChooseUs.jsx
import React from "react";

const WhyChooseUs = () => {
  const points = [
    "Fast billing & checkout",
    "Secure cloud data backup",
    "Works offline with sync",
    "GST & Tax ready compliance",
    "Role-based access control",
    "24/7 customer support",
    "Custom reporting tools",
    "Mobile app for managers"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Businesses{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Choose POS Cloud
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Built with reliability and scalability in mind, our platform delivers 
              enterprise-grade features with startup simplicity.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                99.9% Uptime Guarantee
              </h3>
              <p className="text-gray-400">
                Reliable performance you can count on
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">System Performance</span>
                <span className="text-green-400 font-semibold">99.9%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-[99.9%]" />
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <span className="text-gray-300">Customer Satisfaction</span>
                <span className="text-green-400 font-semibold">4.9/5</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-[98%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;