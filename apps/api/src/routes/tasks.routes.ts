import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", (req, res) => {
  res.status(200).send("Base para a pesquisa e manipulação de tarefas");
});

taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.get("/:userId", getTasks);
taskRoutes.delete("/:userId/:taskId", deleteTask);

export { taskRoutes };
