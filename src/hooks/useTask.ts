import { ITask } from "@/types/Models.Types";
import toast from "react-hot-toast";
import axios from "axios";
import { useDayHook } from "./useDayHook";
import { useTaskList } from "./useTaskList";
import { useTaskContext } from "@/context/TaskContext";

function useTask({ task }: { task: ITask }) {
  const { dayId } = useDayHook();

  const { taskList, fetchTaskList } = useTaskContext();

  // add tasks
  const addTask = async (e: any) => {
    e.preventDefault();

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
