import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ reason: "AUTH_REQUIRED" }} />;
  }

  if (role && user?.type !== role) {
    return <Navigate to="/" replace state={{ reason: "FORBIDDEN" }} />;
  }

  return children;
}
