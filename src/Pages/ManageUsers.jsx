import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";
import { getAuthHeaders } from "../api/client";

function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load users.");
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      console.error("Manage users error:", err);
      setError(err.message || "Failed to load users from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();
    const name = String(user.name || "").toLowerCase();
    const email = String(user.email || "").toLowerCase();
    const department = String(user.department || "").toLowerCase();

    const matchesSearch =
      name.includes(searchText) ||
      email.includes(searchText) ||
      department.includes(searchText);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user.");
        return;
      }

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      if (selectedUser && selectedUser.id === id) {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Delete user error:", err);
      alert("Unable to delete user. Please check server connection.");
    }
  };

  return (
    <div className="manage-users-page">
      <aside className="users-sidebar">
        <div className="users-brand">
          <span>✦</span>
          <h2>EventFlow</h2>
        </div>

        <p className="users-menu-label">ADMIN MENU</p>

        <button
          className="users-nav-item"
          onClick={() => navigate("/admin")}
        >
          <span>📊</span> Dashboard
        </button>

        <button
          className="users-nav-item"
          onClick={() => navigate("/admin/events")}
        >
          <span>🎉</span> Manage Events
        </button>

        <button className="users-nav-item users-nav-active">
          <span>👥</span> Manage Users
        </button>

        <button
          className="users-nav-item"
          onClick={() => navigate("/admin/registrations")}
        >
          <span>📝</span> Registrations
        </button>

        <button
          className="users-nav-item"
          onClick={() => navigate("/admin/quizzes")}
        >
          <span>📚</span> Manage Quizzes
        </button>

        <button
          className="users-logout"
          onClick={() => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/Login");
          }}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="manage-users-main">
        <header className="users-topbar">
          <div>
            <p className="users-eyebrow">EVENTFLOW / ADMIN</p>
            <h1>Manage Users</h1>
            <p className="users-subtitle">
              View and manage platform members and their roles.
            </p>
          </div>

          <div className="users-admin-badge">
            <span>✦</span> Admin Panel
          </div>
        </header>

        {error && (
          <div style={{ color: "#e11d48", padding: "10px", margin: "10px 0" }}>
            {error}
          </div>
        )}

        <section className="users-summary">
          <article className="users-summary-card">
            <div className="users-summary-icon">👥</div>
            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>
          </article>

          <article className="users-summary-card">
            <div className="users-summary-icon">🎓</div>
            <div>
              <p>Students / Users</p>
              <h2>
                {users.filter((user) => user.role === "User").length}
              </h2>
            </div>
          </article>

          <article className="users-summary-card">
            <div className="users-summary-icon">👩‍🏫</div>
            <div>
              <p>Faculty</p>
              <h2>
                {users.filter((user) => user.role === "Faculty").length}
              </h2>
            </div>
          </article>

          <article className="users-summary-card">
            <div className="users-summary-icon">🛡️</div>
            <div>
              <p>Administrators</p>
              <h2>
                {users.filter((user) => user.role === "Admin").length}
              </h2>
            </div>
          </article>
        </section>

        <section className="users-table-card">
          <div className="users-table-heading">
            <div>
              <h2>Registered Users</h2>
              <p>Search and review user information.</p>
            </div>

            <span className="users-total-badge">
              {filteredUsers.length} users
            </span>
          </div>

          <div className="users-filters">
            <input
              type="text"
              placeholder="Search name, email or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search users"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter by role"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="users-empty">
                      Loading users from database...
                    </td>
                  </tr>
                ) : filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="users-person">
                        <div className="users-avatar">
                          {String(user.name || "U").charAt(0).toUpperCase()}
                        </div>

                        <div className="users-person-info">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{user.department || "—"}</td>
                    <td>{user.year || "—"}</td>

                    <td>
                      <span
                        className={`users-role users-role-${String(user.role || "").toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <div className="users-actions">
                        <button
                          className="users-view-btn"
                          onClick={() => setSelectedUser(user)}
                        >
                          View
                        </button>

                        <button
                          className="users-delete-btn"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="users-empty">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {selectedUser && (
          <div className="users-modal-overlay">
            <section className="users-modal">
              <button
                className="users-modal-close"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user details"
              >
                ×
              </button>

              <div className="users-modal-avatar">
                {String(selectedUser.name || "U").charAt(0).toUpperCase()}
              </div>

              <p className="users-eyebrow">USER DETAILS</p>
              <h2>{selectedUser.name}</h2>

              <div className="users-detail-row">
                <span>Email</span>
                <strong>{selectedUser.email}</strong>
              </div>

              <div className="users-detail-row">
                <span>Department</span>
                <strong>{selectedUser.department || "Not provided"}</strong>
              </div>

              <div className="users-detail-row">
                <span>Year</span>
                <strong>{selectedUser.year || "Not provided"}</strong>
              </div>

              <div className="users-detail-row">
                <span>Role</span>
                <strong>{selectedUser.role}</strong>
              </div>

              <button
                className="users-modal-done"
                onClick={() => setSelectedUser(null)}
              >
                Close Details
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageUsers;
