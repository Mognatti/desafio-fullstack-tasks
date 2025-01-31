import { CustomError } from "../../utils/class.error";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt-ts";

const prisma = new PrismaClient();

export type LoginProps = {
  email: string;
  password: string;
};
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

export default class AuthService {
  async login({ email, password }: LoginProps) {
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
  }
}
