import { useContext, createContext } from "react";
import { useDayHook } from "@/hooks/useDayHook";

// declare context type
type DayContextType = {
  currentDate: Date;
  dayId: string;
  nextDay: () => void;
  prevDay: () => void;
};

// create context
const dayContext = createContext<DayContextType | null>(null);

// wrapper to provide values to Provider
export function DayProvider({ children }: { children: React.ReactNode }) {
  const { currentDate, dayId, prevDay, nextDay } = useDayHook();

  return (
    <dayContext.Provider value={{ currentDate, dayId, prevDay, nextDay }}>
      {children}
    </dayContext.Provider>
  );
}

export const useDayContext = () => {
  const context = useContext(dayContext);
  if (!context)
    throw new Error("useDayContext must be used within DayProvider");
  return context;
};
