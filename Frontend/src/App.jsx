import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { TrainModel } from './components/useComp/TrainModel';
import RealMain from './components/useComp/RealMain';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '20px',
            background: '#333',
            color: '#fff',
          },
          success: {
            theme: {
              primary: '#65A0FB',
            },
          },
         
        }}
        limit={1} 
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RealMain />} />
          <Route path="/trainmodel" element={<TrainModel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
