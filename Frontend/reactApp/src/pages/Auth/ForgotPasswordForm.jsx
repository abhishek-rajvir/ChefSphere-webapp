import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import EmailService from "../../service/EmailService";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = () => {
    const emailValue = formData.email.trim();
    if (emailValue === "") {
      setError("Email cannot be blank");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      const promise = EmailService.sendOtp(formData.email);

      toast.promise(
        promise,
        {
          loading: "Sending OTP...",
          success: "OTP sent to email " + formData.email,
          error: "Failed to send OTP",
        },
        {
          success: {
            duration: 5000,
          },
        },
      );

      await promise;
    } catch (e) {
      console.error(e);
      // Toast handled by promise
    }
  };

  const validateReset = () => {
    if (!validateEmail()) return false;

    if (!formData.otp.trim()) {
      setError("OTP is required");
      return false;
    }

    if (!formData.password) {
      setError("New password is required");
      return false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/.test(
        formData.password,
      )
    ) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateReset()) return;

    try {
      const promise = EmailService.validateOtp(
        formData.email,
        formData.otp,
        formData.password,
      );

      toast.promise(promise, {
        loading: "Resetting password...",
        success: "Reset success",
        error: "Failed to reset password please check OTP and other details",
      });

      await promise;
      navigate("/login");
    } catch (e) {
      console.error(e);
      // Toast handled by promise
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Reset Password <ModeToggle />
          </CardTitle>
          <CardDescription>
            Enter your email to receive an OTP, then reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSendOtp}
                  className="whitespace-nowrap">
                  Send OTP
                </Button>
              </div>
            </div>

            {/* OTP Field */}
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-16"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2">
                  {showPassword ? "hide" : "show"}
                </Button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pr-16"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2">
                  {showConfirmPassword ? "hide" : "show"}
                </Button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleResetPassword} className="w-full">
              Reset Password
            </Button>

            <div className="text-center text-sm">
              <Link to="/login" className="underline">
                Back to Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
