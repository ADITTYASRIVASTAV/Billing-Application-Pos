// src/pages/LandingPage.jsx

import CTA from "./CTA";
import DashboardPreview from "./DashboardPreview";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Pricing from "./Pricing";
import TrustedBy from "./TrustedBy";
import WhyChooseUs from "./WhyChooseUs";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero/>
      <TrustedBy />
      <Features />
      <WhyChooseUs />
      <DashboardPreview/>
      <Pricing/>
      <CTA />
      <Footer/>
    </div>
  );
};

export default LandingPage;