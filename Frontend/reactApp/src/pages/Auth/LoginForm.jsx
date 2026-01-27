import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [forms, setForms] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const data = sessionStorage.getItem("userCred");
    if (data) {
      console("User is already logged in");
      const user = JSON.parse(data); // parse string to object
      if (user.type === "CREATOR") {
        navigate(`/creators/`, { replace: true });
      } else {
        // navigate(`/foodies/${user.id}`, { replace: true });
        navigate(`/foodies/`, { replace: true });
      }
    }
  }, []); // run once

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
    }

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const res = await UserService.loginUser(forms);

      sessionStorage.setItem(
        "userCred",
        JSON.stringify({
          id: res.id,
          name: res.username,
          token: res.token,
          type: res.type,
        }),
      );

      if (res.type === "CREATOR") {
        // navigate(`/creators/${res.id}`, { replace: true });
        navigate(`/creators/`, { replace: true });
      } else {
        navigate(`/foodies/`, { replace: true });
      }
    } catch (e) {
      console.error(e);
      toast.error(e?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
                <Label htmlFor="password">Password</Label>
                {/* <PasswordInput/> */}
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
