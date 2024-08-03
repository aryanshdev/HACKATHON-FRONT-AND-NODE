import React from "react";
import { Link } from "react-router-dom";
import AnimatedShinyText from "../magicui/animated-shiny-text";


const GoogleSignInSection = () => {
  const googleOAuth = () => {
    window.location.href = "/app/google-auth";
  };
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 bg-black">
        <span className="px-16 bg-gray-800 py-2 rounded-full w-fit flex m-auto">
          <AnimatedShinyText
            className={
              "inline-flex items-center justify-center transition ease-out hover:duration-300 hover:dark:text-neutral-300 rounded-full text-lg w-full "
            }
          >
          Get Started
          </AnimatedShinyText>
         </span>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-600 dark:text-neutral-100">
            Sign Up or Sign in with Google to grow
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center" onClick={googleOAuth}>
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center transition-all duration-200 bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 dark:focus:ring-offset-gray-800"
            >
            <img
              src="../../../public/images/google.png"
              style={{ width: "30px", height: "30px" }}
            />
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignInSection;
