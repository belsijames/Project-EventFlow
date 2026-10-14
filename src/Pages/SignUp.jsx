
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const initialForm = {
  name: "",
  email: "",
  department: "",
  designation: "",
  year: "",
  course: "",
  interest: "",
  learningMode: "Online",
  skillLevel: "Beginner",
  password: "",
  confirmPassword: "",
  role: "User",
};

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            department: formData.department,
            designation:
              formData.role === "Faculty"
                ? formData.designation
                : "",
            year: formData.role === "User" ? formData.year : "",
            course: formData.role === "User" ? formData.course : "",
            interest:
              formData.role === "User" ? formData.interest : "",
            learningMode:
              formData.role === "User"
                ? formData.learningMode
                : "",
            skillLevel:
              formData.role === "User"
                ? formData.skillLevel
                : "",
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      setFormData(initialForm);
      setMessage("Account created successfully! Please login.");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        "Cannot connect to server. Check whether backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <img
        src="/login-bg.jpeg"
        alt="EventFlow background"
        className="signup-background"
      />

      <div className="signup-overlay"></div>

      <div className="signup-form">
        <div className="signup-header">
          <h1>EventFlow</h1>
          <h2>Create Your Account</h2>
          <p>
            {formData.role === "Faculty"
              ? "Register to manage educational events and quizzes"
              : formData.role === "Admin"
              ? "Register your administrator account"
              : "Join EventFlow to explore events and learning paths"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label>Select Role *</label>
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

          <div className="input-group">
            <label>Department *</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department"
              required
            />
          </div>

          {formData.role === "User" && (
            <>
              <div className="input-group">
                <label>Year *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select year</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div className="input-group">
                <label>Course *</label>
                <input
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Enter your course"
                  required
                />
              </div>

              <div className="input-group">
                <label>Area of Interest</label>
                <input
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  placeholder="MERN & Full Stack Development"
                />
              </div>

              <div className="input-group">
                <label>Learning Mode</label>
                <select
                  name="learningMode"
                  value={formData.learningMode}
                  onChange={handleChange}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Online & Self Learning">
                    Online & Self Learning
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label>Skill Level</label>
                <select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </>
          )}

          {formData.role === "Faculty" && (
            <div className="input-group">
              <label>Designation *</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select designation</option>
                <option value="Assistant Professor">
                  Assistant Professor
                </option>
                <option value="Associate Professor">
                  Associate Professor
                </option>
                <option value="Professor">Professor</option>
                <option value="HOD">Head of Department (HOD)</option>
                <option value="Guest Faculty">Guest Faculty</option>
              </select>
            </div>
          )}

          <div className="input-group">
            <label>Create Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              minLength={6}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="signup-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="signup-success" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
