import { Router } from "express";
import { createTask } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", createTask);
