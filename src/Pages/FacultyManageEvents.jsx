
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyManageEvents.css";

function FacultyManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Talk",
      category: "Technology",
      date: "2026-10-15",
      time: "10:00 AM",
      location: "Computer Science Department",
      status: "Published",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      category: "Workshop",
      date: "2026-10-18",
      time: "10:00 AM",
      location: "Computer Lab",
      status: "Published",
    },
    {
      id: 3,
      title: "Communication Skills Workshop",
      category: "Workshop",
      date: "2026-10-22",
      time: "11:00 AM",
      location: "Seminar Hall",
      status: "Draft",
    },
  ]);

  const emptyForm = {
    title: "",
    category: "Workshop",
    date: "",
    time: "",
    location: "",
    status: "Draft",
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date || !formData.location.trim()) {
      window.alert("Please fill in the required fields.");
      return;
    }

    if (editingId !== null) {
      setEvents((previous) =>
        previous.map((event) =>
          event.id === editingId
            ? { ...event, ...formData }
            : event
        )
      );
    } else {
      setEvents((previous) => [
        ...previous,
        { id: Date.now(), ...formData },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData({ ...emptyForm });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  const publishedCount = events.filter(
    (event) => event.status === "Published"
  ).length;

  const draftCount = events.filter(
    (event) => event.status === "Draft"
  ).length;

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
            className="faculty-nav-link"
            onClick={() => navigate("/faculty")}
          >
            <span className="faculty-nav-icon">▦</span>
            Dashboard
          </button>

          <button
            type="button"
            className="faculty-nav-link active"
            onClick={() => navigate("/faculty/events")}
          >
            <span className="faculty-nav-icon">◈</span>
            Manage Events
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => navigate("/faculty/registrations")}
          >
            <span className="faculty-nav-icon">♙</span>
            Registrations
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => navigate("/faculty/quizzes")}
          >
            <span className="faculty-nav-icon">☷</span>
            Manage Quizzes
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => navigate("/faculty/results")}
          >
            <span className="faculty-nav-icon">▤</span>
            Student Results
          </button>

          <button
            type="button"
            className="faculty-nav-link"
            onClick={() => navigate("/faculty/profile")}
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

      <main className="faculty-main faculty-events-main">
        <header className="faculty-topbar">
          <div>
            <h2>Manage Events</h2>
            <p>Create and organize educational events.</p>
          </div>

          <div className="faculty-account">
            <div className="faculty-avatar">F</div>
            <div>
              <strong>Faculty Member</strong>
              <span>Faculty</span>
            </div>
          </div>
        </header>

        <section className="faculty-events-banner">
          <div>
            <span className="faculty-events-eyebrow">
              EVENT MANAGEMENT
            </span>
            <h1>Educational Events</h1>
            <p>
              Plan workshops, tech talks and learning activities
              for students.
            </p>
          </div>

          <button
            type="button"
            className="faculty-event-add"
            onClick={openAddForm}
          >
            + Create Event
          </button>
        </section>

        <section className="faculty-event-stats">
          <article>
            <span className="event-stat-symbol purple">◈</span>
            <div>
              <p>Total Events</p>
              <h2>{events.length}</h2>
            </div>
          </article>

          <article>
            <span className="event-stat-symbol green">✓</span>
            <div>
              <p>Published</p>
              <h2>{publishedCount}</h2>
            </div>
          </article>

          <article>
            <span className="event-stat-symbol orange">✎</span>
            <div>
              <p>Drafts</p>
              <h2>{draftCount}</h2>
            </div>
          </article>
        </section>

        <section className="faculty-events-table-card">
          <div className="faculty-events-table-heading">
            <div>
              <h2>All Events</h2>
              <p>View, edit and manage your events.</p>
            </div>
          </div>

          <div className="faculty-events-filters">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="faculty-events-table-scroll">
            <table className="faculty-events-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <strong>{event.title}</strong>
                        <span className="faculty-event-location">
                          {event.location}
                        </span>
                      </td>

                      <td>{event.category}</td>
                      <td>{event.date}</td>
                      <td>{event.time}</td>

                      <td>
                        <span
                          className={`faculty-event-status ${
                            event.status === "Published"
                              ? "published"
                              : "draft"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>

                      <td>
                        <div className="faculty-event-actions">
                          <button
                            type="button"
                            className="faculty-event-edit"
                            onClick={() => openEditForm(event)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="faculty-event-delete"
                            onClick={() => handleDelete(event.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="faculty-event-empty">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showForm && (
        <div className="faculty-event-modal-overlay">
          <div className="faculty-event-modal">
            <div className="faculty-event-modal-heading">
              <div>
                <h2>{editingId !== null ? "Edit Event" : "Create Event"}</h2>
                <p>Enter the event information.</p>
              </div>

              <button
                type="button"
                className="faculty-event-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="faculty-event-title">Event Name</label>
              <input
                id="faculty-event-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />

              <label htmlFor="faculty-event-category">Category</label>
              <select
                id="faculty-event-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Workshop">Workshop</option>
                <option value="Technology">Technology</option>
                <option value="Seminar">Seminar</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Exhibition">Exhibition</option>
              </select>

              <div className="faculty-event-form-row">
                <div>
                  <label htmlFor="faculty-event-date">Date</label>
                  <input
                    id="faculty-event-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="faculty-event-time">Time</label>
                  <input
                    id="faculty-event-time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="faculty-event-location">Location</label>
              <input
                id="faculty-event-location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
              />

              <label htmlFor="faculty-event-status">Status</label>
              <select
                id="faculty-event-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <div className="faculty-event-modal-actions">
                <button
                  type="button"
                  className="faculty-event-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="faculty-event-save"
                >
                  {editingId !== null ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyManageEvents;
