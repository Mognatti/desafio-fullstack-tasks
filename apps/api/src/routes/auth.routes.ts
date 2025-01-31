import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/", login);
authRoute.post("/register", register);

export { authRoute };
