import { Navigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { token } = useSession();
  return token ? <Navigate to="/" /> : children;
}
