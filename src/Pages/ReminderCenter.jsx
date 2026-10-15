
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReminderCenter.css";

const API_BASE = "http://localhost:5000/api";

// Format reminder date and time
function formatReminderTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value || "");
  }

  return date.toLocaleString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Reminder type label
function reminderLabel(type) {
  return type === "1_day"
    ? "1 day before event"
    : "1 hour before event";
}

export default function ReminderCenter() {
  // Hooks must be inside the React component
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const [permission, setPermission] = useState(() => {
    if (typeof window === "undefined") return "unsupported";

    return "Notification" in window
      ? Notification.permission
      : "unsupported";
  });

  // Get logged-in user
  const user = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("user") || "null") ||
        JSON.parse(localStorage.getItem("currentUser") || "null")
      );
    } catch {
      return null;
    }
  })();

  const userId = user?.id;

  // Load reminders from backend
  const loadReminders = useCallback(async () => {
    if (!userId) {
      setReminders([]);
      setError("");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/reminders/user/${userId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load reminders."
        );
      }

      setReminders(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load reminders.");
    }
  }, [userId]);

  // Enable browser notifications
  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch (err) {
      console.error("Notification permission error:", err);
      setPermission("denied");
    }
  };

  // Load reminders and refresh every 30 seconds
  useEffect(() => {
    loadReminders();

    const refreshId = window.setInterval(() => {
      loadReminders();
    }, 30000);

    return () => window.clearInterval(refreshId);
  }, [loadReminders]);

  // Show due notifications
  useEffect(() => {
    if (
      !userId ||
      !("Notification" in window) ||
      Notification.permission !== "granted"
    ) {
      return;
    }

    const now = Date.now();

    const dueReminders = reminders.filter((item) => {
      const scheduledTime = new Date(item.reminder_at).getTime();

      return (
        Number(item.sent) === 0 &&
        !Number.isNaN(scheduledTime) &&
        scheduledTime <= now &&
        scheduledTime >= now - 24 * 60 * 60 * 1000
      );
    });

    dueReminders.forEach(async (item) => {
      try {
        new Notification(`EventFlow reminder: ${item.event_name}`, {
          body: `${reminderLabel(item.reminder_type)}. Event time: ${item.event_date || ""} ${item.event_time || ""}.`,
          tag: `eventflow-reminder-${item.id}`,
        });

        const response = await fetch(
          `${API_BASE}/reminders/${item.id}/mark-sent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Could not update reminder status.");
        }

        setReminders((previous) =>
          previous.map((reminder) =>
            reminder.id === item.id
              ? { ...reminder, sent: 1 }
              : reminder
          )
        );
      } catch (err) {
        console.error(
          "Could not show/update reminder:",
          err
        );
      }
    });
  }, [reminders, userId]);

  // Show reminders from the last 24 hours and upcoming reminders
  const visibleReminders = reminders.filter((item) => {
    const time = new Date(item.reminder_at).getTime();

    return (
      !Number.isNaN(time) &&
      time >= Date.now() - 24 * 60 * 60 * 1000
    );
  });

  // Navigation
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    navigate("/Login");
  };

  return (
    <section className="ef-reminder-card">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>EventFlow</h2>
          <p>Learn. Connect. Grow.</p>
        </div>

        <nav className="sidebar-menu">
          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/Dashboard")}
          >
            <span>🏠</span>
            Dashboard
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/Events")}
          >
            <span>🎓</span>
            Explore Events
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/MyRegistration")}
          >
            <span>📋</span>
            My Registration
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/learning")}
          >
            <span>📚</span>
            Learning Path
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/Certificate")}
          >
            <span>🏆</span>
            My Certificates
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/my-quiz")}
          >
            <span>📝</span>
            My Quiz
          </button>

          <button
            type="button"
            className="sidebar-link active"
            onClick={() => navigate("/ReminderCenter")}
          >
            <span>🔔</span>
            Reminders
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => navigate("/Profile")}
          >
            <span>👤</span>
            My Profile
          </button>
        </nav>

        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>
      </aside>

      {/* Reminder content */}
      <div className="ef-reminder-main">
        <div className="ef-reminder-header">
          <div>
            <p className="ef-reminder-eyebrow">EVENTFLOW</p>

            <h2>
              <span aria-hidden="true">🔔</span>{" "}
              Event Reminders
            </h2>

            <p className="ef-reminder-subtitle">
              Get notified 1 day and 1 hour before your registered events.
            </p>
          </div>

          {permission === "default" && (
            <button
              type="button"
              className="ef-reminder-enable"
              onClick={enableNotifications}
            >
              Enable notifications
            </button>
          )}

          {permission === "denied" && (
            <span className="ef-reminder-permission">
              Notifications blocked
            </span>
          )}

          {permission === "unsupported" && (
            <span className="ef-reminder-permission">
              Browser notifications unavailable
            </span>
          )}

          {permission === "granted" && (
            <span className="ef-reminder-enabled">
              Notifications enabled
            </span>
          )}
        </div>

        {error && (
          <p className="ef-reminder-error">{error}</p>
        )}

        {!userId && (
          <p className="ef-reminder-empty">
            Please log in to view your reminders.
          </p>
        )}

        {userId &&
          visibleReminders.length === 0 &&
          !error && (
            <p className="ef-reminder-empty">
              No reminders scheduled yet. Register for an upcoming
              event to see reminders here.
            </p>
          )}

        {userId && visibleReminders.length > 0 && (
          <div className="ef-reminder-list">
            {visibleReminders.map((item) => {
              const isPast =
                new Date(item.reminder_at).getTime() <= Date.now();

              return (
                <article
                  className="ef-reminder-item"
                  key={item.id}
                >
                  <div
                    className="ef-reminder-icon"
                    aria-hidden="true"
                  >
                    🔔
                  </div>

                  <div className="ef-reminder-content">
                    <h3>{item.event_name}</h3>

                    <p>
                      {reminderLabel(item.reminder_type)}
                    </p>

                    <span>
                      {formatReminderTime(item.reminder_at)}
                    </span>

                    {item.event_location && (
                      <small>{item.event_location}</small>
                    )}
                  </div>

                  <span
                    className={`ef-reminder-status ${
                      Number(item.sent) === 1
                        ? "sent"
                        : isPast
                        ? "due"
                        : ""
                    }`}
                  >
                    {Number(item.sent) === 1
                      ? "Notified"
                      : isPast
                      ? "Due"
                      : "Scheduled"}
                  </span>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
