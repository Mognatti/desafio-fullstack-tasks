import { Request, Response } from "express";
import AuthService from "../services/auth.service";

const authService = new AuthService();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json(error);
  }
}
