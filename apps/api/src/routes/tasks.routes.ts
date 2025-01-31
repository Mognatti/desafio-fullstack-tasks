import { Router } from "express";
import { createTask, deleteTask, getTasks } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", (req, res) => {
  res.status(200).send("Base para a pesquisa e manipulação de tarefas");
});

taskRoutes.get("/:userId", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.delete("/:userId/:taskId", deleteTask);

export { taskRoutes };
