import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import { SessionProvider } from "./context/SessionContext";
import PublicRoute from "./components/routes/PublicRoute";
import { GlobalStyle } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { useSession } from "./hooks/useSession";
import { theme } from "./styles/theme";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { useEffect } from "react";
import "./styles/global.css";

const LogoutHandler = () => {
  const { logout } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null;
};
export default function AppRouter() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SessionProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/logout" element={<LogoutHandler />} />
          </Routes>
        </Router>
      </SessionProvider>
    </ThemeProvider>
  );
}
