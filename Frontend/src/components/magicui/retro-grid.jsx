import { cn } from "@/lib/utils";

export default function RetroGrid() {
  return (
    <div
      className={
        "w-full pointer-events-none absolute h-full overflow-hidden [perspective:270px] bg-gradient-to-b from-black to-gray-950"
      }
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)] ">
        <div
          className={cn(
            "animate-grid w-screen",
            "[background-repeat:repeat] [background-size:60px_60px] [height:150vh] [inset:200%_0px] [margin-left:-100%] [transform-origin:50%_0_0] [width:700vw]",
            // Dark styles
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}
