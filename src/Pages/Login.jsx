
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email.trim() ||
      !formData.password ||
      !formData.role
    ) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid login details.");
        return;
      }

      // Save logged-in user
      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      // Save token if backend returns one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Role-based navigation
      if (data.user.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === "Faculty") {
        navigate("/faculty-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        "Cannot connect to server. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img
        src="/login-bg.jpeg"
        alt="EventFlow Background"
        className="login-background"
      />

      <div className="login-overlay"></div>

      <div className="login-form">
        <div className="login-header">
          <h1>EventFlow</h1>
          <h2>Welcome Back</h2>
          <p>
            Login to continue managing and exploring events
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="input-group">
            <label>Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="forgot-password">
            <button type="button" onClick={() => navigate("/forgot-password")} >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn" disabled={loading} >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          <span>Don't have an account?</span>
          <button type="button" onClick={() => navigate("/signup")} >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;