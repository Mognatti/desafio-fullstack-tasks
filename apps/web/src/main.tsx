import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import AppRouter from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
