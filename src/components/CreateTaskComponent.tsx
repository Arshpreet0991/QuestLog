"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useDate from "@/context/DateContext";
import toast from "react-hot-toast";
import TaskDisplay from "./TaskDisplay";
import { Task } from "@/types/index";
import ListItem from "./ListItem";

function CreateTaskComponent({ category }: { category: string }) {
  const { date, dayId } = useDate();
  date.setHours(0, 0, 0, 0);

  const [taskContent, setTaskContent] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const hasMainQuest = taskList.some((task) => task.taskType === "mainQuest"); // check if any array has a field value of "mainQuest"

  const task = {
    content: taskContent,
    taskType: hasMainQuest ? "sideQuest" : "mainQuest", // CHECK BACK HERE FOR VALUE
    category: category,
    dayId: dayId,
  };

  async function showTasks() {
    try {
      const response = await axios.get("/api/dashboard/tasks", {
        params: { dayId, category },
      });

      if (response.data.success) {
        setTaskList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching the task list: ", error);
    }
  }

  const addTask = async () => {
    // console.log(task);
    if (taskList.length >= 3)
      return toast.error("only 3 tasks per category is allowed");
    const response = await axios.post("/api/dashboard/tasks", task);
    setTaskContent("");
    showTasks();
    if (response.data.success) toast.success("task created");
  };

  useEffect(() => {
    if (!dayId) return;

    showTasks();
  }, [dayId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <label className="text-white text-5xl m-10" htmlFor="createTask">
        {hasMainQuest ? "Add your Side Quest" : "Add your Main Quest"}
      </label>
      <div className="flex">
        <input
          type="text"
          id="createTask"
          placeholder="Add Task..."
          className="bg-white text-black p-2 text-2xl rounded-l-sm flex-2"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />

        <button
          onClick={addTask}
          className=" bg-blue-500 px-2 py-2 text-2xl rounded-r-sm flex-1"
        >
          Add Task
        </button>
      </div>
      <div className="">
        <ListItem taskList={taskList} setTaskList={setTaskList} />
      </div>
    </div>
  );
}

export default CreateTaskComponent;
