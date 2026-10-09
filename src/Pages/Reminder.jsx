
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reminder.css";

function Reminder() {
  const navigate = useNavigate();

  const reminders = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "10 October 2026",
      time: "10:00 AM",
      type: "Registered Event",
    },
    {
      id: 2,
      title: "Communication Skills Workshop",
      date: "15 October 2026",
      time: "10:00 AM",
      type: "Upcoming Event",
    },
  ];

  return (
    <div className="reminder-page">
      <nav className="reminder-navbar">
        <h2>EventFlow</h2>

        <div className="reminder-nav-links">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => navigate("/events")}>
            Events
          </button>
          <button onClick={() => navigate("/learning")}>
            Learning Path
          </button>
        </div>
      </nav>

      <main className="reminder-container">
        <p className="reminder-subtitle">STAY UPDATED</p>
        <h1>My Reminders</h1>
        <p className="reminder-description">
          Keep track of your registered and upcoming educational events.
        </p>

        <div className="reminder-list">
          {reminders.map((item) => (
            <div className="reminder-card" key={item.id}>
              <div className="reminder-icon">🔔</div>

              <div className="reminder-info">
                <span className="reminder-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>📅 {item.date}</p>
                <p>🕙 {item.time}</p>
              </div>

              <button
                className="reminder-view-btn"
                onClick={() => navigate("/events")}
              >
                View Events
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Reminder;