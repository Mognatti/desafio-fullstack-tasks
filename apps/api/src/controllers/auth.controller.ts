import { Request, Response } from "express";
import AuthService from "../services/auth.service";

const authService = new AuthService();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(401).json({ status: error.status ?? 401, message: error.message ?? "Usuário ou senha inválidos" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.register(name, email, password);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ status: error.status ?? 400, message: error.message ?? "Erro ao criar usuário" });
  }
}
