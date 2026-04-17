"use client";
import { useTaskContext } from "@/context/TaskContext";
export default function useCalculateStats() {
  const { taskList } = useTaskContext();

  const bodyTaskStats = taskList.reduce(
    (acc, task) => {
      if (task.category === "body") {
        acc.total++;

        if (task.isCompleted) {
          acc.completed++;
        }
      }
      return acc;
    },
    { completed: 0, total: 0 },
  );

  const mindTaskStats = taskList.reduce(
    (acc, task) => {
      if (task.category === "mind") {
        acc.total++;

        if (task.isCompleted) {
          acc.completed++;
        }
      }
      return acc;
    },
    { completed: 0, total: 0 },
  );
  const wealthTaskStats = taskList.reduce(
    (acc, task) => {
      if (task.category === "wealth") {
        acc.total++;

        if (task.isCompleted) {
          acc.completed++;
        }
      }
      return acc;
    },
    { completed: 0, total: 0 },
  );
  return { bodyTaskStats, mindTaskStats, wealthTaskStats };
}
