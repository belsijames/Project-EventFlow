import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your registered email.");
      return;
    }

    alert("Password reset link has been sent to your email.");
    navigate("/login");
  };

  return (
    <div className="forgot-page">

      {/* Background Image */}
      <img
        src="/login-bg.jpeg"
        alt="EventFlow Background"
        className="forgot-background"
      />

      {/* Dark Overlay */}
      <div className="forgot-overlay"></div>

      {/* Forgot Password Card */}
      <div className="forgot-form">

        <div className="forgot-header">
          <h1>EventFlow</h1>
          <h2>Forgot Password?</h2>
          <p>
            Enter your registered email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="reset-btn">
            Send Reset Link
          </button>

        </form>

        <div className="back-login">
          <button onClick={() => navigate("/login")}>
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;