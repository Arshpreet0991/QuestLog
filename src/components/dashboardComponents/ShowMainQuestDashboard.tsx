"use client";
import { useTaskContext } from "@/context/TaskContext";
import TaskItems from "../TaskItems";
import CategoryIconDisplay from "../taskComponents/CategoryIconDisplay";
import DateNav from "../DateNav";

function ShowMainQuestDashboard() {
  // const [mainQuestList, setmainQuestList] = useState<ITask[]>([]);

  const { taskList } = useTaskContext();

  //setmainQuestList(taskList.filter((task) => task.taskType === "mainQuest"));
  const mainQuestList = taskList.filter(
    (task) => task.taskType === "mainQuest",
  );

  return (
    <>
      <div className="flex flex-col min-h-72 ">
        <div className="flex items-center justify-between gap-2 p-1">
          <button className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100">
            View All
          </button>
          <button className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100">
            Add
          </button>
          <button className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100">
            Stats
          </button>
          <button className="bg-amber-950 px-2 py-1 rounded-md flex-1 border-amber-100 border-2 text-amber-100">
            Reflect
          </button>
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
