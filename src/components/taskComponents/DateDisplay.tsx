"use client";
import { useDayContext } from "@/context/DayContext";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

function DateDisplay() {
  const { prevDay, nextDay, currentDate } = useDayContext();
  return (
    <>
      <div className="flex items-center justify-center p-1 bg-transparent cursor-pointer text-center">
        <div
          className="border border-amber-100 rounded-full text-2xl px-4 py-3 bg-amber-950 text-amber-100 w-11/12 font-bold "
          style={{
            boxShadow:
              "0 0 10px rgba(255,236,153,0.6), 0 0 20px rgba(255,236,153,0.3)",
          }}
        >
          <h1>{currentDate.toDateString()}</h1>
        </div>
      </div>
    </>
  );
}

export default DateDisplay;
