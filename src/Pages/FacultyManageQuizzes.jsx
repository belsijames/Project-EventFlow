
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import "./FacultyManageQuizzes.css";

function FacultyManageQuizzes() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "HTML Fundamentals",
      category: "Web Development",
      questions: 10,
      duration: 15,
      status: "Published",
    },
    {
      id: 2,
      title: "CSS Basics",
      category: "Web Development",
      questions: 10,
      duration: 20,
      status: "Draft",
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      category: "Programming",
      questions: 15,
      duration: 25,
      status: "Published",
    },
  ]);

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

  const filteredQuizzes = quizzes.filter((quiz) => {
    const title = String(quiz.title || "").toLowerCase();
    const category = String(quiz.category || "").toLowerCase();
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
      category: quiz.category,
      questions: String(quiz.questions),
      duration: String(quiz.duration),
      status: quiz.status,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    const quizData = {
      title: form.title.trim(),
      category: form.category.trim(),
      questions: Number(form.questions),
      duration: Number(form.duration),
      status: form.status,
    };

    if (editingId !== null) {
      setQuizzes((previous) =>
        previous.map((quiz) =>
          quiz.id === editingId ? { ...quiz, ...quizData } : quiz
        )
      );
    } else {
      setQuizzes((previous) => [
        ...previous,
        { id: Date.now(), ...quizData },
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (confirmed) {
      setQuizzes((previous) => previous.filter((quiz) => quiz.id !== id));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  return (
    <div className="faculty-layout">
      <aside className="faculty-sidebar">
        <div className="faculty-brand">
          <div className="faculty-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <p>Faculty Portal</p>
          </div>
        </div>

        <div className="faculty-menu-title">MAIN MENU</div>

        <nav className="faculty-navigation">
          <button type="button" onClick={() => navigate("/faculty")}>
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
            onClick={() => navigate("/faculty/registrations")}
          >
            <span>☷</span>
            <span>Registrations</span>
          </button>

          <button
            type="button"
            className="active"
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

        <button
          type="button"
          className="faculty-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </aside>

      <main className="faculty-main">
        <header className="faculty-topbar">
          <div>
            <h1>Manage Quizzes</h1>
            <p>Create, update and manage learning quizzes.</p>
          </div>

          <div className="faculty-topbar-user">
            <div className="faculty-avatar">F</div>
            <div>
              <strong>Faculty</strong>
              <span>Faculty Account</span>
            </div>
          </div>
        </header>

        <section className="quiz-welcome">
          <div>
            <span className="quiz-eyebrow">LEARNING MANAGEMENT</span>
            <h2>Manage Your Quizzes</h2>
            <p>
              Create quizzes to help students test their knowledge and
              improve their learning progress.
            </p>
          </div>
          <div className="quiz-welcome-icon">✎</div>
        </section>

        <section className="quiz-stat-grid">
          <div className="quiz-stat-card">
            <div className="quiz-stat-icon purple">▤</div>
            <div>
              <p>Total Quizzes</p>
              <h3>{quizzes.length}</h3>
            </div>
          </div>

          <div className="quiz-stat-card">
            <div className="quiz-stat-icon green">✓</div>
            <div>
              <p>Published</p>
              <h3>
                {quizzes.filter((quiz) => quiz.status === "Published").length}
              </h3>
            </div>
          </div>

          <div className="quiz-stat-card">
            <div className="quiz-stat-icon orange">✎</div>
            <div>
              <p>Draft Quizzes</p>
              <h3>
                {quizzes.filter((quiz) => quiz.status === "Draft").length}
              </h3>
            </div>
          </div>
        </section>

        <section className="quiz-content-card">
          <div className="quiz-content-heading">
            <div>
              <h2>Quiz List</h2>
              <p>View and manage all your quizzes here.</p>
            </div>

            <button
              type="button"
              className="quiz-create-button"
              onClick={openCreateForm}
            >
              + Create Quiz
            </button>
          </div>

          <div className="quiz-toolbar">
            <div className="quiz-search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter quizzes by status"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="quiz-table-wrapper">
            <table className="quiz-table">
              <thead>
                <tr>
                  <th>QUIZ DETAILS</th>
                  <th>QUESTIONS</th>
                  <th>DURATION</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <div className="quiz-title-cell">
                          <div className="quiz-row-icon">✎</div>
                          <div>
                            <strong>{quiz.title}</strong>
                            <span>{quiz.category}</span>
                          </div>
                        </div>
                      </td>

                      <td>{quiz.questions} questions</td>
                      <td>{quiz.duration} mins</td>

                      <td>
                        <span
                          className={`quiz-status ${
                            quiz.status === "Published"
                              ? "published"
                              : "draft"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>

                      <td>
                        <div className="quiz-actions">
                          <button
                            type="button"
                            className="quiz-edit-button"
                            onClick={() => openEditForm(quiz)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="quiz-delete-button"
                            onClick={() => handleDelete(quiz.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="quiz-empty">
                      No quizzes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="quiz-table-footer">
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </div>
        </section>
      </main>

      {showForm && (
        <div
          className="quiz-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="quiz-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quiz-modal-heading">
              <div>
                <h2>{editingId !== null ? "Edit Quiz" : "Create Quiz"}</h2>
                <p>Enter the quiz details below.</p>
              </div>

              <button
                type="button"
                className="quiz-modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="quiz-title">Quiz Title</label>
              <input
                id="quiz-title"
                name="title"
                type="text"
                placeholder="Enter quiz title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <label htmlFor="quiz-category">Category</label>
              <input
                id="quiz-category"
                name="category"
                type="text"
                placeholder="e.g. Web Development"
                value={form.category}
                onChange={handleChange}
                required
              />

              <div className="quiz-form-row">
                <div>
                  <label htmlFor="quiz-questions">Number of Questions</label>
                  <input
                    id="quiz-questions"
                    name="questions"
                    type="number"
                    min="1"
                    value={form.questions}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quiz-duration">Duration (minutes)</label>
                  <input
                    id="quiz-duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="quiz-status">Status</label>
              <select
                id="quiz-status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <div className="quiz-modal-actions">
                <button
                  type="button"
                  className="quiz-cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="quiz-save-button">
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

