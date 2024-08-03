import React from "react";
import AnimatedShinyText from "../magicui/animated-shiny-text";


const MainHeader = () => {
  return (
    <div className="relative overflow-hidden w-screen p-0 m-0 h-[75vh] before:absolute before:top-0 before:start-1/2 bg-transparent flex justify-center  before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 align-middle items-center">
      <div className="max-w-[85rem] mx-auto ">
      <span className="px-4 bg-gray-800 py-2 rounded-full w-fit flex m-auto">
          <AnimatedShinyText
            className={
              "inline-flex items-center justify-center transition ease-out hover:duration-300 hover:dark:text-neutral-300 rounded-full text-lg w-full "
            }
          >
           ✨ Train Your Models Now 
          </AnimatedShinyText>{" "}
        </span>
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200 w-full">
            Lets Train Models{" "}
            <span className="bg-clip-text bg-gradient-to-bl from-blue-600 to-green-600 text-transparent">
              Together
            </span>
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-gray-400">
            Develop Fast And Relieable Models Super Fast With <span className="font-bold">AUTOML</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
