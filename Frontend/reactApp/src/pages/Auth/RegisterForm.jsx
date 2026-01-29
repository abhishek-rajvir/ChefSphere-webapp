import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import UserService from "@/service/UserService";
import { ModeToggle } from "@/components/mode-toggle";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ ...props }) {
  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "MALE",
    type: "FOODIE",
    description: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState({});

  const validate = async () => {
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

    if (forms.confirmPassword === "") {
      errors.confirmPassword = "Confirm Password cannot be blank";
    } else if (forms.confirmPassword !== forms.password) {
      errors.confirmPassword = "Confirm Password does not match";
    }

    if (forms.firstName === "") {
      errors.firstName = "First name cannot be blank";
    }
    if (forms.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters long";
    }
    if (forms.lastName === "") {
      errors.lastName = "Last name cannot be blank";
    }
    if (forms.lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters long";
    }

    if (forms.username === "") {
      errors.username = "User name cannot be blank";
    }
    if (forms.username.length < 6) {
      errors.username = "User name must be at least 3 characters long";
    }
    try {
      await UserService.checkUserName(forms.username);
    } catch (e) {
      errors.username = "User name already exists";
    }

    try {
      await UserService.checkEmail(forms.email);
    } catch (e) {
      errors.email = "Email already exists";
    }

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const registerPromise = await UserService.registerUser(forms);

      toast.promise(registerPromise, {
        loading: "Registering...",
        success: "Register successful",
        error: "Register failed",
      });

      console.error("Registered successfully");
      navigate(`/login`, { replace: true });
    } catch (e) {
      console.error(e);
      toast.error(e?.message || "Register failed");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-vh-100 bg-background p-4">
      <Card className="w-[400px]" {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Create an account Login <ModeToggle />
          </CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">Firstname</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  onChange={(e) =>
                    setForms((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  required
                />
                {err.firstName && (
                  <p className="text-sm text-red-500">{err.firstName}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Lastname</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  onChange={(e) =>
                    setForms((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  required
                />
                {err.lastName && (
                  <p className="text-sm text-red-500">{err.lastName}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <div className="grid gap-2">
                  <Select
                    value={forms.gender}
                    onValueChange={(value) =>
                      setForms((prev) => ({ ...prev, gender: value }))
                    }
                    required>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {err.gender && (
                  <p className="text-sm text-red-500">{err.gender}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <div className="grid gap-2">
                  <Select
                    value={forms.type}
                    onValueChange={(value) =>
                      setForms((prev) => ({ ...prev, type: value }))
                    }
                    required>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOODIE">Foodie</SelectItem>
                      <SelectItem value="CREATOR">Creator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {err.type && <p className="text-sm text-red-500">{err.type}</p>}
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="joeR"
                  onChange={(e) =>
                    setForms((prev) => ({ ...prev, username: e.target.value }))
                  }
                  required
                />
                {err.username && (
                  <p className="text-sm text-red-500">{err.username}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="joeR@example.com"
                  onChange={(e) =>
                    setForms((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
                {err.email && (
                  <p className="text-sm text-red-500">{err.email}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                {err.password && (
                  <p className="text-sm text-red-500">{err.password}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="abc@123"
                    className="pr-16"
                    required
                    onChange={(e) =>
                      setForms((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2">
                    {showConfirmPassword ? "hide" : "show"}
                  </Button>
                </div>
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
                {err.confirmPassword && (
                  <p className="text-sm text-red-500">{err.confirmPassword}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Bio (Optional)</FieldLabel>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us a little about yourself..."
                  onChange={(e) =>
                    setForms((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Field>
              <FieldGroup>
                <Field>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full">
                    Create Account
                  </Button>
                  <FieldDescription className="px-6 text-center mt-2">
                    Already have an account?{" "}
                    <a href="/login" className="underline">
                      Sign in
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
