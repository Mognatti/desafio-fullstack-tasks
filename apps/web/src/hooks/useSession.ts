import { SessionContext } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task.type";
import { useContext } from "react";

export const useSession = () => {
  const context = useContext(SessionContext);
  const url = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useSession deve ser usado dentro de um SessionProvider");
  }

  const { user, token, setUser, setToken } = context;

  async function login(email: string, password: string) {
    try {
      const response = await fetch(`${url}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.status === 404) {
        localStorage.clear();
        return {
          status: 401,
          message: data.name,
        };
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setToken(data.token);
        navigate("/");
        return data;
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao fazer login" };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  function updateUserTasks(tasks: Task[]) {
    if (user) {
      const updatedUser = { ...user, tasks };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Persistir no localStorage
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === 404) {
        localStorage.clear();
        return {
          status: data.status,
          message: data.message,
        };
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setToken(data.token);
        navigate("/");
        return { status: 201, message: "Usuário criado com sucesso" };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  return { user, token, login, logout, updateUserTasks, register };
};
