import { ITask } from "@/types/Models.Types";
import { useContext, createContext } from "react";
import useTask from "@/hooks/useTask";
import { useTaskList } from "@/hooks/useTaskList";

type TaskContext = {
  taskList: ITask[];
  fetchTaskList: () => void;
};

const TaskContext = createContext<TaskContext | null>(null);

export const TaskContextProvider = TaskContext.Provider;

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { taskList, fetchTaskList } = useTaskList();
  return (
    <>
      <TaskContextProvider value={{ taskList, fetchTaskList }}>
        {children}
      </TaskContextProvider>
    </>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
