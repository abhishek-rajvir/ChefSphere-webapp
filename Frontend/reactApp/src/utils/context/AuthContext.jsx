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
  // user state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // use effect to get user from session storage
  useEffect(() => {
    // get user from session storage
    const storedUser = sessionStorage.getItem("userCred");
    // if user is present, store it in state else return null
    setUser(storedUser ? JSON.parse(storedUser) : null);

    // Event listener for unauthorized requests
    const handleLogout = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

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
