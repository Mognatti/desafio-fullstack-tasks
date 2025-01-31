export type CreateTaskProps = {
  title: string;
  description?: string;
  userId: number;
};

export type UpdateTasksProps = {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  userId: number;
};
