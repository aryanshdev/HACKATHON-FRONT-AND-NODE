import './App.css';
import Navbar from './components/useComp/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TrainModel } from './components/useComp/TrainModel';
import RealMain from './components/useComp/RealMain';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RealMain/>} />
        <Route path="/trainmodel" element={<TrainModel />} />
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
