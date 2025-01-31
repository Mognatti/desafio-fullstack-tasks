import { createUser, getUserData } from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", createUser);

userRoutes.get("/", (req, res) => {
  res.send(`Base para a pesquisa e manipulação de usuários`);
});

userRoutes.get("/:id", getUserData);

export { userRoutes };
