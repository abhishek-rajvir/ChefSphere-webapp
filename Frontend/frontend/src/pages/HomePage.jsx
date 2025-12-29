import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

function Component() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = AuthService.Get();
    setUser(u);

    if (!u) {
      navigate("/login", { replace: true });
    } else if (u.type === "CREATOR") {
      navigate("/creators", { replace: true });
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  if (user.type === "CREATOR") {
    return null;
  }

  return <h4>User is Foodie</h4>;
}

export default Component;
