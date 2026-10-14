
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = "http://localhost:5000/api/auth/login";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Declare variables before using them
    const email = formData.email.trim();
    const password = formData.password;
    const selectedRole = formData.role;

    if (!email || !password.trim() || !selectedRole) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok || data.success !== true) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Get user details from backend
      const user = data.user;

      if (!user || !user.role) {
        setError("User details or role missing in backend response.");
        return;
      }

      // Declare role before using it
      const role = String(user.role).trim().toLowerCase();

      // Verify selected role against database role
      if (role !== selectedRole.toLowerCase()) {
        setError("Please select the correct role for this account.");
        return;
      }

      // Save logged-in user details
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userName", user.name || "");
      localStorage.setItem("userRole", user.role);

      console.log("Login successful. Role:", role);

      // Navigate according to role
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "faculty") {
        navigate("/faculty", { replace: true });
      } else if (role === "user" || role === "student") {
        navigate("/Dashboard", { replace: true });
      } else {
        setError("Unsupported account role: " + user.role);
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Backend connect aagala. Node.js server running-aa check pannunga."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Login Form */}
        <div className="login-form-section">
          <h1>Welcome Back!</h1>

          <p>
            Login to continue your EventFlow learning journey.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="login-input-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Role */}
            <div className="login-input-group">
              <label htmlFor="role">Login As</label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="User">User / Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Forgot Password */}
            <div className="login-forgot-password">
              <span
                onClick={() => navigate("/ForgotPassword")}
              >
                Forgot Password?
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Sign Up */}
          <p className="login-signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/SignUp")}>
              Sign Up
            </span>
          </p>
        </div>

        {/* Welcome Panel */}
        <div className="login-welcome-section">
          <h2>EventFlow</h2>

          <p>
            Smart Educational Event Management and Learning
            Path Platform
          </p>

          <div className="login-welcome-decoration">
            Learn. Participate. Grow.
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
