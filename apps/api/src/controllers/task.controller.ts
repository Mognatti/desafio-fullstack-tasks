import TaskService from "../services/task.service";
import { Request, Response } from "express";

const taskService = new TaskService();

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, userId } = req.body;
    const createdTask = await taskService.createTask({ title, description, userId });
    res.status(201).json({
      status: 201,
      success: true,
      error: false,
      message: "Tarefa criada com sucesso",
      data: createdTask,
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      status: error.status ?? 500,
      success: false,
      error: true,
      message: `Erro ao criar tarefa: ${error.message}`,
      data: null,
    });
  }
}
