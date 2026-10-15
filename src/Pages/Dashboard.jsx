
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // Load logged-in user details
  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user") ||
        localStorage.getItem("currentUser");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user details:", error);
      setUser({});
    }
  }, []);

  const userName = user?.name || user?.username || "User";

  // Profile image
  const profileImage =
    user?.profileImage ||
    user?.image ||
    "/profile.png";

  // Dashboard cards
  const dashboardCards = [
    {
      title: "Explore Events",
      description:
        "Discover educational events, seminars, and workshops.",
      icon: "🎓",
      path: "/Events",
    },
    {
      title: "My Registration",
      description:
        "View the events you have registered for.",
      icon: "📋",
      path: "/MyRegistration",
    },
    {
      title: "Learning Path",
      description:
        "Continue learning and improve your skills.",
      icon: "📚",
      path: "/learning",
    },
    {
      title: "My Certificates",
      description:
        "View your earned event certificates.",
      icon: "🏆",
      path:"/Certificate",
    },
    {
      title: "My Quiz",
      description:
        "Practice your technical knowledge with quizzes.",
      icon: "📝",
      path: "/MyQuiz",
    },
    {
      title: "My Profile",
      description:
        "View and update your personal information.",
      icon: "👤",
      path: "/Profile",
    },
  ];

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    navigate("/Login");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>EventFlow</h2>
          <p>Learn. Connect. Grow.</p>
        </div>

        <nav className="sidebar-menu">
          <button
            className="sidebar-link active"
            onClick={() => navigate("/Dashboard")}
          >
            <span>🏠</span>
            Dashboard
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/Events")}
          >
            <span>🎓</span>
            Explore Events
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/MyRegistration")}
          >
            <span>📋</span>
            My Registration
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/learning")}
          >
            <span>📚</span>
            Learning Path
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/Certificate")}
          >
            <span>🏆</span>
            My Certificates
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/my-quiz")}
          >
            <span>📝</span>
            My Quiz
          </button>
          <button
            className="sidebar-link"
            onClick={() => navigate("/ReminderCenter")}
          >
            <span>🔔</span>
    Reminder
          </button>


          <button
            className="sidebar-link"
            onClick={() => navigate("/Profile")}
          >
            <span>👤</span>
            My Profile
          </button>
        </nav>

        <button
          className="sidebar-link logout-link"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back to your learning space!</p>
          </div>

          {/* Profile button with photo */}
          <button
            type="button"
            className="dashboard-user-info"
            onClick={() => navigate("/Profile")}
            aria-label="Open my profile"
          >
            <div className="dashboard-user-text">
              <h4>{userName}</h4>
              <p>{user?.role || "User"}</p>
            </div>

            <img
  src="/profile.jpg"
  alt="Profile"
  className="dashboard-profile-image"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      "https://placehold.co/100x100?text=User";
  }}
/>
          </button>
        </header>

        {/* Welcome Banner */}
        <section className="dashboard-welcome-banner">
          <div className="welcome-content">
            <p className="welcome-label">
              YOUR LEARNING JOURNEY
            </p>

            <h1>Welcome back, {userName}!</h1>

            <p>
              Explore educational events, develop new skills,
              and make every learning opportunity count with
              EventFlow.
            </p>

            <button
              className="welcome-button"
              onClick={() => navigate("/Events")}
            >
              Explore Events <span>→</span>
            </button>
          </div>
        </section>

        {/* Workspace Cards */}
        <section className="dashboard-overview">
          <div className="dashboard-section-heading">
            <div>
              <h2>Your Workspace</h2>
              <p>Everything you need in one place.</p>
            </div>
          </div>

          <div className="dashboard-cards-grid">
            {dashboardCards.map((card) => (
              <div
                className="dashboard-card"
                key={card.title}
                onClick={() => navigate(card.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    navigate(card.path);
                  }
                }}
              >
                <div className="dashboard-card-icon">
                  {card.icon}
                </div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <span className="dashboard-card-link">
                  Open page →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="dashboard-bottom-banner">
          <div>
            <h2>Keep Learning, Keep Growing!</h2>
            <p>
              Take the next step in your learning journey
              with EventFlow.
            </p>
          </div>

          <button
            className="bottom-banner-button"
            onClick={() => navigate("/learning")}
          >
            Continue Learning →
          </button>
        </section>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>
            © {new Date().getFullYear()} EventFlow.
            All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
