import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="login-card">

        {/* EventFlow Logo */}
        <div className="login-logo">
          <span>EF</span>
        </div>

        <h1>Welcome to EventFlow</h1>

        <p className="login-subtitle">
          Sign in to explore educational events
        </p>

        <form>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Options */}
          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="/">Forgot Password?</a>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn" onClick={()=> window.location.href="/Dashboard"}
          >
            Login
          </button>

        </form>

        {/* Signup */}
        <p className="signup-text">
          Don't have an account?
          <a href="/Signup"> Sign Up</a>
        </p>

      </div>

    </div>
  );
}

export default Login;