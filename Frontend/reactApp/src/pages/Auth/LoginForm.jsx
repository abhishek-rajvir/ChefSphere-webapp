import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../service/UserService";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "../../utils/context/AuthContext";

export default function LoginForm() {
  // navigate
  const navigate = useNavigate();

  // context
  const { user, isAuthenticated, login } = useAuth();

  // state for show password
  const [showPassword, setShowPassword] = useState(false);

  // state for form data
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });

  // state for form errors
  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User is already logged in");
      if (user.type === "CREATOR") {
        navigate("/creator", { replace: true });
      } else if (user.type === "FOODIE") {
        navigate("/foodie", { replace: true });
      } else navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, user]); // run once

  const validate = () => {
    const errors = {};
    const email = forms.email.trim();
    const password = forms.password.trim();

    if (email === "") {
      errors.email = "Email cannot be blank";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (password === "") {
      errors.password = "Password cannot be blank";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/.test(password)
    ) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
      toast.warn(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
      );
    }

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const loginPromise = UserService.loginUser(forms);

      toast.promise(loginPromise, {
        loading: "Logging in...",
        success: "Login successful",
        error: "Login failed",
      });

      // WAIT for the promise to resolve
      const res = await loginPromise;

      // Save actual user object
      login(res);

      // Role-based navigation
      if (res.type === "CREATOR") {
        navigate("/creator", { replace: true });
      } else if (res.type === "FOODIE") {
        navigate("/foodie", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    // login form
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Login <ModeToggle />
          </CardTitle>
          <CardDescription>Enter your email below</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@example.com"
                  value={forms.email}
                  onChange={(e) =>
                    setForms((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                {err.email && (
                  <p className="text-sm text-red-500">{err.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot"
                    className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="abc@123"
                    className="pr-16"
                    required
                    onChange={(e) =>
                      setForms((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2">
                    {showPassword ? "hide" : "show"}
                  </Button>
                </div>
                {err.password && (
                  <p className="text-sm text-red-500">{err.password}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button type="button" onClick={handleSubmit} className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                // navigate to register page
                onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
