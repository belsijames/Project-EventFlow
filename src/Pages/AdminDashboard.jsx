import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
const navigate = useNavigate();

const menuItems = [
{ icon: "📊", title: "Dashboard", path: "/admin" },
{ icon: "🎉", title: "Manage Events", path: "/admin/events" },
{ icon: "👥", title: "Manage Users", path: "/admin/users" },
{ icon: "📝", title: "Registrations", path: "/admin/registrations" },
{ icon: "📚", title: "Manage Quizzes", path: "/admin/quizzes" },
];

const stats = [
{ icon: "🎉", title: "Total Events", value: "0" },
{ icon: "👥", title: "Total Users", value: "0" },
{ icon: "📝", title: "Registrations", value: "0" },
{ icon: "📚", title: "Total Quizzes", value: "0" },
];


const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    localStorage.removeItem("currentUser");
    navigate("/");
  }
};


return ( <div className="admin-layout"> <aside className="admin-sidebar"> <div className="admin-brand"> <span className="admin-brand-icon">✦</span> <h2>EventFlow</h2> </div>

    <p className="admin-menu-label">MAIN MENU</p>

    <nav className="admin-menu">
      {menuItems.map((item, index) => (
        <button
          key={item.title}
          className={`admin-menu-item ${index === 0 ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          {item.title}
        </button>
      ))}
    </nav>

   
<button
  type="button"
  className="admin-logout"
  onClick={handleLogout}
>
  <span>↪</span> Logout
</button>

  </aside>

  <main className="admin-main">
    <header className="admin-topbar">
      <div>
        <p className="admin-eyebrow">EVENTFLOW / ADMIN</p>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-profile">
        <div className="admin-avatar">A</div>
        <div>
          <strong>Administrator</strong>
          <span>Admin Panel</span>
        </div>
      </div>
    </header>

    <section className="admin-welcome">
      <div>
        <p className="admin-welcome-tag">MANAGEMENT OVERVIEW</p>
        <h2>Welcome to EventFlow!</h2>
        <p>
          Manage educational events, users, registrations and learning
          activities from one place.
        </p>
      </div>
      <div className="admin-welcome-icon">✦</div>
    </section>

    <section className="admin-stats">
      {stats.map((stat) => (
        <article className="admin-stat-card" key={stat.title}>
          <div className="admin-stat-top">
            <span>{stat.title}</span>
            <div className="admin-stat-icon">{stat.icon}</div>
          </div>
          <h2>{stat.value}</h2>
          <p>Overview summary</p>
        </article>
      ))}
    </section>

    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <p className="admin-eyebrow">QUICK ACCESS</p>
          <h2>Management Centre</h2>
        </div>
        <span className="admin-section-note">Choose a section</span>
      </div>

      <div className="admin-management-grid">
        {menuItems.slice(1).map((item) => (
          <article className="admin-management-card" key={item.title}>
            <div className="admin-management-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>View and manage {item.title.toLowerCase()}.</p>
            <button onClick={() => navigate(item.path)}>
              Open Section <span>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>

    <footer className="admin-footer">
      EventFlow · Smart Educational Event Management and Learning Path
      Platform
    </footer>
  </main>
</div>


);
}

export default AdminDashboard;
