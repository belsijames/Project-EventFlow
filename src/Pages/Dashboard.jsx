import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  let storedUser = {};

  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    storedUser = {};
  }

  const userName =
    storedUser.name ||
    localStorage.getItem("userName") ||
    "Student";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  return (
    <div className="user-dashboard">

      {/* Sidebar */}
      <div className="user-sidebar">

        <div className="user-brand">
          <div className="user-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <span>Learn. Explore. Grow.</span>
          </div>
        </div>


        <button
          className="user-nav-item active"
          onClick={() => navigate("/Dashboard")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/Events")}
        >
          <span>✦</span> Explore Events
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/MyRegistration")}
        >
          <span>▣</span> My Registrations
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/learning")}
        >
          <span>⌘</span> Learning Path
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/my-quiz")}
        >
          <span>✓</span> My Quiz
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/Reminder")}
        >
          <span>♧</span> Reminders
        </button>
       

        <div className="user-sidebar-bottom">

          <button
            className="user-nav-item"
            onClick={() => navigate("/Profile")}
          >
            <span>⚙</span> My Profile
          </button>

          <button
            className="user-nav-item logout-item"
            onClick={handleLogout}
          >
            <span>⇥</span> Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="user-main">

        {/* Top Navbar */}
        <div className="user-topbar">

          <div>
            <span className="user-breadcrumb">
              Workspace / Dashboard
            </span>
            <h2>Dashboard</h2>
          </div>

          <div className="user-top-actions">

            <button
              className="user-notification-btn"
              title="Reminders"
              onClick={() => navigate("/Reminder")}
            >
              🔔
            </button>

            <button
              className="user-account"
              onClick={() => navigate("/Profile")}
            >
              <div className="user-avatar">
                <img src="/profile.jpg" alt="Profile" />
              </div>

              <div className="user-account-text">
                <strong>{userName}</strong>
                <span>Student / User</span>
              </div>
            </button>

          </div>
        </div>

        {/* Welcome Banner */}
        <div className="user-welcome-banner">

          <div className="user-welcome-content">

            <span className="user-welcome-tag">
              YOUR LEARNING SPACE
            </span>

            <h1>
              Welcome, {userName.split(" ")[0]}!
            </h1>

            <p>
              Discover exciting events, build new skills, and make
              every learning opportunity count.
            </p>

            <button
              className="user-primary-btn"
              onClick={() => navigate("/Events")}
            >
              Explore Events <span>→</span>
            </button>

          </div>
        </div>

        {/* Section Heading */}
        <div className="user-section-heading">

          <div>
            <span className="user-section-eyebrow">
              YOUR WORKSPACE
            </span>

            <h2>Everything in one place</h2>

            <p>
              Choose an area to continue your EventFlow journey.
            </p>
          </div>

        </div>

        {/* Dashboard Cards */}
        <div className="user-dashboard-grid">

          {/* Explore Events */}
          <div className="user-dashboard-card events-card">

            <div className="user-card-top">
              <div className="user-card-icon">🎯</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>Explore Events</h3>

            <p>
              Discover upcoming seminars, workshops and tech events.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/Events")}
            >
              Explore Events <span>→</span>
            </button>

          </div>

          {/* My Registrations */}
          <div className="user-dashboard-card registrations-card">

            <div className="user-card-top">
              <div className="user-card-icon">📅</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>My Registrations</h3>

            <p>
              View the events you have registered for.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/MyRegistration")}
            >
              View Registrations <span>→</span>
            </button>

          </div>

          {/* Learning Path */}
          <div className="user-dashboard-card learning-card">

            <div className="user-card-top">
              <div className="user-card-icon">🚀</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>Learning Path</h3>

            <p>
              Continue learning and track your learning progress.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/learning")}
            >
              Start Learning <span>→</span>
            </button>

          </div>

          {/* My Quiz */}
          <div className="user-dashboard-card quiz-card">

            <div className="user-card-top">
              <div className="user-card-icon">🧠</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>My Quiz</h3>

            <p>
              Practice your skills and check your quiz performance.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/my-quiz")}
            >
              Take a Quiz <span>→</span>
            </button>

          </div>

          {/* Reminders */}
          <div className="user-dashboard-card reminders-card">

            <div className="user-card-top">
              <div className="user-card-icon">🔔</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>Reminders</h3>

            <p>
              Check your event reminders and important updates.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/Reminder")}
            >
              View Reminders <span>→</span>
            </button>

          </div>

          {/* My Profile */}
          <div className="user-dashboard-card profile-card">

            <div className="user-card-top">
              <div className="user-card-icon">👤</div>
              <span className="user-card-arrow">↗</span>
            </div>

            <h3>My Profile</h3>

            <p>
              View your account details and learning preferences.
            </p>

            <button
              className="user-card-link"
              onClick={() => navigate("/Profile")}
            >
              View Profile <span>→</span>
            </button>

          </div>

        </div>

        {/* Bottom Banner */}
        <div className="user-bottom-banner">

          <div className="user-bottom-icon">✧</div>

          <div className="user-bottom-text">
            <h3>Keep learning, keep growing!</h3>

            <p>
              Every event is a chance to learn something new and
              move forward.
            </p>
          </div>

          <button onClick={() => navigate("/learning")}>
            Continue Learning <span>→</span>
          </button>

        </div>

        {/* Footer */}
        <div className="user-dashboard-footer">

          <span>© 2026 EventFlow</span>

          <span>
            Smart Educational Event Management & Learning Platform
          </span>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;