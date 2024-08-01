

import '../../App.css'
import RetroGrid from "@/components/magicui/retro-grid";

function Hero() {


  return (
    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  ">
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
          Avenge.AI
        </span>
        <RetroGrid />
      </div>
    </>
  )
}

export default Hero
