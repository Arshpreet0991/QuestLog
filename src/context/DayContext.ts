import { useContext, createContext } from "react";
import { ITask } from "@/types/Models.Types";

const dayContext = createContext({
  taskList: [] as ITask[],
  setTaskList: (_: ITask[] | ((prev: ITask[]) => ITask[])) => {},
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
