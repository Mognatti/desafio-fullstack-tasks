import { User } from "./user.type";

export type Task = {
  createdAt: string;
  description: string;
  id: number;
  title: string;
  userId: number;
  status: "pendente" | "concluida";
};

export type UpdateTaskProps = {
  task: Task;
  user: User;
};
