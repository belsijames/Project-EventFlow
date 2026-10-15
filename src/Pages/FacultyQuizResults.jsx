
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import "./FacultyQuizResults.css";

function FacultyQuizResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/quizzes/results", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.results)) {
            setResults(
              data.results.map((r) => ({
                id: r.id,
                student: r.student || "Student",
                email: r.email || "—",
                quiz: r.quiz || r.quiz_title || "Quiz",
                score: r.score,
                total: r.total,
                date: r.date ? String(r.date).slice(0, 10) : "—",
              }))
            );
          }
        })
        .catch((err) => console.error("Fetch quiz results error:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const [search, setSearch] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("All");
  const [selectedResult, setSelectedResult] = useState(null);

  const quizNames = [
    ...new Set(results.map((item) => item.quiz)),
  ];

  const filteredResults = results.filter((item) => {
    const student = String(item.student || "").toLowerCase();
    const email = String(item.email || "").toLowerCase();
    const quiz = String(item.quiz || "").toLowerCase();
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.includes(searchText) ||
      email.includes(searchText) ||
      quiz.includes(searchText);

    const matchesQuiz =
      selectedQuiz === "All" || item.quiz === selectedQuiz;

    return matchesSearch && matchesQuiz;
  });

  const percentage = (score, total) =>
    total > 0 ? Math.round((score / total) * 100) : 0;

  const getPerformance = (score, total) => {
    const percent = percentage(score, total);

    if (percent >= 80) return "Excellent";
    if (percent >= 60) return "Good";
    if (percent >= 40) return "Average";
    return "Needs Improvement";
  };

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (sum, item) => sum + percentage(item.score, item.total),
            0
          ) / results.length
        )
      : 0;

  const passedCount = results.filter(
    (item) => percentage(item.score, item.total) >= 40
  ).length;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Student",
      "Email",
      "Quiz",
      "Score",
      "Total Questions",
      "Percentage",
      "Performance",
      "Date",
    ];

    const rows = filteredResults.map((item) => [
      item.student,
      item.email,
      item.quiz,
      item.score,
      item.total,
      `${percentage(item.score, item.total)}%`,
      getPerformance(item.score, item.total),
      item.date,
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "faculty-quiz-results.csv";
    link.click();

    URL.revokeObjectURL(url);
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
            onClick={() => navigate("/faculty/quizzes")}
          >
            <span>✎</span>
            <span>Manage Quizzes</span>
          </button>

          <button
            type="button"
            className="active"
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
            <h1>Quiz Results</h1>
            <p>Track student performance and quiz scores.</p>
          </div>

          <div className="faculty-topbar-user">
            <div className="faculty-avatar">F</div>
            <div>
              <strong>Faculty</strong>
              <span>Faculty Account</span>
            </div>
          </div>
        </header>

        <section className="results-welcome">
          <div>
            <span className="results-eyebrow">STUDENT PERFORMANCE</span>
            <h2>Quiz Performance Overview</h2>
            <p>
              Review student scores, monitor learning progress, and
              download quiz result reports.
            </p>
          </div>

          <div className="results-welcome-icon">▤</div>
        </section>

        <section className="results-stats">
          <div className="results-stat-card">
            <div className="results-stat-icon purple">▤</div>
            <div>
              <p>Total Attempts</p>
              <h3>{results.length}</h3>
              <span>Quiz submissions</span>
            </div>
          </div>

          <div className="results-stat-card">
            <div className="results-stat-icon green">✓</div>
            <div>
              <p>Pass Rate</p>
              <h3>
                {results.length
                  ? Math.round((passedCount / results.length) * 100)
                  : 0}
                %
              </h3>
              <span>Score of 40% or higher</span>
            </div>
          </div>

          <div className="results-stat-card">
            <div className="results-stat-icon orange">↗</div>
            <div>
              <p>Average Score</p>
              <h3>{averageScore}%</h3>
              <span>Across all attempts</span>
            </div>
          </div>
        </section>

        <section className="results-content-card">
          <div className="results-content-heading">
            <div>
              <h2>Student Results</h2>
              <p>View scores and individual quiz performance.</p>
            </div>

            <button
              type="button"
              className="results-export-button"
              onClick={downloadCSV}
            >
              ↓ Export CSV
            </button>
          </div>

          <div className="results-toolbar">
            <div className="results-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search student or quiz..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              aria-label="Filter by quiz"
            >
              <option value="All">All Quizzes</option>
              {quizNames.map((quiz) => (
                <option key={quiz} value={quiz}>
                  {quiz}
                </option>
              ))}
            </select>
          </div>

          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>QUIZ</th>
                  <th>SCORE</th>
                  <th>PERFORMANCE</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => {
                    const percent = percentage(item.score, item.total);
                    const performance = getPerformance(
                      item.score,
                      item.total
                    );

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="results-student">
                            <div className="results-student-avatar">
                              {item.student.charAt(0)}
                            </div>
                            <div>
                              <strong>{item.student}</strong>
                              <span>{item.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>{item.quiz}</td>

                        <td>
                          <div className="results-score">
                            <strong>
                              {item.score}/{item.total}
                            </strong>
                            <span>{percent}%</span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`results-performance ${performance
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {performance}
                          </span>
                        </td>

                        <td>{item.date}</td>

                        <td>
                          <button
                            type="button"
                            className="results-view-button"
                            onClick={() => setSelectedResult(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="results-empty">
                      No quiz results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="results-table-footer">
            Showing {filteredResults.length} of {results.length} attempts
          </div>
        </section>
      </main>

      {selectedResult && (
        <div
          className="results-modal-overlay"
          onClick={() => setSelectedResult(null)}
        >
          <div
            className="results-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="results-modal-heading">
              <div>
                <h2>Quiz Result Details</h2>
                <p>Student performance summary</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="results-modal-close"
                aria-label="Close result details"
              >
                ×
              </button>
            </div>

            <div className="results-detail-avatar">
              {selectedResult.student.charAt(0)}
            </div>

            <h3 className="results-detail-name">
              {selectedResult.student}
            </h3>
            <p className="results-detail-email">
              {selectedResult.email}
            </p>

            <div className="results-detail-box">
              <span>Quiz Name</span>
              <strong>{selectedResult.quiz}</strong>
            </div>

            <div className="results-detail-grid">
              <div className="results-detail-box">
                <span>Score</span>
                <strong>
                  {selectedResult.score}/{selectedResult.total}
                </strong>
              </div>

              <div className="results-detail-box">
                <span>Percentage</span>
                <strong>
                  {percentage(
                    selectedResult.score,
                    selectedResult.total
                  )}
                  %
                </strong>
              </div>
            </div>

            <div className="results-detail-box">
              <span>Performance</span>
              <strong>
                {getPerformance(
                  selectedResult.score,
                  selectedResult.total
                )}
              </strong>
            </div>

            <div className="results-detail-box">
              <span>Submission Date</span>
              <strong>{selectedResult.date}</strong>
            </div>

            <button
              type="button"
              className="results-close-button"
              onClick={() => setSelectedResult(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyQuizResults;

