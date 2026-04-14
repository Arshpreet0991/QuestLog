"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types/Models.Types";
import axios from "axios";
import toast from "react-hot-toast";
import { useDay } from "@/context/DayContext";
import TaskItems from "@/components/TaskItems";

function TaskForm({ category }: { category: string }) {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [task, setTask] = useState("");
  const { dayId } = useDay();
  const isMainQuest = taskList.some((task) => task.taskType === "mainQuest");

  // add tasks
  const addTask = async (e: any) => {
    e.preventDefault();

    const todo: ITask = {
      task,
      taskType: isMainQuest ? "sideQuest" : "mainQuest",
      category: category as "body" | "mind" | "wealth" | "relationships",
      points: isMainQuest ? 10 : 20,
      isCompleted: false,
    };

    try {
      const response = await axios.post("/api/dashboard/tasks", {
        todo,
        dayId,
      });

      fetchTasks();
      setTask("");

      if (response.data.success) toast.success("Quest Added");

      console.log(response.data.data._id);
    } catch (error) {
      toast.error("Cannot add Quest right now");
    }
  };

  const fetchTasks = async () => {
    const response = await axios.get("/api/dashboard/tasks", {
      params: { dayId, category },
    });
    if (!response.data.success) toast.error("Cannot fetch quests");
    //console.log(response.data.data);

    setTaskList(response.data.data);
  };
  useEffect(() => {
    if (!dayId) return; // skip if dayId not ready yet
    fetchTasks();
  }, [dayId]); //Context resets on every refresh, so dayId always transitions from "" to the real value, triggering the effect every time.

  // edit task content
  const updateTask = async (taskId: string, updatedText: string) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, task: updatedText } : task,
      ),
    );

    try {
      const response = await axios.patch("/api/dashboard/tasks", {
        taskId,
        dayId,
        updatedText,
      });
      if (response.data.success) toast.success("Task Updated");
    } catch (error) {
      toast.error("Task update failed");
    }
  };

  // mark task as complete
  async function taskComplete(taskId: string, newStatus: boolean) {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task._id === taskId) {
          newStatus = !task.isCompleted; // capture new value here
          console.log("newStatus calculated: ", newStatus);
          return { ...task, isCompleted: newStatus };
        }
        return task;
      }),
    );

    try {
      await axios.patch("/api/dashboard/tasks/complete", {
        taskId,
        dayId,
        resultStatus: newStatus!, // send new value
      });
    } catch (error) {
      toast.error("Task update failed");
    }
  }

  // delete task
  async function deleteTask(taskId: string) {
    setTaskList((prev) => prev.filter((task) => task._id !== taskId));
    try {
      const response = await axios.delete(
        `/api/dashboard/tasks?taskId=${taskId}&dayId=${dayId}`,
      );

      if (response.data.success) toast.success("Task Deleted");
    } catch (error) {
      toast.error("Task deletion failed");
    }
  }

  return (
    <>
      <form
        onSubmit={addTask}
        className="flex flex-col items-center justify-center m-4"
      >
        <label className="text-3xl" htmlFor="addTask">
          Add your Main Quest
        </label>
        <div>
          <input
            type="text"
            id="addTask"
            placeholder="Add task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="bg-white text-black text-2xl p-1 rounded-l-sm"
          />
          <button className="bg-green-800 text-white text-2xl p-1 px-2 rounded-r-sm">
            Add Task
          </button>
        </div>
      </form>

      <div>
        {taskList.map((todo) => (
          <div key={todo._id}>
            <TaskItems
              todo={todo}
              updateTask={updateTask}
              taskComplete={taskComplete}
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskForm;
