import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";

function ManageUsers() {
const navigate = useNavigate();

const [users, setUsers] = useState([
{
id: 1,
name: "Mary",
email: "[mary@example.com](mailto:mary@example.com)",
department: "Computer Science",
year: "III Year",
role: "User",
},
{
id: 2,
name: "Sheela",
email: "[sheela@example.com](mailto:sheela@example.com)",
department: "Computer Science",
year: "III Year",
role: "Faculty",
},
{
id: 3,
name: "Admin",
email: "[admin@example.com](mailto:admin@example.com)",
department: "Administration",
year: "Staff",
role: "Admin",
},
]);

const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("All");
const [selectedUser, setSelectedUser] = useState(null);

const filteredUsers = users.filter((user) => {
const searchText = search.toLowerCase();

const matchesSearch =
user.name.toLowerCase().includes(searchText) ||
user.email.toLowerCase().includes(searchText) ||
user.department.toLowerCase().includes(searchText);

const matchesRole =
roleFilter === "All" || user.role === roleFilter;

return matchesSearch && matchesRole;
});

const handleDelete = (id) => {
const confirmed = window.confirm(
"Are you sure you want to remove this user?"
);

```
if (!confirmed) return;

setUsers((previousUsers) =>
  previousUsers.filter((user) => user.id !== id)
);

if (selectedUser && selectedUser.id === id) {
  setSelectedUser(null);
}
```

};

return ( <div className="manage-users-page"> <aside className="users-sidebar"> <div className="users-brand"> <span>✦</span> <h2>EventFlow</h2> </div>

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
        navigate("/");
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="users-person">
                    <div className="users-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="users-person-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </td>

                <td>{user.department}</td>
                <td>{user.year}</td>

                <td>
                  <span
                    className={`users-role users-role-${user.role.toLowerCase()}`}
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

            {filteredUsers.length === 0 && (
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
            {selectedUser.name.charAt(0).toUpperCase()}
          </div>

          <p className="users-eyebrow">USER DETAILS</p>
          <h2>{selectedUser.name}</h2>

          <div className="users-detail-row">
            <span>Email</span>
            <strong>{selectedUser.email}</strong>
          </div>

          <div className="users-detail-row">
            <span>Department</span>
            <strong>{selectedUser.department}</strong>
          </div>

          <div className="users-detail-row">
            <span>Year</span>
            <strong>{selectedUser.year}</strong>
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
