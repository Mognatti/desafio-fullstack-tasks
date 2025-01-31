import { userRoutes } from "./routes/user.routes";
import { authRoute } from "./routes/auth.routes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`API rodando em: ${port}`));
