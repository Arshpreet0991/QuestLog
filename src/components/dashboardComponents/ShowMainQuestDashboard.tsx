"use client";
import { useTaskContext } from "@/context/TaskContext";
import TaskItems from "../TaskItems";
import CategoryIconDisplay from "../taskComponents/CategoryIconDisplay";
import Link from "next/link";
import ViewAllTaskDisplay from "../taskComponents/ViewAllTaskDisplay";

function ShowMainQuestDashboard() {
  const { taskList } = useTaskContext();

  const mainQuestList = taskList.filter(
    (task) => task.taskType === "mainQuest",
  );

  return (
    <>
      <div className="flex flex-col min-h-72 ">
        <div className="flex items-center justify-between gap-2 p-1">
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
        <div className="text-black  ">
          {mainQuestList.map((task) => (
            <div key={task._id} className="w-full flex gap-1">
              <CategoryIconDisplay category={task.category} />
              <TaskItems todo={task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowMainQuestDashboard;
