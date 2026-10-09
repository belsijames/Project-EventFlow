
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LearningPath.css";

function LearningPath() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "HTML Fundamentals",
      description: "Learn webpage structure, elements, forms and semantic tags.",
      level: "Beginner",
      duration: "2 Weeks",
      progress: 0,
      icon: "🌐",
      color: "html",
      topics: ["HTML Structure", "Forms & Tables", "Semantic Elements"],
      quiz: "/quiz/html",
    },
    {
      id: 2,
      title: "CSS Styling",
      description: "Create attractive layouts using CSS and responsive design.",
      level: "Beginner",
      duration: "3 Weeks",
      progress: 0,
      icon: "🎨",
      color: "css",
      topics: ["Selectors & Properties", "Flexbox & Grid", "Responsive Design"],
      quiz: "/quiz/css",
    },
    {
      id: 3,
      title: "JavaScript",
      description: "Understand programming logic and interactive web pages.",
      level: "Intermediate",
      duration: "4 Weeks",
      progress: 0,
      icon: "⚡",
      color: "javascript",
      topics: ["Variables & Functions", "DOM Manipulation", "Events & Arrays"],
      quiz: "/quiz/javascript",
    },
    {
      id: 4,
      title: "React.js",
      description: "Build reusable components and dynamic user interfaces.",
      level: "Intermediate",
      duration: "4 Weeks",
      progress: 0,
      icon: "⚛️",
      color: "react",
      topics: ["Components & Props", "State & Hooks", "React Router"],
      quiz: "/quiz/react",
    },
  ];

  return (
    <div className="learningpath-page">
      <nav className="learningpath-navbar">
        <h2>EventFlow</h2>

        <div className="learningpath-navlinks">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/events")}>Events</button>
          <button onClick={() => navigate("/my-quiz")}>My Quiz</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </nav>

      <main className="learningpath-container">
        <section className="learningpath-hero">
          <div>
            <p className="learningpath-eyebrow">YOUR PERSONAL DEVELOPMENT</p>
            <h1>Learning Path</h1>
            <p>
              Build your skills step by step, explore programming topics,
              and prepare for your next learning milestone.
            </p>
            <button
              className="learningpath-hero-btn"
              onClick={() => navigate("/my-quiz")}
            >
              Practice with Quizzes →
            </button>
          </div>

          <div className="learningpath-hero-icon">📚</div>
        </section>

        <section className="learningpath-overview">
          <div className="learningpath-overview-card">
            <span>📘</span>
            <div>
              <h3>{courses.length}</h3>
              <p>Learning Courses</p>
            </div>
          </div>

          <div className="learningpath-overview-card">
            <span>🎯</span>
            <div>
              <h3>Beginner</h3>
              <p>Start Your Journey</p>
            </div>
          </div>

          <div className="learningpath-overview-card">
            <span>🏆</span>
            <div>
              <h3>Self-Paced</h3>
              <p>Learn at Your Speed</p>
            </div>
          </div>
        </section>

        <div className="learningpath-section-heading">
          <div>
            <h2>Your Learning Journey</h2>
            <p>Choose a topic and begin learning.</p>
          </div>
        </div>

        <section className="learningpath-grid">
          {courses.map((course) => (
            <article className="learningpath-card" key={course.id}>
              <div className="learningpath-card-top">
                <div className={`learningpath-icon ${course.color}`}>
                  {course.icon}
                </div>
                <span className="learningpath-level">{course.level}</span>
              </div>

              <h3>{course.title}</h3>
              <p className="learningpath-description">
                {course.description}
              </p>

              <div className="learningpath-duration">
                <span>⏱ {course.duration}</span>
                <span>{course.topics.length} key topics</span>
              </div>

              <div className="learningpath-progress-label">
                <span>Learning Progress</span>
                <span>{course.progress}%</span>
              </div>

              <div className="learningpath-progress-track">
                <div
                  className="learningpath-progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="learningpath-topics">
                <h4>What You'll Learn</h4>
                {course.topics.map((topic) => (
                  <p key={topic}>
                    <span>✓</span> {topic}
                  </p>
                ))}
              </div>

              <button
                className="learningpath-start-btn"
                onClick={() =>
                  navigate("/learning-materials/" + course.id)
                }
              >
                Start Learning <span>→</span>
              </button>

              <button
                className="learningpath-quiz-btn"
                onClick={() => navigate(course.quiz)}
              >
                Take Quiz
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default LearningPath;