"use client";
import { useDayContext } from "@/context/DayContext";

function DateNav() {
  const { prevDay, nextDay, currentDate } = useDayContext();
  return (
    <>
      <div className="flex items-center justify-center border-2 border-white">
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={prevDay}
        >
          Prev
        </button>
        <div className="text-2xl bg-white text-black p-1">
          {currentDate.toDateString()}
        </div>
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={nextDay}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default DateNav;
