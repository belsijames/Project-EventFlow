import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageEvents.css";
import { getAuthHeaders } from "../api/client";

function ManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const emptyForm = {
    title: "",
    category: "Workshop",
    date: "",
    time: "",
    location: "",
    status: "Upcoming",
  };

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load events.");
      }

      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("Fetch events error:", err);
      setError(err.message || "Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    String(event.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.date ||
      !form.time ||
      !form.location.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editId !== null) {
        const response = await fetch(
          `http://localhost:5000/api/events/${editId}`,
          {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(form),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Failed to update event.");
          return;
        }
      } else {
        const response = await fetch("http://localhost:5000/api/events", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Failed to create event.");
          return;
        }
      }

      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error("Save event error:", err);
      alert("Unable to save event. Check backend connection.");
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status,
    });

    setEditId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to delete event.");
        return;
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event.id !== id)
      );
    } catch (err) {
      console.error("Delete event error:", err);
      alert("Unable to delete event.");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="manage-events-page">
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
          
        </div>
      </aside>

      <main className="manage-events-main">
        <header className="events-topbar">
          <div>
            <p className="events-eyebrow">EVENTFLOW / ADMIN</p>
            <h1>Manage Events</h1>
            <p className="events-subtitle">
              Create, update and manage educational events.
            </p>
          </div>

          <button
            className="events-add-btn"
            onClick={() => {
              setForm(emptyForm);
              setEditId(null);
              setShowForm(true);
            }}
          >
            + Add New Event
          </button>
        </header>

        {error && (
          <div style={{ color: "#e11d48", padding: "10px", margin: "10px 0" }}>
            {error}
          </div>
        )}

        <section className="events-summary">
          <div className="events-summary-card">
            <span>🎉</span>
            <div>
              <p>Total Events</p>
              <h2>{events.length}</h2>
            </div>
          </div>

          <div className="events-summary-card">
            <span>📅</span>
            <div>
              <p>Upcoming Events</p>
              <h2>
                {events.filter((event) => event.status === "Upcoming").length}
              </h2>
            </div>
          </div>

          <div className="events-summary-card">
            <span>🗂️</span>
            <div>
              <p>Categories</p>
              <h2>{new Set(events.map((event) => event.category)).size}</h2>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="events-form-card">
            <div className="events-form-heading">
              <div>
                <p className="events-eyebrow">
                  {editId !== null ? "UPDATE EVENT" : "NEW EVENT"}
                </p>
                <h2>
                  {editId !== null ? "Edit Event" : "Add New Event"}
                </h2>
              </div>
              <button
                className="events-close-btn"
                type="button"
                onClick={handleCancel}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="events-form-grid">
                <label>
                  Event Title *
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    required
                  />
                </label>

                <label>
                  Category *
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Workshop</option>
                    <option>Technology</option>
                    <option>Seminar</option>
                    <option>Exhibition</option>
                    <option>Career Guidance</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Event Date *
                  <input
                    type="text"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="e.g. 20 Oct 2026"
                    required
                  />
                </label>

                <label>
                  Event Time *
                  <input
                    type="text"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="e.g. 10:00 AM – 1:00 PM"
                    required
                  />
                </label>

                <label>
                  Location *
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    required
                  />
                </label>

                <label>
                  Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Upcoming</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </label>
              </div>

              <div className="events-form-actions">
                <button
                  type="button"
                  className="events-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="events-save-btn">
                  {editId !== null ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="events-table-card">
          <div className="events-table-heading">
            <div>
              <h2>All Events</h2>
              <p>Manage your educational event schedule.</p>
            </div>

            <input
              className="events-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
            />
          </div>

          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="events-empty">
                      Loading events from database...
                    </td>
                  </tr>
                ) : filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="events-name-cell">{event.title}</td>
                    <td>
                      <span className="events-category">
                        {event.category}
                      </span>
                    </td>
                    <td>
                      {event.date}
                      <small className="events-time">{event.time}</small>
                    </td>
                    <td>{event.location}</td>
                    <td>
                      <span
                        className={`events-status events-status-${String(event.status || "").toLowerCase()}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <div className="events-actions">
                        <button
                          className="events-edit-btn"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="events-delete-btn"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="events-empty">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageEvents;
