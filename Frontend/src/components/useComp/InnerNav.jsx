import React from 'react';

const InnerNav = () => {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1D0529" }}>
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: "#000000" }}>
            <img src='../../../public/images/logo2.png' className="mx-3"style={{ height: "50px", width: "50px", marginRight: "10px" }} alt="Logo" />
            <span style={{
              background: 'linear-gradient(-100deg, #036EFD, #EC7A6F, #EC7A6F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight:"bold",
              fontSize:"25px"
            }}>
              Avenge AI
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default InnerNav;
