// src/components/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Managing Your Store{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Smarter Today
            </span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that trust POS Cloud for their daily operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-indigo-500/25"
            >
              Start Free Trial
            </Link>
            <button className="border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800/50 transition-all duration-200">
              Schedule a Demo
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;