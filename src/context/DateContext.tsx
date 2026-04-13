"use client";
import React, { useContext } from "react";

const today = new Date();
today.setHours(0, 0, 0, 0);

const DateContext = React.createContext({
  date: today,
  dayId: "",
  nextDay: () => {},
  prevDay: () => {},
});

export { DateContext };

export const DateProvider = DateContext.Provider;

export default function useDate() {
  return useContext(DateContext);
}
