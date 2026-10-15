
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

 let storedUser = {};

  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    storedUser = {};
  }

  const userName =
    storedUser.name ||
    localStorage.getItem("userName") ||
    "Student";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  return (
    <div className="learningpath-page">
      <aside className="user-sidebar">
        <div className="user-brand">
          <div className="user-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <span>Learn. Explore. Grow.</span>
          </div>
        </div>

      

        <button
          className="user-nav-item"
          onClick={() => navigate("/Dashboard")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/Events")}
        >
          <span>✦</span> Explore Events
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/MyRegistration")}
        >
          <span>▣</span> My Registrations
        </button>

        <button
          className="user-nav-item active"
          onClick={() => navigate("/learning")}
        >
          <span>⌘</span> Learning Path
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/my-quiz")}
        >
          <span>✓</span> My Quiz
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/ReminderCenter")}
        >
          <span>♧</span> Reminders
        </button>

        <div className="user-sidebar-bottom">
          <button
            className="user-nav-item"
            onClick={() => navigate("/Profile")}
          >
            <span>⚙</span> My Profile
          </button>

          <button className="user-nav-item logout-item" onClick={handleLogout}>
            <span>⇥</span> Logout
          </button>
        </div>
      </aside>

      
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