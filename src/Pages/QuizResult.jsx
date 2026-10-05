import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./QuizResult.css";

function QuizResult() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [searchParams] = useSearchParams();

  const score = Number(searchParams.get("score")) || 0;
  const total = 10;
  const percentage = Math.round((score / total) * 100);

  const topicName = {
    html: "HTML & CSS",
    javascript: "JavaScript",
    react: "React.js",
    node: "Node.js & Express",
    mysql: "MySQL",
  };

  const name = topicName[topic] || topic;

  let message = "";

  if (percentage >= 80) {
    message = "Excellent! You have a strong understanding of this topic.";
  } else if (percentage >= 60) {
    message = "Good job! Keep practicing to improve your knowledge.";
  } else {
    message = "Keep learning and try the quiz again.";
  }

  return (
    <div className="result-page">

      <div className="result-card">

        <div className="result-icon">
          ✓
        </div>

        <h1>Quiz Completed!</h1>

        <p className="result-topic">
          {name}
        </p>

        <div className="score-circle">
          <span>{percentage}%</span>
          <small>Score</small>
        </div>

        <h2>
          {score} / {total}
        </h2>

        <p className="result-message">
          {message}
        </p>

        <div className="result-stats">

          <div className="stat-box">
            <h3>{score}</h3>
            <p>Correct</p>
          </div>

          <div className="stat-box">
            <h3>{total - score}</h3>
            <p>Wrong</p>
          </div>

          <div className="stat-box">
            <h3>{total}</h3>
            <p>Total</p>
          </div>

        </div>

        <div className="result-buttons">

          <button
            className="retry-btn"
            onClick={() => navigate(`/quiz/${topic}`)}
          >
            Retry Quiz
          </button>

          <button
            className="learning-btn"
            onClick={() => navigate("/LearningPath")}
          >
            Back to Learning Path
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuizResult;