import { CustomError } from "../../utils/class.error";
import UserService from "../services/user.service";
import { Request, Response } from "express";
import { Result } from "../types/user.types";

const userService = new UserService();

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const createdUser = await userService.createUser({ name, email, password });
    res.status(201).json({
      status: 201,
      success: true,
      error: false,
      message: "Usuário criado com sucesso",
      data: createdUser,
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      status: error.status ?? 500,
      success: false,
      error: true,
      message: `Erro ao criar usuário: ${error.message}`,
      data: null,
    });
  }
}

export async function getUserData(req: Request, res: Response) {
  const result: Result = { status: 200, success: false, error: false, data: null, message: "" };
  try {
    const { id } = req.params;
    const userData = await userService.getUserData(Number(id));
    result.data = userData;
    result.success = true;
    result.message = "Usuário encontrado";
    res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof CustomError) {
      result.status = error.status;
      result.message = error.message;
      result.error = true;
      res.status(error.status).json(result);
    } else {
      result.error = true;
      result.message = `Erro ao buscar usuário: ${error.message}`;
      res.status(result.status).json(result);
    }
  }
}
