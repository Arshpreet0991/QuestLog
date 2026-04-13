"use client";
import React from "react";
import { useState } from "react";
import useDate from "@/context/DateContext";

function DateDisplay() {
  // const [date, setDate] = useState(new Date());

  const { date } = useDate();

  return (
    <div className="flex bg-white p-4 rounded-sm text-black font-bold gap-5 text-xl">
      <span>
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>
    </div>
  );
}

export default DateDisplay;
