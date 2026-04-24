"use client";
import { useState } from "react";
import { Category, ITask } from "@/types/Models.Types";
import useTask from "@/hooks/useTask";

import { useDayHook } from "@/hooks/useDayHook";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCrown } from "react-icons/fa6";

function TaskItems({ todo }: { todo: ITask }) {
  // get task crud from useTask
  const { deleteTask, taskComplete, updateTask } = useTask();
  const [taskTitle, setTaskTitle] = useState(todo.title);
  const [isTaskEditable, setIsTaskEditable] = useState(true);

  const { currentDate } = useDayHook();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // edit task
  const editTask = () => {
    if (currentDate.getTime() < today.getTime())
      return toast.error("Day already passed, cannot edit task");
    setIsTaskEditable(false); // just enable editing, don't save yet
  };

  const saveTask = () => {
    setIsTaskEditable(true); // disable editing
    updateTask(todo._id!, taskTitle); // now save
  };

  const deleteTaskItem = () => {
    if (currentDate.getTime() < today.getTime()) {
      toast.error("Day already passed, cannot delete task");
      return;
    }
    deleteTask(todo._id!);
  };

  const styleMain = <FaCrown />;

  return (
    <>
      <div
        className={`text-white bg-amber-100 rounded-lg flex  justify-between w-full items-center mb-1 mt-1`}
        style={{
          background:
            todo.taskType === "mainQuest"
              ? "radial-gradient(circle, #92400e 0%, #1c0a00 100%)"
              : "radial-gradient(circle, #57534e 0%, #292524 100%)",
        }}
      >
        <div className="flex items-center w-full flex-col ">
          <div className="w-full px-1 ">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              disabled={isTaskEditable}
              className={`w-full p-1 ${isTaskEditable ? "" : "bg-green-200 border-2 border-black rounded-sm text-black"}`}
            />
          </div>
          <div className="flex items-center w-11/12 justify-between ">
            <div className="flex items-center gap-2">
              <button
                onClick={() => taskComplete(todo._id!)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                ${todo.isCompleted ? "bg-green-500" : "bg-red-800"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 
                  ${todo.isCompleted ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
              <span className={`text-yellow-500 rounded-sm text-2xl`}>
                {todo.taskType === "mainQuest" && styleMain}
              </span>
            </div>

            <div className="flex gap-1">
              <button
                onClick={isTaskEditable ? editTask : saveTask}
                className="text-2xl text-amber-100 p-1"
              >
                {isTaskEditable ? <FaEdit /> : <FaSave />}
              </button>
              <button
                className="text-2xl text-amber-100 p-1"
                onClick={deleteTaskItem}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItems;
