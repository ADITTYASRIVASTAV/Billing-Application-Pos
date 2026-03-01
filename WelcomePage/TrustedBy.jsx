// src/components/TrustedBy.jsx
import React from "react";

const TrustedBy = () => {
  const brands = [
    "TechCorp",
    "RetailHub",
    "FoodChain",
    "StyleMart",
    "QuickShop",
    "UrbanGoods"
  ];

  return (
    <section className="py-12 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-400 uppercase text-sm tracking-wider">
            Trusted by 10,000+ businesses worldwide
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-xl font-semibold"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;