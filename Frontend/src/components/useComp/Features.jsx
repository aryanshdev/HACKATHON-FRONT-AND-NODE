import React from 'react'

const Features = () => {
  return (
    <div style={{marginLeft:"15%"}}>
        
<ul className="relative flex flex-row gap-x-2 ">
 
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
      <img className="flex-shrink-0 size-7 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu655UcnEQPmhflzVrO27Ss3ig3L729qReFfqA4L9VgTO4gBjHaN0Mi5wRDjkgek2g7Zg&usqp=CAU" alt="Image Description" />
      <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
        Sign Up / Login
      </span>
    </div>
    <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
  </li>
 
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
      <span className="size-7 flex justify-center items-center flex-shrink-0 bg-white border border-gray-200 font-medium text-gray-800 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 3h5v5"></path>
          <path d="M8 3H3v5"></path>
          <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"></path>
          <path d="m15 9 6-6"></path>
        </svg>
      </span>
      <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
        Upload data
      </span>
    </div>
    <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
  </li>


 
  <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
      <span className="size-7 flex justify-center items-center flex-shrink-0 bg-white border border-gray-200 font-medium text-gray-800 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
      <img src="https://i.pinimg.com/originals/65/c4/f4/65c4f452571be1261e9c623f7da488ac.gif"/>
          <span className="sr-only">Loading...</span>
       
      </span>
      <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
        Get Model
      </span>
    </div>
    <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
  </li>

</ul>

    </div>
  )
}

export default Features