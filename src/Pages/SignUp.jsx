
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    course: "",
    interest: "",
    learningMode: "",
    skillLevel: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department ||
      !formData.year ||
      !formData.course.trim() ||
      !formData.interest.trim() ||
      !formData.learningMode ||
      !formData.skillLevel ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all the details.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
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
            year: formData.year,
            course: formData.course.trim(),
            interest: formData.interest.trim(),
            learningMode: formData.learningMode,
            skillLevel: formData.skillLevel,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "Cannot connect to server. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <img
        src="/login-bg.jpeg"
        alt="EventFlow Background"
        className="signup-background"
      />

      <div className="signup-overlay"></div>

      <div className="signup-form">
        <div className="signup-header">
          <h1>EventFlow</h1>

          <h2>Create Account</h2>

          <p>
            Create your account to explore and manage educational events
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="input-row">
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="input-row">
            <div className="input-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">
                  Computer Science
                </option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="Commerce">Commerce</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div className="input-group">
              <label>Year</label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="I Year">I Year</option>
                <option value="II Year">II Year</option>
                <option value="III Year">III Year</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="input-row">
            <div className="input-group">
              <label>Course</label>

              <input
                type="text"
                name="course"
                placeholder="Eg: B.Sc. Computer Science"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Area of Interest</label>

              <input
                type="text"
                name="interest"
                placeholder="Eg: MERN & Full Stack"
                value={formData.interest}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="input-row">
            <div className="input-group">
              <label>Learning Mode</label>

              <select
                name="learningMode"
                value={formData.learningMode}
                onChange={handleChange}
                required
              >
                <option value="">Select Learning Mode</option>
                <option value="Online & Self Learning">
                  Online & Self Learning
                </option>
                <option value="Classroom Learning">
                  Classroom Learning
                </option>
                <option value="Online Learning">
                  Online Learning
                </option>
              </select>
            </div>

            <div className="input-group">
              <label>Skill Level</label>

              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="input-row">
            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="input-group full-width">
            <label>Role</label>

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

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          Already have an account?

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