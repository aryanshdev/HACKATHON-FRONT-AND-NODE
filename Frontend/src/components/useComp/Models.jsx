import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dataTransfer from './dataTransfer';
import { color } from 'framer-motion';
import TrainModel from './TrainModel';
import RunModels from './RunModels';

const Models = () => {
const cookieId= getCookie("ssid");

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <nav className="navbar" style={{ backgroundColor: 'rgba(248, 249, 250, 0.7)', borderRadius: "30px", width: "fit-content" }}>
        <div className="container-fluid d-flex justify-content-between">
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            backgroundColor: "#036EFD",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "white",
            display: "flex",
            alignItems: "center",
            fontWeight: "bolder"
          }}>
            <img src='../../../public/images/star.png' className='w-5 h-5' alt='star' />&nbsp; Subprocesses 
          </button>
           
           <Link to={`/TrainModel/${cookieId}`}>  <button
            className="btn mx-2"
            style={{
              borderRadius: "20px",
              background: "white",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#000"
            }}>
            <i className="fa-solid fa-cloud-arrow-up" style={{color:"#036EFD"}}></i> &nbsp;Upload Dataset
          </button></Link>
        

          <Link to={`/transformData/${cookieId}`}>
            <button className="btn mx-2" style={{
              borderRadius: "20px",
              background: "white",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#000"
            }}>
              <i className="fa-solid fa-file-zipper" style={{ color: "#036EFD" }}></i> &nbsp;Data Transformation
            </button>
          </Link>

          <Link to={`/RunModels/${cookieId}`}>
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}>
            <i className="fa-solid fa-microchip"style={{color:"#036EFD"}}></i> &nbsp;Train Models
          </button>
          </Link>

          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}>
            <i className="fa-solid fa-download" style={{color:"#036EFD"}}></i> &nbsp;Download
          </button>

          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}>
            <i className="fa-solid fa-chip" style={{color:"#036EFD"}}></i> &nbsp;Check By TPot
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Models;