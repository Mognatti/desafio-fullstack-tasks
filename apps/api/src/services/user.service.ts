import { CreateUserProps, UpdateUserProps } from "../types/user.types";
import { CustomError } from "../../utils/class.error";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

export default class UserService {
  // TBD: Customizar o erro quando o usuário já existir
  async createUser({ email, name, password }: CreateUserProps) {
    try {
      const hashedPassword = await hash(password, 10);

      const createdUser = prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return createdUser;
    } catch (error: any) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async updateUser(id: number, { email, name, password }: UpdateUserProps) {
    let hashedPassword = password;

    if (password) {
      hashedPassword = await hash(password, 10);
    }

    return prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserData(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
    }
    return user;
  }
}
