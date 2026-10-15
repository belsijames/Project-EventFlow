
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

function Events() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Search and category filtering
  const matches = (title, category, location) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      title.toLowerCase().includes(search) ||
      category.toLowerCase().includes(search) ||
      location.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      selectedCategory === category;

    return matchesSearch && matchesCategory;
  };

  // Count matching events
  const eventCount = [
    matches("Tech Talk 2026", "Seminar", "College Auditorium"),
    matches("Creative Minds Workshop", "Workshop", "Seminar Hall"),
    matches("Web Development Bootcamp", "Workshop", "Computer Lab"),
    matches("Career Guidance Session", "Seminar", "Conference Hall"),
    matches("Science & Innovation Expo", "Exhibition", "Main Exhibition Hall"),
    matches("Communication Skills Workshop", "Workshop", "Seminar Hall"),
  ].filter(Boolean).length;

  return (
    <div className="events-page">

      {/* SIDEBAR */}
      <div className="user-sidebar">

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
          className="user-nav-item active"
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
          onClick={() => navigate("/ReminderCenter")}
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

      {/* MAIN CONTENT */}
      <div className="body">

        {/* TOP BAR */}
        <div className="events-topbar">

          <input
            type="search"
            className="search-bar"
            placeholder="Search events, categories or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search events"
          />

          <div className="user-top-actions">

            <button
              className="user-notification-btn"
              title="Reminders"
              onClick={() => navigate("/ReminderCenter")}
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

        {/* PAGE HEADING */}
        <div className="events-heading-section">

          <p className="events-eyebrow">
            DISCOVER • PARTICIPATE • GROW
          </p>

          <h1 className="heading">Explore Events</h1>

          <p className="middle">
            Discover exciting events, build new skills and explore
            opportunities to grow your knowledge.
          </p>

        </div>

        {/* CATEGORY FILTERS */}
        <div className="events-filter-section">

          <div className="events-filter-heading">
            <h2>Browse Categories</h2>
            <span>{eventCount} events found</span>
          </div>

          <div className="category-buttons">

            <button
              type="button"
              className={
                selectedCategory === "All"
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            <button
              type="button"
              className={
                selectedCategory === "Workshop"
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory("Workshop")}
            >
              Workshop
            </button>

            <button
              type="button"
              className={
                selectedCategory === "Seminar"
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory("Seminar")}
            >
              Seminar
            </button>

            <button
              type="button"
              className={
                selectedCategory === "Exhibition"
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setSelectedCategory("Exhibition")}
            >
              Exhibition
            </button>

          </div>
        </div>

        {/* EVENT CARDS */}
        <div className="events-grid">

          {/* 1. TECH TALK */}
          {matches(
            "Tech Talk 2026",
            "Seminar",
            "College Auditorium"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/techtalk.jpeg"
                  alt="Tech Talk 2026"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Seminar
                </span>
              </div>

              <div className="card-body">
                <h3>Tech Talk 2026</h3>

                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 10, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 10:00 AM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> College Auditorium</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/techtalk")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* 2. CREATIVE MINDS */}
          {matches(
            "Creative Minds Workshop",
            "Workshop",
            "Seminar Hall"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/creative.jpeg"
                  alt="Creative Minds Workshop"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Workshop
                </span>
              </div>

              <div className="card-body">
                <h3>Creative Minds Workshop</h3>

                
                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 15, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 02:00 PM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> Seminar Hall</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/CreativeMind")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* 3. WEB DEVELOPMENT */}
          {matches(
            "Web Development Bootcamp",
            "Workshop",
            "Computer Lab"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/bootcamp.jpeg"
                  alt="Web Development Bootcamp"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Workshop
                </span>
              </div>

              <div className="card-body">
                <h3>Web Development Bootcamp</h3>


                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 20, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 09:00 AM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> Computer Lab</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/WebDevelopment")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* 4. CAREER GUIDANCE */}
          {matches(
            "Career Guidance Session",
            "Seminar",
            "Conference Hall"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/Career.jpeg"
                  alt="Career Guidance Session"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Seminar
                </span>
              </div>

              <div className="card-body">
                <h3>Career Guidance Session</h3>


                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 22, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 10:30 AM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> Conference Hall</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/CareerGuidance")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* 5. SCIENCE EXPO */}
          {matches(
            "Science & Innovation Expo",
            "Exhibition",
            "Main Exhibition Hall"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/innovation.jpeg"
                  alt="Science and Innovation Expo"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Exhibition
                </span>
              </div>

              <div className="card-body">
                <h3>Science &amp; Innovation Expo</h3>


                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 25, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 10:00 AM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> Main Exhibition Hall</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/ScienceExpo")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* 6. COMMUNICATION SKILLS */}
          {matches(
            "Communication Skills Workshop",
            "Workshop",
            "Seminar Hall"
          ) && (
            <div className="card">

              <div className="event-image-wrapper">
                <img
                  src="/communication.jpeg"
                  alt="Communication Skills Workshop"
                  className="event-image"
                />

                <span className="event-category-badge">
                  Workshop
                </span>
              </div>

              <div className="card-body">
                <h3>Communication Skills Workshop</h3>


                <div className="event-details">
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
</span> October 28, 2026</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
</span> 11:00 AM</p>
                  <p><span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
</span> Seminar Hall</p>
                </div>

                <button
                  type="button"
                  className="event-view-button"
                  onClick={() => navigate("/CommunicationSkills")}
                >
                  View Details <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* NO EVENTS FOUND */}
          {eventCount === 0 && (
            <div className="no-events">
              <h3>No events found</h3>

              <p>
                Try another search term or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
        


      </div>
    </div>
  );
}

export default Events;
