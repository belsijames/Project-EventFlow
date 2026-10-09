import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageQuizzes.css";

function ManageQuizzes() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "HTML Fundamentals",
      topic: "HTML",
      questions: 10,
      duration: 15,
      status: "Published",
    },
    {
      id: 2,
      title: "CSS Fundamentals",
      topic: "CSS",
      questions: 10,
      duration: 15,
      status: "Published",
    },
    {
      id: 3,
      title: "JavaScript Basics",
      topic: "JavaScript",
      questions: 10,
      duration: 20,
      status: "Draft",
    },
    {
      id: 4,
      title: "React Fundamentals",
      topic: "React",
      questions: 10,
      duration: 20,
      status: "Published",
    },
  ]);

  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewQuiz, setViewQuiz] = useState(null);

  const emptyForm = {
    title: "",
    topic: "HTML",
    questions: 10,
    duration: 15,
    status: "Draft",
  };

  const [formData, setFormData] = useState(emptyForm);

  const publishedCount = quizzes.filter(
    (quiz) => quiz.status === "Published"
  ).length;

  const draftCount = quizzes.filter(
    (quiz) => quiz.status === "Draft"
  ).length;

  const filteredQuizzes = quizzes.filter((quiz) => {
    const title = quiz.title.toLowerCase();
    const topic = quiz.topic.toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      title.includes(searchText) || topic.includes(searchText);

    const matchesTopic =
      topicFilter === "All" || quiz.topic === topicFilter;

    return matchesSearch && matchesTopic;
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "questions" || name === "duration"
          ? Number(value)
          : value,
    }));
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setShowForm(true);
  };

  const handleEdit = (quiz) => {
    setEditingId(quiz.id);

    setFormData({
      title: quiz.title,
      topic: quiz.topic,
      questions: quiz.questions,
      duration: quiz.duration,
      status: quiz.status,
    });

    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.title.trim() === "" ||
      formData.questions < 1 ||
      formData.duration < 1
    ) {
      window.alert("Please fill in all fields correctly.");
      return;
    }

    if (editingId !== null) {
      setQuizzes((previous) =>
        previous.map((quiz) =>
          quiz.id === editingId
            ? { ...quiz, ...formData }
            : quiz
        )
      );
    } else {
      const newQuiz = {
        id: Date.now(),
        ...formData,
      };

      setQuizzes((previous) => [...previous, newQuiz]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData({ ...emptyForm });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmed) {
      return;
    }

    setQuizzes((previous) =>
      previous.filter((quiz) => quiz.id !== id)
    );

    if (viewQuiz && viewQuiz.id === id) {
      setViewQuiz(null);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setQuizzes((previous) =>
      previous.map((quiz) =>
        quiz.id === id
          ? { ...quiz, status: newStatus }
          : quiz
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-icon">✦</span>
          <span>EventFlow</span>
        </div>

        <p className="admin-sidebar-label">ADMIN MENU</p>

        <nav className="admin-navigation">
          <button
            type="button"
            onClick={() => navigate("/admin")}
          >
            <span>▦</span> Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/events")}
          >
            <span>◈</span> Manage Events
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/users")}
          >
            <span>♙</span> Manage Users
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/registrations")}
          >
            <span>▤</span> Registrations
          </button>

          <button
            type="button"
            className="active"
            onClick={() => navigate("/admin/quizzes")}
          >
            <span>☷</span> Manage Quizzes
          </button>
        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h2>Manage Quizzes</h2>
            <p>Manage learning quizzes in EventFlow</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <section className="quiz-welcome">
          <div>
            <h1>Quiz Management</h1>
            <p>
              Create, review and organize quizzes for students.
            </p>
          </div>

          <button
            type="button"
            className="quiz-add-button"
            onClick={handleAdd}
          >
            + Add New Quiz
          </button>
        </section>

        <section className="quiz-stat-grid">
          <div className="quiz-stat-card">
            <span className="quiz-stat-icon">☷</span>
            <div>
              <p>Total Quizzes</p>
              <h2>{quizzes.length}</h2>
            </div>
          </div>

          <div className="quiz-stat-card">
            <span className="quiz-stat-icon published-icon">✓</span>
            <div>
              <p>Published</p>
              <h2>{publishedCount}</h2>
            </div>
          </div>

          <div className="quiz-stat-card">
            <span className="quiz-stat-icon draft-icon">✎</span>
            <div>
              <p>Drafts</p>
              <h2>{draftCount}</h2>
            </div>
          </div>
        </section>

        <section className="quiz-table-card">
          <div className="quiz-table-heading">
            <div>
              <h2>All Quizzes</h2>
              <p>View and manage available quizzes</p>
            </div>
          </div>

          <div className="quiz-filters">
            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={topicFilter}
              onChange={(event) =>
                setTopicFilter(event.target.value)
              }
            >
              <option value="All">All Topics</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
            </select>
          </div>

          <div className="quiz-table-wrapper">
            <table className="quiz-table">
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Topic</th>
                  <th>Questions</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <strong>{quiz.title}</strong>
                      </td>

                      <td>
                        <span className="quiz-topic">
                          {quiz.topic}
                        </span>
                      </td>

                      <td>{quiz.questions}</td>

                      <td>{quiz.duration} min</td>

                      <td>
                        <select
                          className={`quiz-status-select ${
                            quiz.status === "Published"
                              ? "status-published"
                              : "status-draft"
                          }`}
                          value={quiz.status}
                          onChange={(event) =>
                            handleStatusChange(
                              quiz.id,
                              event.target.value
                            )
                          }
                          aria-label={`Change status for ${quiz.title}`}
                        >
                          <option value="Published">
                            Published
                          </option>
                          <option value="Draft">Draft</option>
                        </select>
                      </td>

                      <td>
                        <div className="quiz-action-buttons">
                          <button
                            type="button"
                            className="quiz-view-button"
                            onClick={() => setViewQuiz(quiz)}
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="quiz-edit-button"
                            onClick={() => handleEdit(quiz)}
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
                    <td colSpan="6" className="quiz-empty">
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
        <div className="quiz-modal-overlay">
          <div className="quiz-modal">
            <div className="quiz-modal-header">
              <div>
                <h2>
                  {editingId !== null ? "Edit Quiz" : "Add New Quiz"}
                </h2>
                <p>Enter the quiz details below.</p>
              </div>

              <button
                type="button"
                className="quiz-close-button"
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
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
                required
              />

              <label htmlFor="quiz-topic">Topic</label>
              <select
                id="quiz-topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
              >
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>

              <div className="quiz-form-row">
                <div>
                  <label htmlFor="quiz-questions">
                    Number of Questions
                  </label>
                  <input
                    id="quiz-questions"
                    name="questions"
                    type="number"
                    min="1"
                    value={formData.questions}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quiz-duration">
                    Duration (minutes)
                  </label>
                  <input
                    id="quiz-duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="quiz-status">Status</label>
              <select
                id="quiz-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
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

                <button
                  type="submit"
                  className="quiz-save-button"
                >
                  {editingId !== null ? "Save Changes" : "Add Quiz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewQuiz && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal">
            <div className="quiz-modal-header">
              <div>
                <h2>{viewQuiz.title}</h2>
                <p>Quiz information</p>
              </div>

              <button
                type="button"
                className="quiz-close-button"
                onClick={() => setViewQuiz(null)}
                aria-label="Close quiz details"
              >
                ×
              </button>
            </div>

            <div className="quiz-details">
              <p>
                <strong>Topic:</strong> {viewQuiz.topic}
              </p>
              <p>
                <strong>Questions:</strong> {viewQuiz.questions}
              </p>
              <p>
                <strong>Duration:</strong> {viewQuiz.duration} minutes
              </p>
              <p>
                <strong>Status:</strong> {viewQuiz.status}
              </p>
            </div>

            <button
              type="button"
              className="quiz-save-button quiz-details-close"
              onClick={() => setViewQuiz(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageQuizzes;

