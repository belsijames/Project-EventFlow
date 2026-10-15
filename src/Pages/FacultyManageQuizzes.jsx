import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import "./FacultyManageQuizzes.css";
import { getAuthHeaders } from "../api/client";

function FacultyManageQuizzes() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    category: "",
    questions: "10",
    duration: "15",
    status: "Draft",
  };

  const [form, setForm] = useState(emptyForm);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/quizzes", {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load quizzes.");
      }

      setQuizzes(
        Array.isArray(data.quizzes)
          ? data.quizzes.map((q) => ({
              ...q,
              category: q.category || q.topic || "General",
            }))
          : []
      );
    } catch (err) {
      console.error("Fetch quizzes error:", err);
      setError(err.message || "Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const title = String(quiz.title || "").toLowerCase();
    const category = String(quiz.category || quiz.topic || "").toLowerCase();
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      title.includes(searchText) || category.includes(searchText);

    const matchesStatus =
      filterStatus === "All" || quiz.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (quiz) => {
    setEditingId(quiz.id);
    setForm({
      title: quiz.title,
      category: quiz.category || quiz.topic || "",
      questions: String(quiz.questions || 10),
      duration: String(quiz.duration || 15),
      status: quiz.status || "Published",
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.questions ||
      !form.duration
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      topic: form.category.trim(),
      questions: Number(form.questions),
      duration: Number(form.duration),
      status: form.status,
    };

    try {
      if (editingId !== null) {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/${editingId}`,
          {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Failed to update quiz.");
          return;
        }
      } else {
        const response = await fetch("http://localhost:5000/api/quizzes", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Failed to create quiz.");
          return;
        }
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchQuizzes();
    } catch (err) {
      console.error("Save quiz error:", err);
      alert("Unable to save quiz.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to delete quiz.");
        return;
      }

      setQuizzes((previous) => previous.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.error("Delete quiz error:", err);
      alert("Unable to delete quiz.");
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
            className="faculty-nav-link"
            onClick={() => navigate("/faculty")}
          >
            <span className="faculty-nav-icon">▦</span>
            Dashboard
          </button>

          <button
            type="button"
            className="faculty-nav-link "
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
            className="faculty-nav-link active"
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

      <main className="faculty-main faculty-quizzes-main">
        <header className="faculty-topbar">
          <div>
            <h2>Manage Quizzes</h2>
            <p>Create and edit quizzes for learning assessment.</p>
          </div>

          <div className="faculty-account">
            <div className="faculty-avatar">F</div>
            <div>
              <strong>Faculty Member</strong>
              <span>Faculty</span>
            </div>
          </div>
        </header>

        {error && (
          <div style={{ color: "#e11d48", padding: "10px", margin: "10px 0" }}>
            {error}
          </div>
        )}

        <section className="faculty-quizzes-banner">
          <div>
            <p>EVENTFLOW / FACULTY</p>
            <h1>Learning Assessments</h1>
            <span>Create learning assessments for students to practice.</span>
          </div>

          <button
            type="button"
            className="faculty-create-btn"
            onClick={openCreateForm}
          >
            + Create New Quiz
          </button>
        </section>

        <section className="faculty-quizzes-stats">
          <div className="faculty-quiz-stat">
            <span>Total Quizzes</span>
            <h2>{quizzes.length}</h2>
            <p>All active quizzes</p>
          </div>

          <div className="faculty-quiz-stat">
            <span>Published</span>
            <h2>
              {
                quizzes.filter(
                  (item) => item.status === "Published"
                ).length
              }
            </h2>
            <p>Available to students</p>
          </div>

          <div className="faculty-quiz-stat">
            <span>Draft</span>
            <h2>
              {
                quizzes.filter((item) => item.status === "Draft")
                  .length
              }
            </h2>
            <p>Unpublished quizzes</p>
          </div>
        </section>

        <section className="faculty-quizzes-table-card">
          <div className="faculty-quizzes-heading">
            <div>
              <h2>All Quizzes</h2>
              <p>Manage learning topics and duration.</p>
            </div>
          </div>

          <div className="faculty-quizzes-filters">
            <input
              type="text"
              placeholder="Search quiz by title or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="faculty-quizzes-table-wrapper">
            <table className="faculty-quizzes-table">
              <thead>
                <tr>
                  <th>QUIZ TITLE</th>
                  <th>TOPIC / CATEGORY</th>
                  <th>QUESTIONS</th>
                  <th>DURATION</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="faculty-quizzes-empty">
                      Loading quizzes from database...
                    </td>
                  </tr>
                ) : filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>
                      <strong>{quiz.title}</strong>
                    </td>

                    <td>{quiz.category || quiz.topic}</td>
                    <td>{quiz.questions} Questions</td>
                    <td>{quiz.duration} Mins</td>

                    <td>
                      <span
                        className={`faculty-quiz-status ${String(quiz.status || "").toLowerCase()}`}
                      >
                        {quiz.status}
                      </span>
                    </td>

                    <td>
                      <div className="faculty-quiz-actions">
                        <button
                          type="button"
                          className="faculty-quiz-edit"
                          onClick={() => openEditForm(quiz)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="faculty-quiz-delete"
                          onClick={() => handleDelete(quiz.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredQuizzes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="faculty-quizzes-empty">
                      No quizzes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showForm && (
        <div className="faculty-quiz-modal-overlay">
          <div className="faculty-quiz-modal">
            <div className="faculty-quiz-modal-heading">
              <div>
                <h2>{editingId !== null ? "Edit Quiz" : "Create Quiz"}</h2>
                <p>Provide quiz details below.</p>
              </div>

              <button
                type="button"
                className="faculty-quiz-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Quiz Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Node.js & Express Fundamentals"
                required
              />

              <label>Topic / Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                required
              />

              <div className="faculty-quiz-form-row">
                <div>
                  <label>Questions</label>
                  <input
                    name="questions"
                    type="number"
                    value={form.questions}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label>Duration (Minutes)</label>
                  <input
                    name="duration"
                    type="number"
                    value={form.duration}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <div className="faculty-quiz-modal-actions">
                <button
                  type="button"
                  className="faculty-quiz-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="faculty-quiz-save"
                >
                  {editingId !== null ? "Save Changes" : "Create Quiz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyManageQuizzes;
