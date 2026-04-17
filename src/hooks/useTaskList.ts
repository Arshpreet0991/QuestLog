import { Category, ITask } from "@/types/Models.Types";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDayHook } from "./useDayHook";
import { useDayContext } from "@/context/DayContext";
import { da } from "zod/locales";
export function useTaskList() {
  const { dayId } = useDayContext();
  const [taskList, setTaskList] = useState<ITask[]>([]);

  async function fetchTaskList() {
    try {
      const response = await axios.get("/api/dashboard/tasks", {
        params: { dayId },
      });

      if (!response.data.success)
        return console.error(
          "Error in fetching tasklist ",
          response.data.error,
        );
      setTaskList(response.data.data);
    } catch (error) {
      return console.error("Error in fetching tasklist ", error);
    }
  }

  // auto run fetch tasks
  useEffect(() => {
    if (!dayId) return; // skip if dayId not ready yet
    fetchTaskList();
  }, [dayId]); //Context resets on every refresh, so dayId always transitions from "" to the real value, triggering the effect every time.

  return {
    taskList,
    fetchTaskList,
  };
}
