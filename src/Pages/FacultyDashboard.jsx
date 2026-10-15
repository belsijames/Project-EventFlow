import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import { getAuthHeaders } from "../api/client";

function FacultyDashboard() {
  const navigate = useNavigate();

  let storedUser = {};
  try {
    storedUser =
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null") ||
      {};
  } catch {
    storedUser = {};
  }

  const facultyName = storedUser.name || "Faculty Member";
  const designation = storedUser.designation || "Event Coordinator";

  const [stats, setStats] = useState({
    events: 0,
    registrations: 0,
    quizzes: 0,
    results: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const headers = getAuthHeaders();

        const [eventsRes, regsRes, quizzesRes, resultsRes] = await Promise.all([
          fetch("http://localhost:5000/api/events", { headers }).catch(() => null),
          fetch("http://localhost:5000/api/registrations", { headers }).catch(() => null),
          fetch("http://localhost:5000/api/quizzes", { headers }).catch(() => null),
          fetch("http://localhost:5000/api/quizzes/results", { headers }).catch(() => null),
        ]);

        const eventsData = eventsRes && eventsRes.ok ? await eventsRes.json() : null;
        const regsData = regsRes && regsRes.ok ? await regsRes.json() : null;
        const quizzesData = quizzesRes && quizzesRes.ok ? await quizzesRes.json() : null;
        const resultsData = resultsRes && resultsRes.ok ? await resultsRes.json() : null;

        setStats({
          events: eventsData?.events?.length || 0,
          registrations: regsData?.registrations?.length || 0,
          quizzes: quizzesData?.quizzes?.length || 0,
          results: resultsData?.results?.length || 0,
        });
      } catch (err) {
        console.error("Faculty dashboard stats error:", err);
      }
    }

    loadStats();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/Login");
    }
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="faculty-layout">
      {/* Sidebar */}
      <aside className="faculty-sidebar">
        <div className="faculty-brand">
          <span className="faculty-brand-icon">✦</span>
          <span>EventFlow</span>
        </div>

        <p className="faculty-menu-label">FACULTY MENU</p>

        <nav className="faculty-navigation">
          <button
            type="button"
            className="faculty-nav-link active"
            onClick={() => navigate("/faculty")}
          >
            <span className="faculty-nav-icon">▦</span>
            Dashboard
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/events")}
          >
            <span className="faculty-nav-icon">◈</span>
            Manage Events
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/registrations")}
          >
            <span className="faculty-nav-icon">♙</span>
            Registrations
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/quizzes")}
          >
            <span className="faculty-nav-icon">☷</span>
            Manage Quizzes
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/results")}
          >
            <span className="faculty-nav-icon">▤</span>
            Student Results
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/issue-certificate")}
          >
            <span className="faculty-nav-icon">★</span>
            Issue Certificate
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/FacultyCertificate")}
          >
            <span className="faculty-nav-icon">🏆</span>
            Certificate
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => goToPage("/faculty/profile")}
          >
            <span className="faculty-nav-icon">◎</span>
            My Profile
          </button>
        </nav>

        <button
          type="button"
          className="faculty-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="faculty-main">
        <header className="faculty-topbar">
          <div>
            <h2>Faculty Dashboard</h2>
            <p>Manage your educational activities in one place.</p>
          </div>

          <div className="faculty-account">
            <div className="faculty-avatar">
              {facultyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{facultyName}</strong>
              <span>{designation}</span>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="faculty-welcome">
          <div className="faculty-welcome-content">
            <span className="faculty-eyebrow">
              FACULTY WORKSPACE
            </span>

            <h1>Welcome Back, {facultyName.split(" ")[0]}!</h1>

            <p>
              Organize educational events, manage quizzes, and
              support your students' learning journey.
            </p>

            <button
              type="button"
              className="faculty-primary-button"
              onClick={() => goToPage("/faculty/events")}
            >
              Explore Event Management
              <span> →</span>
            </button>
          </div>

          <div className="faculty-welcome-decoration">
            <div className="faculty-decoration-circle">
              <span>✦</span>
            </div>
            <span className="faculty-decoration-small">✧</span>
            <span className="faculty-decoration-dot">•</span>
          </div>
        </section>

        {/* Statistics */}
        <section className="faculty-stats">
          <article className="faculty-stat-card">
            <div className="faculty-stat-icon purple">◈</div>
            <div>
              <p>Total Events</p>
              <h2>{stats.events}</h2>
              <span>Events overview</span>
            </div>
          </article>

          <article className="faculty-stat-card">
            <div className="faculty-stat-icon green">♙</div>
            <div>
              <p>Registrations</p>
              <h2>{stats.registrations}</h2>
              <span>Student registrations</span>
            </div>
          </article>

          <article className="faculty-stat-card">
            <div className="faculty-stat-icon orange">☷</div>
            <div>
              <p>Total Quizzes</p>
              <h2>{stats.quizzes}</h2>
              <span>Learning assessments</span>
            </div>
          </article>

          <article className="faculty-stat-card">
            <div className="faculty-stat-icon blue">✓</div>
            <div>
              <p>Student Results</p>
              <h2>{stats.results}</h2>
              <span>Quiz attempts</span>
            </div>
          </article>
        </section>

        {/* Quick Actions */}
        <section className="faculty-section">
          <div className="faculty-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Choose an activity to get started.</p>
            </div>
          </div>

          <div className="faculty-action-grid">
            <button
              type="button"
              className="faculty-action-card"
              onClick={() => goToPage("/faculty/events")}
            >
              <div className="faculty-action-icon event-icon">
                ◈
              </div>
              <h3>Manage Events</h3>
              <p>Create and organize educational events.</p>
              <span className="faculty-action-arrow">→</span>
            </button>

            <button
              type="button"
              className="faculty-action-card"
              onClick={() => goToPage("/faculty/registrations")}
            >
              <div className="faculty-action-icon registration-icon">
                ♙
              </div>
              <h3>Registrations</h3>
              <p>Review students registered for events.</p>
              <span className="faculty-action-arrow">→</span>
            </button>

            <button
              type="button"
              className="faculty-action-card"
              onClick={() => goToPage("/faculty/quizzes")}
            >
              <div className="faculty-action-icon quiz-icon">
                ☷
              </div>
              <h3>Manage Quizzes</h3>
              <p>Prepare quizzes for student learning.</p>
              <span className="faculty-action-arrow">→</span>
            </button>

            <button
              type="button"
              className="faculty-action-card"
              onClick={() => goToPage("/faculty/results")}
            >
              <div className="faculty-action-icon result-icon">
                ▤
              </div>
              <h3>Student Results</h3>
              <p>Review quiz performance and results.</p>
              <span className="faculty-action-arrow">→</span>
            </button>
          </div>
        </section>

        {/* Information Panel */}
        <section className="faculty-bottom-panel">
          <div className="faculty-bottom-icon">✧</div>

          <div>
            <h3>Your Faculty Workspace</h3>
            <p>
              Use the dashboard to manage events and learning
              activities. Live database records keep all your statistics
              and student participation up to date.
            </p>
          </div>
        </section>

        <footer className="faculty-footer">
          © 2026 EventFlow · Smart Educational Event Management
        </footer>
      </main>
    </div>
  );
}

export default FacultyDashboard;
