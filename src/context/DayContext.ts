import { useContext, createContext } from "react";

const dayContext = createContext({
  date: new Date(),
  dayId: "",
  createDay: () => {},
  nextDay: () => {},
  prevDay: () => {},
});

export const DayProvider = dayContext.Provider;

export function useDay() {
  return useContext(dayContext);
}
