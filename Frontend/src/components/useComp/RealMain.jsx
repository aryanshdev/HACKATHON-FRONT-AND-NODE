import React from "react";
import { BrowserRouter } from "react-router-dom";
import Features from "./Features";
import Hero from "./Hero";
import Navbar from "./Navbar";
import MainHeader from "./MainHeader";
import GoogleSignInSection from "./GoogleSignInSection";
const RealMain = () => {
  return (
    <div className="w-screen p-0! m-0! overflow-hidden bg-black border-2">
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
