"use client";

import { useEffect, useState } from "react";
import useTask from "@/hooks/useTask";
import { Category, TaskType } from "@/types/Models.Types";
import { useTaskContext } from "@/context/TaskContext";

function TaskForm({ category }: { category: Category }) {
  const [task, setTask] = useState({
    title: "",
    isCompleted: false,
    taskType: "mainQuest" as TaskType,
    category,
  });

  const { taskList } = useTaskContext();

  const isMainQuest = !taskList.some(
    (t) => t.category === task.category && t.taskType === "mainQuest",
  );

  const { addTask } = useTask({ task });
  const addTaskToList = (e: React.SubmitEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <>
      <form
        onSubmit={addTaskToList}
        className="flex flex-col items-center justify-center m-4"
      >
        <label className="text-3xl" htmlFor="addTask">
          Add your {isMainQuest ? "Main" : "Side"} Quest
        </label>
        <div>
          <input
            type="text"
            id="addTask"
            placeholder="Add task..."
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="bg-white text-black text-2xl p-1 rounded-l-sm"
          />
          <button className="bg-green-800 text-white text-2xl p-1 px-2 rounded-r-sm">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
