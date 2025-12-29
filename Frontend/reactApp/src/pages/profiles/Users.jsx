import { useState } from "react";


export default function Users() {
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    if (validate()) {
      console.log("Form submitted!", forms);
      alert("Registered Successfully!");
    } else {
      console.log("Validation failed");
    }
  };

  const validate = () => {
    let errors = {};
    const email = forms.email ? forms.email.trim() : "";
    const password = forms.password ? forms.password : "";

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
        password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
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
          }}
        >
          <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
            Creator Registration Form
          </h4>

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

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
