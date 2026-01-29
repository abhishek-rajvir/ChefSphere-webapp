import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  AuthContext = a global container that provides:

  authentication state

  authentication functions

  to any component inside AuthProvider.

  | Method/Attribute    | Functionality            |
  | ----------------- | --------------------------- |
  | `user`            | Current logged-in user data |
  | `login()`         | Function to log in user     |
  | `logout()`        | Function to log out user    |
  | `isAuthenticated` | Boolean auth status         |

*/

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  // user state Lazy init — runs BEFORE first render
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("userCred");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // login function
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("userCred", JSON.stringify(userData));
  };

  // logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userCred");
    navigate("/login", { replace: true });
  };

  // authentication status
  const isAuthenticated = Boolean(user?.token);

  // return AuthContext.Provider
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
