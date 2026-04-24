import { useContext, createContext } from "react";
import { useDayHook } from "@/hooks/useDayHook";
import useReflection from "@/hooks/useReflection";

// declare context type
type DayContextType = {
  currentDate: Date;
  dayId: string;
  username: string;
  streakCount: number;
  nextDay: () => void;
  prevDay: () => void;
};

// create context
const dayContext = createContext<DayContextType | null>(null);

// wrapper to provide values to Provider
export function DayProvider({ children }: { children: React.ReactNode }) {
  const { currentDate, dayId, prevDay, nextDay, username, streakCount } =
    useDayHook();

  return (
    <dayContext.Provider
      value={{ currentDate, dayId, prevDay, nextDay, username, streakCount }}
    >
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
