
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyQuiz.css";

function MyQuiz() {
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 1,
      title: "HTML Fundamentals",
      description: "Test your knowledge of HTML tags and structure.",
      questions: 10,
      duration: "10 Minutes",
      level: "Beginner",
      path: "/quiz/html",
    },
    {
      id: 2,
      title: "CSS Fundamentals",
      description: "Practice selectors, layouts and styling concepts.",
      questions: 10,
      duration: "10 Minutes",
      level: "Beginner",
      path: "/quiz/css",
    },
    {
      id: 3,
      title: "JavaScript Basics",
      description: "Evaluate your knowledge of JavaScript concepts.",
      questions: 10,
      duration: "15 Minutes",
      level: "Intermediate",
      path: "/quiz/javascript",
    },
    {
      id: 4,
      title: "React Fundamentals",
      description: "Explore components, props, state and hooks.",
      questions: 10,
      duration: "15 Minutes",
      level: "Intermediate",
      path: "/quiz/react",
    },
  ];

  return (
    <div className="myquiz-page">
      <nav className="myquiz-navbar">
        <h2>EventFlow</h2>

        <div className="myquiz-navlinks">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => navigate("/learning")}>
            Learning Path
          </button>
          <button onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>
      </nav>

      <main className="myquiz-container">
        <div className="myquiz-heading">
          <p className="myquiz-label">LEARN • PRACTICE • IMPROVE</p>
          <h1>My Quizzes</h1>
          <p>
            Challenge yourself, test your skills, and track your learning
            progress.
          </p>
        </div>

        <div className="myquiz-summary">
          <div className="myquiz-stat">
            <span>📚</span>
            <div>
              <h3>{quizzes.length}</h3>
              <p>Available Quizzes</p>
            </div>
          </div>

          <div className="myquiz-stat">
            <span>🎯</span>
            <div>
              <h3>10</h3>
              <p>Questions per Quiz</p>
            </div>
          </div>

          <div className="myquiz-stat">
            <span>🏆</span>
            <div>
              <h3>Practice</h3>
              <p>Improve Your Skills</p>
            </div>
          </div>
        </div>

        <h2 className="myquiz-section-title">Choose Your Quiz</h2>

        <div className="myquiz-grid">
          {quizzes.map((quiz) => (
            <div className="myquiz-card" key={quiz.id}>
              <div className={`myquiz-card-icon quiz-icon-${quiz.id}`}>
                {["🌐", "🎨", "⚡", "⚛️"][quiz.id - 1]}
              </div>

              <span className="myquiz-level">{quiz.level}</span>

              <h3>{quiz.title}</h3>
              <p className="myquiz-description">{quiz.description}</p>

              <div className="myquiz-meta">
                <span>📝 {quiz.questions} Questions</span>
                <span>⏱️ {quiz.duration}</span>
              </div>

              <button
                className="myquiz-start-btn"
                onClick={() => navigate(quiz.path)}
              >
                Start Quiz <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyQuiz;