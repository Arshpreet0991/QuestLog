"use client";
import { useTaskContext } from "@/context/TaskContext";
import { useDayContext } from "@/context/DayContext";
import { useEffect } from "react";
import axios from "axios";
export default function useCalculateStats() {
  const { taskList } = useTaskContext();
  const { dayId } = useDayContext();

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

  // add overalls stats to day

  const overallStats = taskList.reduce(
    (acc, task) => {
      if (task.isCompleted) {
        acc.completed++;
      }
      return acc;
    },
    { completed: 0, total: taskList.length },
  );
  useEffect(() => {
    if (!dayId || taskList.length === 0) return;
    const score = (overallStats.completed / overallStats.total) * 100;
    axios.patch("/api/dashboard/day", { dayId, score });
  }, [taskList]);

  return { bodyTaskStats, mindTaskStats, wealthTaskStats, overallStats };
}
