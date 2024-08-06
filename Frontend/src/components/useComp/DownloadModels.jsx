import React, { useState } from "react";
import InsideNav from "./InsideNav";
import toast from "react-hot-toast";
import AnimatedGridPattern from "../magicui/animated-grid-pattern";

const DownloadModels = () => {
  return (
    <div className="overflow-hidden rounded-lg w-screen md:shadow-xl">
      <AnimatedGridPattern
        numSquares={120}
        maxOpacity={0.7}
        duration={3}
        repeatDelay={1}
        className={" h-full fill-white"}
      />

      <div className="relative z-50">
        <InsideNav currentPage="Downloads" />

        <div className="p-5 px-16 w-screen h-full mt-16 -z-10">
          <div className=" shadow-lg h-[85vh] p-5 bg-[#171717] overflow-x-hidden overflow-y-auto text-white rounded-2xl">
            <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
              {" "}
              <i className="fa-solid fa-download" style={{color:"#036EFD"}}></i> &nbsp;
              Download Files
            </h1>
            {/* DOWNLOAD BUTTONS */}
            <div className="flex w-full">
                <div className="flex w-5/6 justify-center gap-6">
                  <h2 className="font-bold text-xl">
                    Download Cleaned CSV
                  </h2>
                  <button className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold">
                    <i className="fa-solid fa-download" >
                    </i> {" "}
                    Downlaod
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModels;
