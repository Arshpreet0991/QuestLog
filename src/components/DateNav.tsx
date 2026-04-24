"use client";
import { useDayContext } from "@/context/DayContext";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function DateNav() {
  const { prevDay, nextDay, currentDate } = useDayContext();

  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const next = () => {
    setDirection(-1);
    nextDay();
  };

  const prev = () => {
    setDirection(1);
    prevDay();
  };
  return (
    <>
      <div className="flex items-center justify-center p-1 bg-transparent cursor-pointer ">
        <button
          className=" text-amber-100 text-5xl rounded-sm font-bold transition-all duration-150 active:bg-amber-100 active:text-amber-950 active:scale-95"
          onClick={prev}
        >
          <GrCaretPrevious />
        </button>
        <div
          className="border border-amber-100 rounded-full text-2xl px-4 py-2 bg-amber-950 text-amber-100 w-11/12 font-bold "
          style={{
            boxShadow:
              "0 0 10px rgba(255,236,153,0.6), 0 0 20px rgba(255,236,153,0.3)",
          }}
        >
          <div className="overflow-hidden w-full text-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentDate.toDateString()}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentDate.toDateString()}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
        <button
          className=" text-amber-100 text-5xl rounded-sm font-bold transition-all duration-150 active:bg-amber-100 active:text-amber-950 active:scale-95"
          onClick={next}
        >
          <GrCaretNext />
        </button>
      </div>
    </>
  );
}

export default DateNav;
