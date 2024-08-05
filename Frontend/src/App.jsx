import React, { useState, useEffect } from 'react';
import '../src/index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { UploadData } from './components/useComp/UploadData';
import RealMain from './components/useComp/RealMain';
import DataTransfer from './components/useComp/DataTransfer';
import RunModels from './components/useComp/RunModels';
import { v4 as uuidv4 } from 'uuid';

function App() {

  return (
    <>
    <Toaster
        position="top-right"
        duration={5000}
        toastOptions={{
          style: {
            fontSize: '1.1rem',
            background: '#222',
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
          <Route path="/" element={<RealMain />}  />
          <Route path="/UploadData/:id" element={<UploadData />} />
          <Route path="/TransformData/:id" element={<DataTransfer />} />
          <Route path="/RunModels/:id" element={<RunModels />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
