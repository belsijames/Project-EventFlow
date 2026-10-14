
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Certificate.css";

function Certificate() {
  const navigate = useNavigate();

  const certificates = [
    {
      id: 1,
      title: "Web Development Workshop",
      category: "Workshop",
      date: "10 October 2026",
      certificateId: "EF-WEB-001",
    },
    {
      id: 2,
      title: "Communication Skills Workshop",
      category: "Workshop",
      date: "15 October 2026",
      certificateId: "EF-COM-002",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  return (
    <div className="certificate-page">

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
        <button
          className="user-nav-item"
          onClick={() => navigate("/my-certificates")}
        >
          My Certificates
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

      <nav className="certificate-navbar">
        <div className="certificate-logo">
          Event<span>Flow</span>
        </div>

        <div className="certificate-nav-links">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => navigate("/events")}>
            Events
          </button>
          <button onClick={() => navigate("/learning")}>
            Learning Path
          </button>
          <button className="active-certificate">
            Certificates
          </button>
        </div>
      </nav>

      <main className="certificate-container">
        <div className="certificate-heading">
          <div>
            <p className="certificate-eyebrow">
              YOUR ACHIEVEMENTS
            </p>
            <h1>My Certificates</h1>
            <p className="certificate-subtitle">
              Celebrate your learning journey and achievements.
            </p>
          </div>

          <div className="certificate-count">
            <span>🏆</span>
            <div>
              <strong>{certificates.length}</strong>
              <small>Certificates</small>
            </div>
          </div>
        </div>

        <div className="certificate-info">
          <div className="certificate-info-icon">✦</div>
          <div>
            <h3>Your achievements matter</h3>
            <p>
              Completed learning activities and eligible events
              can be recognized with certificates.
            </p>
          </div>
        </div>

        <div className="certificate-section-title">
          <h2>Available Certificates</h2>
          <span>{certificates.length} items</span>
        </div>

        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <article
              className="certificate-card"
              key={certificate.id}
            >
              <div className="certificate-preview">
                <div className="certificate-paper">
                  <span className="certificate-seal">✦</span>
                  <p className="paper-brand">EVENTFLOW</p>
                  <h3>Certificate</h3>
                  <p className="paper-caption">
                    OF PARTICIPATION
                  </p>
                  <div className="paper-line"></div>
                  <p className="paper-event">
                    {certificate.title}
                  </p>
                  <div className="paper-footer">
                    <span>EVENTFLOW</span>
                    <span>✦</span>
                  </div>
                </div>
              </div>

              <div className="certificate-card-content">
                <span className="certificate-category">
                  {certificate.category}
                </span>

                <h3>{certificate.title}</h3>

                <p className="certificate-date">
                  <span>▦</span>
                  {certificate.date}
                </p>

                <p className="certificate-id">
                  ID: {certificate.certificateId}
                </p>

                <button
                  className="certificate-view-btn"
                  onClick={() =>
                    navigate(
                      `/certificate/${certificate.id}`
                    )
                  }
                >
                  View Certificate <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="certificate-note">
          <span>✧</span>
          <p>
            Keep learning, participate in events, and grow your
            collection of achievements.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Certificate;