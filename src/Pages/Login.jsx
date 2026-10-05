import React from "react";
import "./Login.css";

function Login() {
  return (
    <>
    <div className="login-page">

      <div className="login-card">
        <div className="login-logo">
          <span>EF</span>
        </div>

        <h1>Welcome to EventFlow</h1>

        <p className="login-subtitle">
          Sign in to explore educational events
        </p>

        <form>

          <div className="input-group">
            <label>Email Address</label>

            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="/">Forgot Password?</a>

          </div>

          <button type="submit" className="login-btn" onClick={()=> window.location.href="/Dashboard"}>
                     Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <a href="/Signup"> Sign Up</a>
        </p>

      </div>

    </div>
    <div className="quote">
      <h2>Where <br/>New Beginnings Turn Into <br/>New Oppertunities</h2>
    </div>
    </>
  );
}

export default Login;