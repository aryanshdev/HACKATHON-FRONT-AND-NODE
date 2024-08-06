import React from "react";
import Navbar from "./Navbar";

const InsideNav = ({currentPage}) => {
  return (
    <header className="w-screen h-12 rounded fixed m-auto flex top-3 justify-center">
      <nav className="bg-white w-3/5 bg-opacity-25 backdrop-blur-sm h-full rounded-full flex px-4 justify-between align-middle items-center">
        <div className="h-full">
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 h-full"
            href=""
            aria-label="Avenge.AI"
          >
            <img
              src="../../../public/images/logo2.png"
              className=" w-auto h-5/6"
            />
          </a>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className={`px-3 py-1 rounded-full text-base font-semibold ${
              currentPage == "Uploads" ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            Upload Dataset
          </button>
          <button
            className={`px-3 py-1 rounded-full text-base font-semibold ${
              currentPage == "Transform"
                ? "bg-blue-500 text-white"
                : "bg-white "
            }`}
          >
            Transform Data
          </button>
          <button
            className={`px-3 py-1 rounded-full text-base font-semibold ${
              currentPage == "Train" ? "bg-blue-500 text-white" : "bg-white "
            }`}
          >
            Train Model
          </button>
          <button
            className={`px-3 py-1 rounded-full text-base font-semibold ${
              currentPage == "Downloads"
                ? "bg-blue-500 text-white"
                : "bg-white "
            }`}
          >
            Downloads
          </button>
          <button
            className={`px-3 py-1 rounded-full text-base font-semibold ${
              currentPage == "TPOT"
                ? "bg-blue-500 text-white"
                : "bg-white "
            }`}
          >
            TPOT
          </button>
          <button className="text-blue-600 bg-white rounded-full h-7 w-7"> 
          <i class="fa-solid fa-user scale-110"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default InsideNav;
