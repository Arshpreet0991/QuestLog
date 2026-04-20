"use client";
import { useDayContext } from "@/context/DayContext";

function DateNav() {
  const { prevDay, nextDay, currentDate } = useDayContext();
  return (
    <>
      <div className="flex items-center justify-between p-1 bg-amber-950 rounded-sm ... transition-all duration-300 shadow-[0_0_15px_5px_rgba(255,215,0,0.3)] cursor-pointer">
        <button
          className="border-2 border-double border-black rounded-sm bg-amber-950"
          onClick={prevDay}
        >
          <img src="/icon-prev.webp" className="h-15 w-15" />
        </button>
        <div className="text-2xl text-amber-100 p-1 font-bold">
          <h1>{currentDate.toDateString()}</h1>
        </div>
        <button
          className=" text-black rounded-sm border-2 border-double border-black"
          onClick={nextDay}
        >
          <img src="/icon-next.webp" className="h-15 w-15" />
        </button>
      </div>
    </>
  );
}

export default DateNav;
