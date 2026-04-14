import { ITask } from "@/types/Models.Types";

export const categoryStats = (taskList: ITask[]) =>
  taskList.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 };
      }
      acc[task.category].total += 1;
      if (task.isCompleted) acc[task.category].completed += 1;
      return acc;
    },
    {} as Record<string, { total: number; completed: number }>,
  );
