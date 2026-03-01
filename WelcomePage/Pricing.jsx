// src/components/Pricing.jsx
import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses",
      features: [
        "Up to 2 stores",
        "Basic POS features",
        "Email support",
        "Monthly reports",
        "Manual backups"
      ],
      highlighted: false
    },
    {
      name: "Business",
      price: "$79",
      description: "Most popular for growing businesses",
      features: [
        "Up to 10 stores",
        "Advanced analytics",
        "Priority support",
        "Real-time reports",
        "Auto backups",
        "Multi-user access",
        "Inventory management",
        "Custom branding"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$199",
      description: "For large organizations",
      features: [
        "Unlimited stores",
        "Enterprise analytics",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated manager",
        "Advanced security",
        "API access",
        "Training sessions"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlighted
                  ? "border-indigo-500 bg-gray-900 transform scale-105 shadow-2xl shadow-indigo-500/10"
                  : "border-gray-800 bg-gray-900/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full mr-3 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                    : "border border-gray-700 text-white hover:bg-gray-800/50"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;