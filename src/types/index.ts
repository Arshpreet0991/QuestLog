export interface Task {
  _id: string;
  content: string;
  taskType: string;
  category: string;
  dayId: string;
  isCompleted: boolean;
}
