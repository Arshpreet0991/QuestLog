import { useTaskContext } from "@/context/TaskContext";
import { ITask } from "@/types/Models.Types";

export function useRank() {
  const { taskList } = useTaskContext();
  if (!taskList) return;
  if (taskList.length === 0) return;

  const allTasksCompleted = taskList.every((task) => task.isCompleted);
  if (allTasksCompleted) return "SSS";

  const mainQuestCount = taskList.reduce((acc, task) => {
    if (task.taskType === "mainQuest" && task.isCompleted) {
      acc += 1;
    }
    return acc;
  }, 0);

  if (mainQuestCount === 3) return "S";
  if (mainQuestCount === 2) return "A";
  if (mainQuestCount === 1) return "B";

  const hasAnySideQuestDone = taskList.some(
    (task) => task.taskType === "sideQuest" && task.isCompleted,
  );

  if (hasAnySideQuestDone) return "C";

  return "D";
}
