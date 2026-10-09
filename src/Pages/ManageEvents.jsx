import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageEvents.css";

function ManageEvents() {
const navigate = useNavigate();

const [events, setEvents] = useState([
{
id: 1,
title: "Tech Talk",
category: "Technology",
date: "2026-10-10",
time: "10:00 AM",
location: "Computer Science Department",
status: "Upcoming",
},
{
id: 2,
title: "Web Development Bootcamp",
category: "Workshop",
date: "2026-10-15",
time: "10:00 AM",
location: "Computer Lab",
status: "Upcoming",
},
{
id: 3,
title: "Communication Skills Workshop",
category: "Workshop",
date: "2026-10-20",
time: "11:00 AM",
location: "Seminar Hall",
status: "Upcoming",
},
{
id: 4,
title: "Science and Innovation Expo",
category: "Exhibition",
date: "2026-10-25",
time: "09:30 AM",
location: "College Auditorium",
status: "Upcoming",
},
]);

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

const filteredEvents = events.filter((event) =>
event.title.toLowerCase().includes(search.toLowerCase())
);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
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

if (editId !== null) {
setEvents((previousEvents) =>
previousEvents.map((event) =>
event.id === editId
? { ...event, ...form }
: event
)
);
} else {
const newEvent = {
...form,
id: Date.now(),
};

setEvents((previousEvents) => [
  ...previousEvents,
  newEvent,
]);


}

setForm(emptyForm);
setEditId(null);
setShowForm(false);
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


const handleDelete = (id) => {
const confirmed = window.confirm(
"Are you sure you want to delete this event?"
);

if (!confirmed) return;

setEvents((previousEvents) =>
previousEvents.filter((event) => event.id !== id)
);
};


const handleCancel = () => {
setForm(emptyForm);
setEditId(null);
setShowForm(false);
};

return ( <div className="manage-events-page"> <aside className="events-sidebar"> <div className="events-brand"> <span>✦</span> <h2>EventFlow</h2> </div>

    <p className="events-menu-label">ADMIN MENU</p>

    <button
      className="events-nav-item"
      onClick={() => navigate("/admin")}
    >
      <span>📊</span> Dashboard
    </button>

    <button className="events-nav-item events-nav-active">
      <span>🎉</span> Manage Events
    </button>

    <button
      className="events-nav-item"
      onClick={() => navigate("/admin/users")}
    >
      <span>👥</span> Manage Users
    </button>

    <button
      className="events-nav-item"
      onClick={() => navigate("/admin/registrations")}
    >
      <span>📝</span> Registrations
    </button>

    <button
      className="events-nav-item"
      onClick={() => navigate("/admin/quizzes")}
    >
      <span>📚</span> Manage Quizzes
    </button>

    <button
      className="events-logout"
      onClick={() => {
        localStorage.removeItem("currentUser");
        navigate("/");
      }}
    >
      ↪ Logout
    </button>
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
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Event Time *
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
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
            {filteredEvents.map((event) => (
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
                    className={`events-status events-status-${event.status.toLowerCase()}`}
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

            {filteredEvents.length === 0 && (
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
