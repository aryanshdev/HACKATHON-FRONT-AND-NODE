import React from "react";
import { Link } from "react-router-dom";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import AnimatedGridPattern from "../magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const GoogleSignInSection = () => {
  const googleOAuth = () => {
    window.location.href = "/app/google-auth";
  };
  return (
    <>
      <div className="relative z-0 before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 bg-black z-30 ">
          <span className="px-16 bg-gray-800 py-2 rounded-full w-fit flex m-auto z-50">
            <AnimatedShinyText
              className={
                "inline-flex z-30 items-center justify-center transition ease-out hover:duration-300 hover:dark:text-neutral-300 rounded-full text-lg w-full "
              }
            >
              Get Started{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </AnimatedShinyText>
          </span>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-100">
              Sign Up or Sign in with Google to grow
            </p>
          </div>
          <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] z-0",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
          <div
            className="mt-8 gap-3 flex justify-center z-40"
            onClick={googleOAuth}
          >
            <a className="inline-flex justify-center items-center gap-x-3 text-center transition-all duration-200 bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 dark:focus:ring-offset-gray-800">
              <img
                src="../../../public/images/google.png"
                className="w-5 h-5"
              />
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleSignInSection;
