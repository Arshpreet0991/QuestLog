"use client";
import React from "react";
import useDate from "@/context/DateContext";

type propTypes = {
  children: React.ReactNode;
  fn: () => void;
};

function NavButtons({ children, fn }: propTypes) {
  return (
    <>
      <button
        className="bg-white text-5xl text-black p-1  rounded-sm"
        onClick={fn}
      >
        {children}
      </button>
    </>
  );
}

export default NavButtons;
