import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { TrainModel } from './components/useComp/TrainModel';
import RealMain from './components/useComp/RealMain';
import DataTransfer from './components/useComp/dataTransfer';
import RunModels from './components/useComp/RunModels';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const id = uuidv4();
    setRoomId(id);
    
  }, []);

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
          <Route path="/trainmodel/:id" element={<TrainModel />} />
          <Route path="/transformData/:id" element={<DataTransfer />} />
          <Route path="/runmodels/:id" element={<RunModels />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
