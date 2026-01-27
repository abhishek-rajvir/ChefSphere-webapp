import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  // get user data from auth context
  const { user, isAuthenticated } = useAuth();

  // if user is not logged in, redirect to login
  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }
  // compare if role is provided check if role is same as user role || allow all
  if (role && user.role !== role) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/" replace />;
  }

  // return children routes
  return children;
}
