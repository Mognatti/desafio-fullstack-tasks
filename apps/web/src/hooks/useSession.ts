import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login usuário");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  return { user, token, login, logout };
};
