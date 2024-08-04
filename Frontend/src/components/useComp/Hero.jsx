

import '../../index.css'
import RetroGrid from "@/components/magicui/retro-grid";

function Hero() {


  return (
    <>
      <div className="relative w-full flex h-[75vh] flex-col items-center justify-center rounded-lg bg-gray-900"
      >
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffffff] via-[#ff29e6] to-[#7c08f7] bg-clip-text text-center text-8xl font-bold h-28 text-transparent">
          Avenge.ai
        </span>
        <RetroGrid />
      </div>
    </>
  )
}

export default Hero
