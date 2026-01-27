import { useState } from "react";
import { toast } from "react-hot-toast";
import UserService from "../../../service/UserService";
import CreatorService from "../../../service/CreatorService";

export default function CreatorSignUp() {
  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [err, setErr] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      if (UserService.checkUserName(forms.username)) {
        setErr({ ...err, username: "Username already exists" });
        return;
      }
      const res = await CreatorService.RegisterCreator(forms);
      toast.success("Registeration successful");
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  };

  const validate = () => {
    let errors = {};
    const firstName = forms.firstName ? forms.firstName.trim() : "";
    const lastName = forms.lastName ? forms.lastName.trim() : "";
    const email = forms.email ? forms.email.trim() : "";
    const password = forms.password ? forms.password : "";
    const username = forms.username ? forms.username.trim() : "";

    // Name validation
    if (!firstName) {
      errors.firstName = "FirstName cannot be blank";
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      errors.firstName = "FirstName cannot have numbers or special characters";
    } else if (firstName.length < 2) {
      errors.firstName = "FirstName should have at least 2 characters";
    }

    if (!lastName) {
      errors.lastName = "lastName cannot be blank";
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      errors.lastName = "lastName cannot have numbers or special characters";
    } else if (lastName.length < 2) {
      errors.lastName = "lastName should have at least 2 characters";
    }

    // Username validation
    if (!username) {
      errors.username = "Username cannot be blank";
    } else if (username.length < 5) {
      errors.username = "Username should have at least 5 characters";
    }

    // Email validation
    if (!email) {
      errors.email = "Email cannot be blank";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      errors.password = "Password cannot be blank";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      )
    ) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }

    if (!forms.username) {
      errors.username = "Username cannot be blank";
    } else if (!/^[a-zA-Z0-9_]+$/.test(forms.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
    } else if (forms.username.trim().length < 5) {
      errors.username = "Username must be at least 5 characters long";
    } else if (forms.username.trim().length > 20) {
      errors.username = "Username cannot exceed 20 characters";
    }

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div
      style={{
        overflowY: "auto",
        minHeight: "100vh",
        padding: "20px",
        background: "white",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            backgroundColor: "white",
          }}>
          <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
            Creator Registration Form
          </h4>

          {/* FirstName */}
          <div className="mb-3">
            <label className="form-label">FirstName</label>
            <input
              type="text"
              placeholder="Ajay"
              onChange={(e) =>
                setForms({ ...forms, firstName: e.target.value })
              }
              className="form-control"
              value={forms.firstName}
            />
            {err.firstName && (
              <div className="form-text" style={{ color: "red" }}>
                {err.firstName}
              </div>
            )}
          </div>

          {/* LastName */}
          <div className="mb-3">
            <label className="form-label">LastName</label>
            <input
              type="text"
              placeholder="Pal"
              onChange={(e) => setForms({ ...forms, lastName: e.target.value })}
              className="form-control"
              value={forms.lastName}
            />
            {err.lastName && (
              <div className="form-text" style={{ color: "red" }}>
                {err.lastName}
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Ajay_Pal211"
              onChange={(e) => setForms({ ...forms, username: e.target.value })}
              className="form-control"
              value={forms.username}
            />
            {err.username && (
              <div className="form-text" style={{ color: "red" }}>
                {err.username}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              placeholder="abc@example.com"
              onChange={(e) => setForms({ ...forms, email: e.target.value })}
              className="form-control"
              value={forms.email}
            />
            {err.email && (
              <div className="form-text" style={{ color: "red" }}>
                {err.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="ab&c21!"
              className="form-control"
              onChange={(e) => setForms({ ...forms, password: e.target.value })}
              value={forms.password}
            />
            {err.password && (
              <div className="form-text" style={{ color: "red" }}>
                {err.password}
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={forms.gender === "male"}
                  onChange={(e) =>
                    setForms({ ...forms, gender: e.target.value })
                  }
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={forms.gender === "female"}
                  onChange={(e) =>
                    setForms({ ...forms, gender: e.target.value })
                  }
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            {err.gender && (
              <div className="form-text" style={{ color: "red" }}>
                {err.gender}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
