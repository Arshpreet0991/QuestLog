"use client";
import { useTaskContext } from "@/context/TaskContext";
import TaskItems from "../TaskItems";
import CategoryIconDisplay from "../taskComponents/CategoryIconDisplay";
import Link from "next/link";
import { IoIosHelpCircle } from "react-icons/io";

function ShowMainQuestDashboard() {
  const { taskList } = useTaskContext();

  const mainQuestList = taskList.filter(
    (task) => task.taskType === "mainQuest",
  );

  return (
    <>
      <div className="flex flex-col min-h-72 ">
        <span className="w-full bg-amber-950  text-xl text-center text-amber-100 font-bold border-2 border-amber-100 rounded-md mb-1 p-1">
          Your Main Quests for Today
        </span>

        <div className="text-black  ">
          {mainQuestList.map((task) => (
            <div key={task._id} className="w-full flex gap-1">
              <CategoryIconDisplay category={task.category} />
              <TaskItems todo={task} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 p-1 text-center">
          <Link
            href={"/dashboard/all-quests"}
            className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100 "
          >
            View All
          </Link>

          <Link
            href={"/dashboard/body"}
            className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100"
          >
            Add
          </Link>

          <Link
            href={"/dashboard/stats"}
            className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100"
          >
            Stats
          </Link>
          <Link
            href={"/dashboard/reflect"}
            className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100"
          >
            Reflect
          </Link>
        </div>
      </div>
    </>
  );
}

export default ShowMainQuestDashboard;
