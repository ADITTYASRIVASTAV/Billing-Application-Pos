// src/components/Features.jsx
import React from "react";

const Features = () => {
  const features = [
    {
      icon: "💻",
      title: "POS Terminal",
      description: "Fast, intuitive checkout with multiple payment options and custom workflows."
    },
    {
      icon: "📦",
      title: "Inventory Management",
      description: "Real-time stock tracking, automated ordering, and low-stock alerts."
    },
    {
      icon: "📊",
      title: "Sales & Revenue Analytics",
      description: "Deep insights into sales performance, trends, and profitability metrics."
    },
    {
      icon: "👥",
      title: "Customer Management",
      description: "Customer profiles, purchase history, and loyalty program management."
    },
    {
      icon: "🎯",
      title: "Discount & Offers",
      description: "Create custom promotions, discounts, and loyalty rewards programs."
    },
    {
      icon: "🏪",
      title: "Multi-Branch Support",
      description: "Seamless multi-location management with centralized control."
    }
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive tools designed to streamline operations and boost your revenue.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;