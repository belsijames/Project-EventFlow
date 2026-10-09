
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

  return (
    <div className="certificate-page">
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