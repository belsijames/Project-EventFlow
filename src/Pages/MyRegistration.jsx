import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyRegistration.css";

const API = "http://localhost:5000/api/my-registrations";

function MyRegistration() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Unable to load registrations.");
      }

      const data = await response.json();

      // Supports either an array or { registrations: [...] }
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.registrations)
        ? data.registrations
        : [];

      setRegistrations(list);
    } catch (err) {
      console.error("My Registrations error:", err);
      setError(
        "Could not load registrations. Check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getEventName = (registration) =>
    registration.event_name ||
    registration.eventName ||
    registration.event_title ||
    registration.title ||
    "Event";

  const getEventDate = (registration) =>
    registration.event_date ||
    registration.eventDate ||
    registration.date ||
    "Date not available";

  const getEventTime = (registration) =>
    registration.event_time ||
    registration.eventTime ||
    registration.time ||
    "Time not available";

  const getVenue = (registration) =>
    registration.venue ||
    registration.location ||
    registration.event_location ||
    "Venue not available";

  const getStatus = (registration) =>
    registration.status ||
    registration.registration_status ||
    "Registered";

  const getEventImage = (eventName) => {
    const name = eventName.toLowerCase();

    if (name.includes("tech talk")) return "/tech-talk.jpeg";
    if (name.includes("creative")) return "/creative.jpeg";
    if (name.includes("web development")) return "/bootcamp.jpeg";
    if (name.includes("communication")) return "/communication.jpeg";
    if (name.includes("career guidance")) return "/Career.jpeg";

    return "";
  };

  const getEventRoute = (eventName) => {
    const name = eventName.toLowerCase();

    if (name.includes("tech talk")) return "/techtalk";
    if (name.includes("creative")) return "/CreativeMind";
    if (name.includes("web development")) return "/WebDevelopment";
    if (name.includes("communication")) return "/CommunicationSkills";
    if (name.includes("career guidance")) return "/CareerGuidance";
    if (name.includes("science") || name.includes("innovation")) {
      return "/ScienceExpo";
    }

    return "/Events";
  };

  const filteredRegistrations = registrations.filter((registration) =>
    getEventName(registration).toLowerCase().includes(search.toLowerCase())
  );
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
    <div className="mr-layout">
    
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
          className="user-nav-item active"
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

          <button className="user-nav-item logout-item" onClick={handleLogout}>
            <span>⇥</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="mr-main">
        <header className="mr-topbar">
          <div>
            <p className="mr-breadcrumb">Student / My Registration</p>
            <h1>My Registrations</h1>
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
          
        </header>
        

        <section className="mr-welcome">
          <div className="mr-welcome-text">
            <span className="mr-welcome-tag">YOUR EVENT SPACE</span>
            <h2>Your journey, all in one place.</h2>
            <p>
              View your registered events and keep track of your upcoming
              learning experiences.
            </p>
          </div>
          <div className="mr-welcome-art" aria-hidden="true">
            <span className="mr-art-star">✦</span>
            <span className="mr-art-calendar">▦</span>
            <span className="mr-art-dot">✧</span>
          </div>
        </section>

        <section className="mr-stats">
          <div className="mr-stat-card">
            <div className="mr-stat-icon purple-icon">▤</div>
            <div>
              <p>Total Registrations</p>
              <h3>{registrations.length}</h3>
            </div>
          </div>

          <div className="mr-stat-card">
            <div className="mr-stat-icon lavender-icon">◷</div>
            <div>
              <p>Events Found</p>
              <h3>{filteredRegistrations.length}</h3>
            </div>
          </div>
        </section>

        <section className="mr-events-section">
          <div className="mr-section-header">
            <div>
              <h2>Registered Events</h2>
              <p>All your registrations in one place.</p>
            </div>

            <div className="mr-search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search your events..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="mr-message">
              <div className="mr-loader" />
              <p>Loading your registrations...</p>
            </div>
          ) : error ? (
            <div className="mr-message">
              <div className="mr-message-icon">!</div>
              <h3>Unable to load registrations</h3>
              <p>{error}</p>
              <button
                type="button"
                className="mr-retry-button"
                onClick={fetchRegistrations}
              >
                Try Again
              </button>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="mr-message">
              <div className="mr-message-icon">▤</div>
              <h3>
                {registrations.length === 0
                  ? "No registrations yet"
                  : "No matching events"}
              </h3>
              <p>
                {registrations.length === 0
                  ? "When you register for an event, it will appear here."
                  : "Try another event name in the search box."}
              </p>
              {registrations.length === 0 && (
                <button
                  type="button"
                  className="mr-retry-button"
                  onClick={() => navigate("/Events")}
                >
                  Explore Events
                </button>
              )}
            </div>
          ) : (
            <div className="mr-event-list">
              {filteredRegistrations.map((registration, index) => {
                const eventName = getEventName(registration);
                const eventImage = getEventImage(eventName);

                return (
                  <article
                    className="mr-event-card"
                    key={
                      registration.id ||
                      registration.registration_id ||
                      `${eventName}-${index}`
                    }
                  >
                    <div className="mr-event-image">
                      {eventImage ? (
                        <img src={eventImage} alt={eventName} />
                      ) : (
                        <div className="mr-image-placeholder">✦</div>
                      )}
                      <span className="mr-event-label">EVENT</span>
                    </div>

                    <div className="mr-event-info">
                      <div className="mr-event-title-row">
                        <h3>{eventName}</h3>
                        <span className="mr-status">
                          <span className="mr-status-dot" />
                          {getStatus(registration)}
                        </span>
                      </div>

                      <div className="mr-event-meta">
                        <span><b>▦</b> {getEventDate(registration)}</span>
                        <span><b>◷</b> {getEventTime(registration)}</span>
                        <span><b>⌖</b> {getVenue(registration)}</span>
                      </div>

                      <div className="mr-event-footer">
                        <span className="mr-registration-note">
                          <span>✓</span> Registration recorded
                        </span>
                        <button
                          type="button"
                          className="mr-view-button"
                          onClick={() => navigate(getEventRoute(eventName))}
                        >
                          View Event <span>→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mr-footer">
          <span>EventFlow Student Portal</span>
          <span>Learn · Participate · Grow</span>
        </footer>
      </main>
    </div>
  );
}

export default MyRegistration;