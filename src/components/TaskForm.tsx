"use client";

import { useEffect, useState } from "react";
import useTask from "@/hooks/useTask";
import { Category, TaskType } from "@/types/Models.Types";
import { useTaskContext } from "@/context/TaskContext";
import QuestTitleDisplay from "./QuestTitleDisplay";
import DateNav from "./DateNav";

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

  const { addTask } = useTask();

  const addTaskToList = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (task.title === "") return;
    addTask({ task });
    setTask({ ...task, title: "" });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <form
          onSubmit={addTaskToList}
          className="flex flex-col items-center justify-center mt-2 w-full"
        >
          <DateNav />

          <div className="flex w-full justify-center mt-1">
            <input
              type="text"
              id="addTask"
              maxLength={25}
              placeholder={`Add ${isMainQuest ? "Main" : "Side"} Task...`}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="bg-white text-black text-xl p-1 rounded-l-sm flex-1"
            />
            <button className="bg-green-800 text-white text-2xl p-1 px-2 rounded-r-sm">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
