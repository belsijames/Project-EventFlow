import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import "./FacultyRegistrations.css";
import { getAuthHeaders } from "../api/client";

function FacultyRegistrations() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/registrations", {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load registrations.");
      }

      const list = Array.isArray(data.registrations)
        ? data.registrations
        : Array.isArray(data)
        ? data
        : [];

      const normalized = list.map((item) => ({
        id: item.id,
        student: item.student || "Student",
        email: item.email || "—",
        event: item.event_name || item.event || "Event",
        date:
          item.event_date ||
          (item.registered_at ? item.registered_at.slice(0, 10) : "—"),
        status: item.status || "Pending",
      }));

      setRegistrations(normalized);
    } catch (err) {
      console.error("Faculty registrations error:", err);
      setError(err.message || "Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter((item) => {
    const student = String(item.student || "");
    const email = String(item.email || "");
    const event = String(item.event || "");
    const status = String(item.status || "");

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      event.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" || status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/registrations/${id}/status`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to update registration status.");
        return;
      }

      setRegistrations((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
      alert("Unable to update status.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/Login");
    }
  };

  return (
    <div className="faculty-layout">
      <aside className="faculty-sidebar">
        <div className="faculty-brand">
          <span className="faculty-brand-icon">✦</span>
          <span>EventFlow</span>
        </div>

        <p className="faculty-menu-label">FACULTY MENU</p>

        <nav className="faculty-navigation">
          <button
            type="button"
            className=""
            onClick={() => navigate("/faculty")}
          >
            <span>▦</span>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/faculty/events")}
          >
            <span>▣</span>
            <span>Manage Events</span>
          </button>

          <button
            type="button"
            className="active"
            onClick={() => navigate("/faculty/registrations")}
          >
            <span>☷</span>
            <span>Registrations</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/faculty/quizzes")}
          >
            <span>✎</span>
            <span>Manage Quizzes</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/faculty/results")}
          >
            <span>▤</span>
            <span>Quiz Results</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/faculty/profile")}
          >
            <span>♙</span>
            <span>My Profile</span>
          </button>
        </nav>

        <button className="faculty-logout" onClick={handleLogout}>
          ↪ Logout
        </button>
      </aside>

      <main className="faculty-main faculty-registrations-main">
        <header className="faculty-topbar">
          <div>
            <h2>Registrations</h2>
            <p>Manage student registrations for your events.</p>
          </div>

          <div className="faculty-account">
            <div className="faculty-avatar">F</div>
            <div>
              <strong>Faculty</strong>
              <span>Event Coordinator</span>
            </div>
          </div>
        </header>

        {error && (
          <div style={{ color: "#e11d48", padding: "10px", margin: "10px 0" }}>
            {error}
          </div>
        )}

        <section className="faculty-registration-banner">
          <div>
            <p>EVENTFLOW / FACULTY</p>
            <h1>Student Registrations</h1>
            <span>
              Review registrations and manage student participation.
            </span>
          </div>
          <div className="faculty-registration-banner-icon">☷</div>
        </section>

        <section className="faculty-registration-stats">
          <div className="faculty-registration-stat">
            <span>Total Registrations</span>
            <h2>{registrations.length}</h2>
            <p>All event registrations</p>
          </div>

          <div className="faculty-registration-stat">
            <span>Approved</span>
            <h2>
              {
                registrations.filter(
                  (item) =>
                    item.status === "Approved" || item.status === "Confirmed"
                ).length
              }
            </h2>
            <p>Confirmed participants</p>
          </div>

          <div className="faculty-registration-stat">
            <span>Pending</span>
            <h2>
              {registrations.filter((item) => item.status === "Pending").length}
            </h2>
            <p>Awaiting review</p>
          </div>

          <div className="faculty-registration-stat">
            <span>Rejected</span>
            <h2>
              {
                registrations.filter((item) => item.status === "Rejected")
                  .length
              }
            </h2>
            <p>Not approved</p>
          </div>
        </section>

        <section className="faculty-registration-table-card">
          <div className="faculty-registration-heading">
            <div>
              <h2>Registration Details</h2>
              <p>Search and review student event registrations.</p>
            </div>
          </div>

          <div className="faculty-registration-filters">
            <input
              type="text"
              placeholder="Search student, email or event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="faculty-registration-table-wrapper">
            <table className="faculty-registration-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>EVENT</th>
                  <th>EVENT DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="faculty-registration-empty">
                      Loading registrations...
                    </td>
                  </tr>
                ) : filteredRegistrations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.student}</strong>
                      <span className="faculty-registration-email">
                        {item.email}
                      </span>
                    </td>

                    <td>{item.event}</td>
                    <td>{item.date}</td>

                    <td>
                      <span
                        className={`faculty-registration-status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="faculty-registration-actions">
                        {item.status !== "Approved" &&
                          item.status !== "Confirmed" && (
                            <button
                              className="faculty-registration-approve"
                              onClick={() => updateStatus(item.id, "Approved")}
                            >
                              Approve
                            </button>
                          )}

                        {item.status !== "Rejected" && (
                          <button
                            className="faculty-registration-reject"
                            onClick={() => updateStatus(item.id, "Rejected")}
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="faculty-registration-empty">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="faculty-registration-count">
            Showing {filteredRegistrations.length} of {registrations.length}{" "}
            registrations
          </p>
        </section>
      </main>
    </div>
  );
}

export default FacultyRegistrations;
