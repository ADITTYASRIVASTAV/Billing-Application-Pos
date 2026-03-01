// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const productLinks = ["Features", "Pricing", "API", "Documentation", "Status"];
  const companyLinks = ["About", "Blog", "Careers", "Press", "Partners"];
  const supportLinks = ["Help Center", "Community", "Contact", "Privacy", "Terms"];
  const socialIcons = ["𝕏", "f", "in", "ig"];

  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-bold text-white">POS Cloud</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Modern POS system designed to help businesses streamline operations, 
              increase revenue, and deliver exceptional customer experiences.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 POS Cloud. All rights reserved.
          </div>
          
          
          <div className="flex space-x-4">
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;