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

  //   async deleteTask(id: number) {
  //     return prisma.task.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //   }

  //   async getTaskData(id: number) {
  //     const task = await prisma.task.findUnique({ where: { id } });
  //     if (!task) {
  //       throw new CustomError("Tarefa não encontrada", 404);
  //     }
  //     return task;
  //   }
}
