import { Navigate } from "react-router-dom";
import AuthService from "../service/AuthService";

export default function AuthFilter({ Component, ...props }) {
  let data = AuthService.Get();
  data = JSON.parse(data);
  if (!data) {
    return <Navigate to="/login" replace />;
  }
  if (Component === "empty") {
    if (data.type.toUpperCase() === "CREATOR") {
      return <Navigate to="/creators" replace />;
    }
    return <Navigate to="/foodies" replace />;
  }
  return <Component {...props} />;
}
