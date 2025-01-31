import { Task } from "./task.type";

export type User = {
  id: number;
  name: string;
  email: string;
  tasks: Task[];
};
