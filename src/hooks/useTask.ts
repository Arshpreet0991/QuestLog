import { ITask } from "@/types/Models.Types";
import toast from "react-hot-toast";
import axios from "axios";
import { useDayHook } from "./useDayHook";
import { useTaskList } from "./useTaskList";
import { useTaskContext } from "@/context/TaskContext";
import { useDayContext } from "@/context/DayContext";
import useCalculateStats from "./useCalulateStats";

function useTask({ task }: { task: ITask }) {
  const { dayId, currentDate } = useDayContext();

  const { taskList, fetchTaskList } = useTaskContext();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // add tasks
  const addTask = async () => {
    const categoryTask = task.category;

    const taskListByCategory = taskList.filter(
      (task) => task.category === categoryTask,
    );

    const alreadyHasMainQuest = taskListByCategory.some(
      (task) => task.taskType === "mainQuest",
    );

    task.taskType = alreadyHasMainQuest ? "sideQuest" : "mainQuest";

    try {
      const response = await axios.post("/api/dashboard/tasks", {
        task,
        dayId,
      });

      if (!response.data.success)
        return console.error("Cant add task right now, ", response.data.error);

      fetchTaskList();
    } catch (error) {
      toast.error("Quest limit reached");
    }
  };

  // delete task
  async function deleteTask(taskId: string) {
    try {
      const response = await axios.delete("/api/dashboard/tasks", {
        params: { taskId, dayId },
      });
      if (!response.data.success)
        return console.error("Task deletetion failed, ", response.data.error);

      fetchTaskList();

      toast.success("Task Deleted");
    } catch (error: any) {
      toast.error("Task deletion failed", error);
    }
  }

  // edit task
  const updateTask = async (taskId: string, updatedTitle: string) => {
    try {
      if (currentDate.getTime() === today.getTime()) return;

      const response = await axios.patch("/api/dashboard/tasks", {
        taskId,
        dayId,
        updatedTitle,
      });
      if (!response.data.success)
        return console.error("Task updation failed, ", response.data.error);

      fetchTaskList();
      toast.success("Task Updated");
    } catch (error: any) {
      toast.error("Task update failed", error);
    }
  };

  // mark task as complete
  async function taskComplete(taskId: string) {
    if (currentDate.getTime() < today.getTime()) {
      toast.error("Day already passed");
      return;
    }
    if (currentDate.getTime() > today.getTime()) {
      toast.error("Day has not begun yet");
      return;
    }
    try {
      const response = await axios.patch("/api/dashboard/tasks/complete", {
        taskId,
        dayId,
        isCompleted: !task.isCompleted,
      });

      if (!response.data.success)
        return console.error("Task status not changed, ", response.data.error);

      fetchTaskList();

      return;
    } catch (error) {
      toast.error("Task update failed");
    }
  }

  return {
    addTask,
    updateTask,
    deleteTask,
    taskComplete,
  };
}

export default useTask;
