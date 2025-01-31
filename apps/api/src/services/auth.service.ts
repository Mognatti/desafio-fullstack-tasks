import { CustomError } from "../../utils/class.error";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt-ts";

const prisma = new PrismaClient();

export type LoginProps = {
  email: string;
  password: string;
};
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

export default class AuthService {
  async login({ email, password }: LoginProps) {
    if (!email || !password) {
      throw new CustomError("Email e senha obrigatórios", 400);
    }
    try {
      const user = await prisma.user.findUnique({ where: { email }, include: { tasks: true } });

      if (!user) {
        throw new CustomError("Usuário não encontrado", 404);
      }

      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new CustomError("Senha incorreta", 401);
      }

      if (!JWT_SECRET) {
        return { user: "Problema no import do JWT_SECRET, arrumar futuramente", token: null };
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET);

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        tasks: user.tasks,
      };
      return { user: userData, token };
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError("Erro ao fazer login", 500);
      } else {
        throw error;
      }
    }
  }

  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new CustomError("Nome, email e senha obrigatórias", 400);
    }
    try {
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      if (user) {
        return this.login({ email, password });
      }
      throw new CustomError("Erro ao criar usuário", 500);
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError("Erro ao criar usuário", 500);
      } else {
        throw error;
      }
    }
  }
}
