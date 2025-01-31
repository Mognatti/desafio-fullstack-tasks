import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`API rodando em: ${port}`));
