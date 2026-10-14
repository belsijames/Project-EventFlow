import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
  localStorage.getItem("currentUser") ||
  localStorage.getItem("user") ||
  "{}"
);

const adminName =
  storedUser.name ||
  localStorage.getItem("userName") ||
  "Admin";

  const [statsData, setStatsData] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalRegistrations: 0,
    totalQuizzes: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard-stats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch dashboard statistics");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setStatsData(data.stats);
        }
      })
      .catch((error) => {
        console.error("Dashboard statistics error:", error);
      });
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user");
      localStorage.removeItem("userName");
      navigate("/");
    }
  };

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>EventFlow</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-menu">
          <div
            className="admin-menu-item active"
            onClick={() => navigate("/admin")}
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/admin/events")}
          >
            <span>🎉</span>
            <span>Manage Events</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/admin/users")}
          >
            <span>👥</span>
            <span>Manage Users</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/admin/registrations")}
          >
            <span>📝</span>
            <span>Registrations</span>
          </div>

          <div
            className="admin-menu-item"
            onClick={() => navigate("/admin/quizzes")}
          >
            <span>📚</span>
            <span>Manage Quizzes</span>
          </div>
        </nav>

        <div className="admin-sidebar-bottom">
          <div
            className="admin-menu-item admin-logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-topbar">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your EventFlow platform</p>
          </div>

          <button
            type="button"
            className="admin-profile-btn"
            onClick={() => navigate("/Profile")}
          >
            <span className="admin-profile-avatar">👤</span>
            <span>My Profile</span>
            <span>↗</span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="admin-welcome">
          <div className="admin-welcome-content">
            <span className="admin-welcome-label">
              ADMIN CONTROL CENTER
            </span>

            <h2>Welcome Back, {adminName}!</h2>

            <p>
              Manage events, users, registrations and quizzes
              from one place.
            </p>
          </div>

          <div className="admin-welcome-icon">👑</div>
        </div>

        {/* Statistics - DIV tags only */}
        <section className="admin-stats-section">
          <div className="admin-section-heading">
            <h2>Platform Overview</h2>
            <p>Live statistics from your database</p>
          </div>

          <div className="admin-stats-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-icon">🎉</div>
              <div className="admin-stat-info">
                <p>Total Events</p>
                <h3>{statsData.totalEvents}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">👥</div>
              <div className="admin-stat-info">
                <p>Total Users</p>
                <h3>{statsData.totalUsers}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">📝</div>
              <div className="admin-stat-info">
                <p>Registrations</p>
                <h3>{statsData.totalRegistrations}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">📚</div>
              <div className="admin-stat-info">
                <p>Total Quizzes</p>
                <h3>{statsData.totalQuizzes}</h3>
              </div>
            </div>

          </div>
        </section>

        {/* Certificate Section */}
        <section className="admin-certificate-section">
          <div className="admin-certificate-icon">🏆</div>

          <div className="admin-certificate-content">
            <h2>Issue Certificates</h2>
            <p>
              Manage certificates for students who complete events
              and learning activities.
            </p>
          </div>

          <button
            type="button"
            className="admin-primary-btn"
            onClick={() => navigate("/IssueCertificate")}
          >
            Manage Certificates →
          </button>
        </section>

        {/* Management Cards - DIV tags only */}
        <section className="admin-management-section">
          <div className="admin-section-heading">
            <h2>Quick Management</h2>
            <p>Access your administrative tools</p>
          </div>

          <div className="admin-management-grid">

            <div
              className="admin-management-card"
              onClick={() => navigate("/admin/events")}
            >
              <div className="admin-management-icon">🎉</div>
              <h3>Manage Events</h3>
              <p>
                Add new events, update event details and remove events.
              </p>
              <span className="admin-card-link">Manage Events →</span>
            </div>

            <div
              className="admin-management-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="admin-management-icon">👥</div>
              <h3>Manage Users</h3>
              <p>
                View registered users and manage their information.
              </p>
              <span className="admin-card-link">Manage Users →</span>
            </div>

            <div
              className="admin-management-card"
              onClick={() => navigate("/admin/registrations")}
            >
              <div className="admin-management-icon">📝</div>
              <h3>Registrations</h3>
              <p>
                View student registrations for available events.
              </p>
              <span className="admin-card-link">View Registrations →</span>
            </div>

            <div
              className="admin-management-card"
              onClick={() => navigate("/admin/quizzes")}
            >
              <div className="admin-management-icon">📚</div>
              <h3>Manage Quizzes</h3>
              <p>
                Create quizzes, update questions and manage learning topics.
              </p>
              <span className="admin-card-link">Manage Quizzes →</span>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="admin-footer">
          <p>© 2026 EventFlow. Smart Educational Event Management.</p>
        </footer>

      </main>
    </div>
  );
}

export default AdminDashboard;