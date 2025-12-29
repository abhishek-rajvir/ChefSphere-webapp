import { useEffect, useState } from "react";

import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({});

  useEffect(() => {
    const data = sessionStorage.getItem('userCred');
    if (data) {
      console("User is already logged in")
      const user = JSON.parse(data); // parse string to object
      if (user.type === "CREATOR") {
        navigate(`/creators/${user.id}`, { replace: true });
      } else {
        navigate(`/foodies/${user.id}`, { replace: true });
      }
    }
  }, []); // run once 


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const res = await UserService.loginUser(forms);
      alert("Login successful");
      console.log(res);
      sessionStorage.setItem('userCred', 
        JSON.stringify({
            id: res.id,
            name: res.username,
            token: res.token,
            type : res.type,
        })
      );
      // Redirect based on user type
      if (res.type === "CREATOR") {
        navigate(`/creators`, { replace: true });
      } else {
        navigate(`/foodies`, { replace: true });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const validate = () => {
    let errors = {};
    const email = forms.email.trim();
    const password = forms.password;

    if (!email) errors.email = "Email cannot be blank";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";

    if (!password) errors.password = "Password cannot be blank";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/.test(password)
    )
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">User Login</h3>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="abc@example.com"
            value={forms.email}
            onChange={(e) => setForms({ ...forms, email: e.target.value })}
          />
          {err.email && (
            <div className="form-text text-danger">{err.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="ab&c21!"
              value={forms.password}
              onChange={(e) => setForms({ ...forms, password: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {err.password && (
            <div className="form-text text-danger">{err.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
