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

export async function deleteTask(req: Request, res: Response) {
  try {
    const { userId, taskId } = req.params;
    const deletedTask = await taskService.deleteTask(Number(userId), Number(taskId));
    res.status(200).json({
      status: 200,
      success: true,
      error: false,
      message: "Tarefa deletada com sucesso",
      data: deletedTask,
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      status: error.status ?? 500,
      success: false,
      error: true,
      message: `Erro ao deletar tarefa: ${error.message}`,
      data: null,
    });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const tasks = await taskService.getUserTasks(Number(userId));
    res.status(200).json({
      status: 200,
      success: true,
      error: false,
      message: "Tarefas encontradas com sucesso",
      data: tasks,
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      status: error.status ?? 500,
      success: false,
      error: true,
      message: `Erro ao buscar tarefas: ${error.message}`,
      data: null,
    });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id, title, description, status, userId } = req.body;
    const updatedTask = await taskService.updateTask({ id, title, description, status, userId });
    res.status(200).json({
      status: 200,
      success: true,
      error: false,
      message: "Tarefa atualizada com sucesso",
      data: updatedTask,
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      status: error.status ?? 500,
      success: false,
      error: true,
      message: `Erro ao atualizar tarefa: ${error.message}`,
      data: null,
    });
  }
}
