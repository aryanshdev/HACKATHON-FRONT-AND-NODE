import React from 'react';

const Models = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <nav className="navbar" style={{ backgroundColor: 'rgba(248, 249, 250, 0.7)', borderRadius: "30px", width: "fit-content" }}>
        <div className="container-fluid d-flex justify-content-between">
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            backgroundColor:"#036EFD",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "white",
            display: "flex",
            alignItems: "center",
            fontWeight:"bolder"
          }}>
            <img src='../../../public/images/star.png' className='w-5 h-5' alt='star' />&nbsp; Subprocesses 
          </button>
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}> <i className="fa-solid fa-cloud-arrow-up"></i> &nbsp;Upload Dataset</button>
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}> <i class="fa-solid fa-file-zipper"></i> &nbsp;Data Transformation</button>
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}>  <i className="fa-solid fa-microchip"></i> &nbsp;Train Models</button>
          <button className="btn mx-2" style={{
            borderRadius: "20px",
            background: "white",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000"
          }}><i class="fa-solid fa-download"></i> &nbsp;Download</button>
        </div>
      </nav>
    </div>
  );
}

export default Models;
