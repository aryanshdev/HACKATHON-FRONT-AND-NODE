import React from "react";
import Navbar from "./Navbar";

const InsideNav = (currentPage = null) => {
  return (
    <header className="w-screen h-10 rounded fixed m-auto flex top-3 justify-center">
      <nav className="bg-white w-5/6 bg-opacity-65 h-full rounded-full flex px-4 justify-between align-middle">
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
        <div>
          <button className={"px-3 py-1 rounded-full text-sm font-semibold" + (currentPage == "Upload" ? "bg-blue-400" : "bg-white" )} >
            Upload Dataset
          </button>
        </div>
        <div>


        </div>
      </nav>
    </header>
  );
};

export default InsideNav;
