import { CreateTaskProps } from "../types/task.types";
import { CustomError } from "../../utils/class.error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class TaskService {
  async createTask({ title, description, userId }: CreateTaskProps) {
    try {
      const createdTask = await prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });

      return createdTask;
    } catch (error: any) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  //   async updateTask(id: number, { title, description }: UpdateTaskProps) {
  //     return prisma.task.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         title,
  //         description,
  //       },
  //     });
  //   }

  async deleteTask(userId: number, id: number) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new CustomError("Tarefa nao encontrada", 404);
    }

    if (task.userId !== userId) {
      throw new CustomError("Usuário nao autorizado", 401);
    }

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async getUserTasks(userId: number) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        throw new CustomError("Usuário nao encontrado", 404);
      }

      const tasks = await prisma.task.findMany({
        where: {
          userId,
        },
      });

      return tasks;
    } catch (error: any) {
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }

  //   async getTaskData(id: number) {
  //     const task = await prisma.task.findUnique({ where: { id } });
  //     if (!task) {
  //       throw new CustomError("Tarefa não encontrada", 404);
  //     }
  //     return task;
  //   }
}
