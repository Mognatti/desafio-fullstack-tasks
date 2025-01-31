import { createContext, useState, ReactNode, useEffect, useMemo } from "react";
import { User } from "../types/user.type";

type SessionContextType = {
  token: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

const defaultValue: SessionContextType = {
  token: null,
  user: null,
  setUser: () => {},
  setToken: () => {},
};

export const SessionContext = createContext<SessionContextType>(defaultValue);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  const value = useMemo(() => ({ token, user, setUser, setToken }), [token, user]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
