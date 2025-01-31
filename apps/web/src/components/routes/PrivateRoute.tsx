import { Navigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useSession();
  return token ? children : <Navigate to="/login" />;
}
