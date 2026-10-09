import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageRegistrations.css";

function ManageRegistrations() {
const navigate = useNavigate();

const [search, setSearch] = useState("");
const [eventFilter, setEventFilter] = useState("All");
const [registrations, setRegistrations] = useState([
{
id: 1,
student: "Mary",
email: "[mary@example.com](mailto:mary@example.com)",
event: "Tech Talk",
date: "08 Oct 2026",
status: "Confirmed",
},
{
id: 2,
student: "Sheela",
email: "[sheela@example.com](mailto:sheela@example.com)",
event: "Web Development Bootcamp",
date: "08 Oct 2026",
status: "Pending",
},
{
id: 3,
student: "Sarmin Banu",
email: "[sarmin@example.com](mailto:sarmin@example.com)",
event: "Communication Skills Workshop",
date: "09 Oct 2026",
status: "Confirmed",
},
{
id: 4,
student: "Abianto",
email: "[abianto@example.com](mailto:abianto@example.com)",
event: "Science and Innovation Expo",
date: "09 Oct 2026",
status: "Pending",
},
]);

const [selectedRegistration, setSelectedRegistration] =
useState(null);

const filteredRegistrations = registrations.filter((item) => {
const searchText = search.toLowerCase();

const matchesSearch =
item.student.toLowerCase().includes(searchText) ||
item.email.toLowerCase().includes(searchText) ||
item.event.toLowerCase().includes(searchText);

const matchesEvent =
eventFilter === "All" || item.event === eventFilter;

return matchesSearch && matchesEvent;
});

const handleStatusChange = (id, newStatus) => {
setRegistrations((previous) =>
previous.map((item) =>
item.id === id ? { ...item, status: newStatus } : item
)
);
};

const handleDelete = (id) => {
const confirmed = window.confirm(
"Are you sure you want to delete this registration?"
);

if (!confirmed) {
return;
}

setRegistrations((previous) =>
previous.filter((item) => item.id !== id)
);

setSelectedRegistration(null);
};


return ( <div className="manage-reg-page"> <aside className="reg-sidebar"> <div className="reg-brand"> <span className="reg-brand-icon">✦</span> <span>Event<span>Flow</span></span> </div>

    <p className="reg-menu-label">MAIN MENU</p>

    <button
      className="reg-side-link"
      onClick={() => navigate("/admin")}
    >
      <span>▦</span> Dashboard
    </button>

    <button
      className="reg-side-link"
      onClick={() => navigate("/admin/events")}
    >
      <span>◈</span> Manage Events
    </button>

    <button
      className="reg-side-link"
      onClick={() => navigate("/admin/users")}
    >
      <span>♙</span> Manage Users
    </button>

    <button className="reg-side-link active">
      <span>▤</span> Registrations
    </button>

    <button
      className="reg-side-link"
      onClick={() => navigate("/admin")}
    >
      <span>◉</span> Manage Quizzes
    </button>

    <div className="reg-sidebar-bottom">
      <button
        className="reg-side-link"
        onClick={() => navigate("/")}
      >
        <span>↪</span> Logout
      </button>
    </div>
  </aside>

  <main className="reg-main">
    <header className="reg-topbar">
      <div>
        <p className="reg-breadcrumb">Admin / Registrations</p>
        <h1>Manage Registrations</h1>
        <p className="reg-subtitle">
          View and manage student event registrations.
        </p>
      </div>

      <div className="reg-admin-profile">
        <div className="reg-admin-avatar">A</div>
        <div>
          <strong>Administrator</strong>
          <span>Admin Panel</span>
        </div>
      </div>
    </header>

    <section className="reg-stats">
      <div className="reg-stat-card">
        <div className="reg-stat-icon purple">▤</div>
        <div>
          <p>Total Registrations</p>
          <h2>{registrations.length}</h2>
        </div>
      </div>

      <div className="reg-stat-card">
        <div className="reg-stat-icon green">✓</div>
        <div>
          <p>Confirmed</p>
          <h2>
            {registrations.filter(
              (item) => item.status === "Confirmed"
            ).length}
          </h2>
        </div>
      </div>

      <div className="reg-stat-card">
        <div className="reg-stat-icon orange">◷</div>
        <div>
          <p>Pending</p>
          <h2>
            {registrations.filter(
              (item) => item.status === "Pending"
            ).length}
          </h2>
        </div>
      </div>
    </section>

    <section className="reg-content-card">
      <div className="reg-content-heading">
        <div>
          <h2>Student Registrations</h2>
          <p>Manage all event sign-ups in one place.</p>
        </div>
        <span className="reg-count">
          {filteredRegistrations.length} Records
        </span>
      </div>

      <div className="reg-filters">
        <div className="reg-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search student or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="All">All Events</option>
          <option value="Tech Talk">Tech Talk</option>
          <option value="Web Development Bootcamp">
            Web Development Bootcamp
          </option>
          <option value="Communication Skills Workshop">
            Communication Skills Workshop
          </option>
          <option value="Science and Innovation Expo">
            Science and Innovation Expo
          </option>
        </select>
      </div>

      <div className="reg-table-wrapper">
        <table className="reg-table">
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>EVENT NAME</th>
              <th>REGISTERED DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredRegistrations.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="reg-student-cell">
                    <div className="reg-student-avatar">
                      {item.student.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong>{item.student}</strong>
                      <span>{item.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="reg-event-name">
                    {item.event}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <select
                    className={`reg-status-select ${
                      item.status === "Confirmed"
                        ? "confirmed"
                        : "pending"
                    }`}
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>

                <td>
                  <div className="reg-actions">
                    <button
                      className="reg-view-btn"
                      title="View details"
                      onClick={() => setSelectedRegistration(item)}
                    >
                      View
                    </button>

                    <button
                      className="reg-delete-btn"
                      title="Delete registration"
                      onClick={() => handleDelete(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredRegistrations.length === 0 && (
              <tr>
                <td colSpan="5" className="reg-empty">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>

    {selectedRegistration && (
      <div
        className="reg-modal-overlay"
        onClick={() => setSelectedRegistration(null)}
      >
        <div
          className="reg-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="reg-modal-close"
            onClick={() => setSelectedRegistration(null)}
          >
            ✕
          </button>

          <div className="reg-modal-icon">▤</div>
          <h2>Registration Details</h2>
          <p className="reg-modal-description">
            Student event registration information
          </p>

          <div className="reg-detail-row">
            <span>Student Name</span>
            <strong>{selectedRegistration.student}</strong>
          </div>

          <div className="reg-detail-row">
            <span>Email Address</span>
            <strong>{selectedRegistration.email}</strong>
          </div>

          <div className="reg-detail-row">
            <span>Event Name</span>
            <strong>{selectedRegistration.event}</strong>
          </div>

          <div className="reg-detail-row">
            <span>Registered Date</span>
            <strong>{selectedRegistration.date}</strong>
          </div>

          <div className="reg-detail-row">
            <span>Status</span>
            <strong>{selectedRegistration.status}</strong>
          </div>

          <button
            className="reg-modal-done"
            onClick={() => setSelectedRegistration(null)}
          >
            Close Details
          </button>
        </div>
      </div>
    )}
  </main>
</div>

);
}

export default ManageRegistrations;
