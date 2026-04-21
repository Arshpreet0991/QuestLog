"use client";
import { useTaskContext } from "@/context/TaskContext";
import TaskItems from "../TaskItems";
import CategoryIconDisplay from "../taskComponents/CategoryIconDisplay";

function ShowMainQuestDashboard() {
  // const [mainQuestList, setmainQuestList] = useState<ITask[]>([]);

  const { taskList } = useTaskContext();

  //setmainQuestList(taskList.filter((task) => task.taskType === "mainQuest"));
  const mainQuestList = taskList.filter(
    (task) => task.taskType === "mainQuest",
  );

  return (
    <>
      <div className="flex flex-col justify-center text-xl">
        <div className="flex items-center justify-between gap-2">
          <button className="bg-amber-950 px-2 py-1 rounded-sm">
            View All Quests
          </button>
          <button className="bg-amber-950 px-2 py-1 rounded-sm">
            Add More Quests
          </button>
        </div>
        <div className="text-black">
          {mainQuestList.map((task) => (
            <div key={task._id} className="w-full">
              <TaskItems todo={task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowMainQuestDashboard;
