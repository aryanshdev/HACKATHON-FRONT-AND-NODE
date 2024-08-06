import React from "react";
import { BrowserRouter } from "react-router-dom";
import Features from "./Features";
import Hero from "./Hero";
import Navbar from "./Navbar";
import MainHeader from "./MainHeader";
import GoogleSignInSection from "./GoogleSignInSection";
const RealMain = () => {
  return (
    <div className="w-screen! top-0 left-0 p-0! m-0! overflow-hidden bg-black">
      {/* Main page where all the landing compoents are being rendered */}
      <Navbar />
      <Hero />
      <Features />
      <MainHeader />
      <GoogleSignInSection />
    </div>
  );
};

export default RealMain;
