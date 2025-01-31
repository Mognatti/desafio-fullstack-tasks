import { Router } from "express";
import { createTask } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", (req, res) => {
  res.status(200).send("Base para a pesquisa e manipulação de tarefas");
});

taskRoutes.post("/", createTask);

export { taskRoutes };
