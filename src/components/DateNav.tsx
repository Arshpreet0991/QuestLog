"use client";
import { useDayContext } from "@/context/DayContext";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

function DateNav() {
  const { prevDay, nextDay, currentDate } = useDayContext();
  return (
    <>
      <div className="flex items-center justify-center p-1 bg-transparent cursor-pointer ">
        <button
          className=" text-amber-100 text-5xl rounded-sm font-bold"
          onClick={prevDay}
        >
          <GrCaretPrevious />
        </button>
        <div
          className="border border-amber-100 rounded-full text-2xl px-4 py-3 bg-amber-950"
          style={{
            boxShadow:
              "0 0 10px rgba(255,236,153,0.6), 0 0 20px rgba(255,236,153,0.3)",
          }}
        >
          <h1>{currentDate.toDateString()}</h1>
        </div>
        <button
          className=" text-amber-100 text-5xl rounded-sm font-bold"
          onClick={nextDay}
        >
          <GrCaretNext />
        </button>
      </div>
    </>
  );
}

export default DateNav;
