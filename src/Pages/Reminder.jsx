
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reminder.css";

function Reminder() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    navigate("/Login");
  };

  return (
    <div className="reminder-page">
      <aside className="user-sidebar">
        <div className="user-brand">
          <div className="user-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <span>Learn. Explore. Grow.</span>
          </div>
        </div>

        <div className="user-sidebar-label">MAIN MENU</div>

        <button
          className="user-nav-item"
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
          className="user-nav-item active"
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
      </aside>

      <main className="reminder-container">
        <button
          type="button"
          className="reminder-profile-btn"
          onClick={() => navigate("/Profile")}
        >
          <span className="reminder-profile-avatar">👤</span>
          <span className="reminder-profile-text">My Profile</span>
          <span className="reminder-profile-arrow">↗</span>
        </button>

        <p className="reminder-subtitle">STAY UPDATED</p>

        <h1>My Reminders</h1>

        <p className="reminder-description">
          Keep track of your registered and upcoming educational events.
        </p>

        <div className="reminder-list">
          <div className="reminder-card">
            <div className="reminder-icon">🔔</div>

            <div className="reminder-info">
              <span className="reminder-type">
                Registered Event
              </span>
              <h3>Web Development Workshop</h3>
              <p>📅 10 October 2026</p>
              <p>🕙 10:00 AM</p>
            </div>

            <button
              className="reminder-view-btn"
              onClick={() => navigate("/Events")}
            >
              View Events
            </button>
          </div>

          <div className="reminder-card">
            <div className="reminder-icon">🔔</div>

            <div className="reminder-info">
              <span className="reminder-type">
                Upcoming Event
              </span>
              <h3>Communication Skills Workshop</h3>
              <p>📅 15 October 2026</p>
              <p>🕙 10:00 AM</p>
            </div>

            <button
              className="reminder-view-btn"
              onClick={() => navigate("/Events")}
            >
              View Events
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reminder;
