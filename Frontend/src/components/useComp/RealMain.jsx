import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Features from './Features';
import Hero from './Hero';
import Navbar from './Navbar';
import MainHeader from './MainHeader';
import Header from './Header';
const RealMain = () => {
  return (
    <div className='w-screen bg-white py-0 px-2'>

        {/* Main page where all the landing compoents are being rendered */}
        <Navbar/>
    <Hero/>


    <Features/>
  
    <MainHeader/>


<Header/>


    </div>
  )
}

export default RealMain