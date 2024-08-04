import React from "react";

const Features = () => {
  return (
    <div className="flex justify-center w-screen  items-center align-middle">
      <ul className="relative flex flex-row justify-center items-center gap-x-2 bg-black w-3/4 m-auto ">
        <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center flex-shrink-0 fill-orange-500 bg-white border border-gray-200 font-medium text-gray-800 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="size-6 bg-white rounded-full pt-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
              Sign Up / Login
            </span>
          </div>
          <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
        </li>

        <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center flex-shrink-0 fill-rose-500 bg-white border border-gray-200 font-medium text-gray-800 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="size-6 bg-white rounded-full"
              >
                <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
              </svg>
            </span>
            <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
              Upload data
            </span>
          </div>
          <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
        </li>

        <li className="flex items-center gap-x-2 min-w-fit basis-0 flex-2 group">
          <div className="min-w-7 min-h-7 w-fit inline-flex justify-center items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center flex-shrink-0 bg-white border border-gray-200 font-medium text-gray-800 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
              <img src="https://i.pinimg.com/originals/65/c4/f4/65c4f452571be1261e9c623f7da488ac.gif" />
              <span className="sr-only">Loading...</span>
            </span>
            <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
              Get Model
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Features;
