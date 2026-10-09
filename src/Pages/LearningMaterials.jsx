
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LearningMaterials.css";

function LearningMaterials() {
  const navigate = useNavigate();
  const { id } = useParams();

  const courses = {
    1: {
      title: "HTML Fundamentals",
      icon: "🌐",
      description: "Learn how to build the structure of a web page.",
      topics: [
        {
          title: "Introduction to HTML",
          content:
            "HTML stands for HyperText Markup Language. It is used to create the structure of web pages using elements and tags.",
          code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>Welcome to HTML</p>\n</body>\n</html>",
        },
        {
          title: "HTML Elements and Headings",
          content:
            "HTML elements define page content. Heading tags range from h1 to h6. The p tag creates a paragraph, and the a tag creates a hyperlink.",
          code: "<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>This is a paragraph.</p>\n<a href='https://example.com'>Visit Website</a>",
        },
        {
          title: "HTML Lists and Tables",
          content:
            "Use ul for unordered lists, ol for ordered lists, and table, tr, th and td elements to organize tabular data.",
          code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Name</th></tr>\n  <tr><td>Student</td></tr>\n</table>",
        },
        {
          title: "HTML Forms",
          content:
            "Forms collect information from users. Common elements include form, label, input, select and button.",
          code: "<form>\n  <label>Name:</label>\n  <input type='text' placeholder='Enter name' />\n  <button type='button'>Submit</button>\n</form>",
        },
      ],
    },
    2: {
      title: "CSS Styling",
      icon: "🎨",
      description: "Learn to style web pages with layouts and colors.",
      topics: [
        {
          title: "Introduction to CSS",
          content:
            "CSS stands for Cascading Style Sheets. It controls colors, fonts, spacing and the appearance of HTML elements.",
          code: "h1 {\n  color: purple;\n  font-size: 32px;\n}\n\np {\n  color: #555;\n}",
        },
        {
          title: "Selectors and Properties",
          content:
            "CSS selectors target elements. Use class selectors with a dot and ID selectors with a hash symbol.",
          code: ".card {\n  background: white;\n  padding: 20px;\n}\n\n#title {\n  color: purple;\n}",
        },
        {
          title: "Flexbox Layout",
          content:
            "Flexbox helps arrange elements in a row or column and align them with properties such as justify-content and align-items.",
          code: ".container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  gap: 16px;\n}",
        },
        {
          title: "Responsive Design",
          content:
            "Responsive design adapts a layout to different screen sizes. CSS media queries apply styles based on viewport width.",
          code: "@media (max-width: 600px) {\n  .container {\n    flex-direction: column;\n  }\n}",
        },
      ],
    },
    3: {
      title: "JavaScript",
      icon: "⚡",
      description: "Learn programming basics and interactive web pages.",
      topics: [
        {
          title: "Introduction to JavaScript",
          content:
            "JavaScript adds behaviour and interactivity to websites. It can respond to user actions and update page content.",
          code: "console.log('Hello JavaScript!');",
        },
        {
          title: "Variables and Data Types",
          content:
            "Use const for values that are not reassigned and let for values that may change. JavaScript supports strings, numbers, booleans and more.",
          code: "const course = 'JavaScript';\nlet score = 0;\nscore = score + 1;\nconsole.log(course, score);",
        },
        {
          title: "Functions and Conditions",
          content:
            "Functions group reusable instructions. Conditional statements let a program make decisions.",
          code: "function checkScore(score) {\n  if (score >= 5) {\n    return 'Passed';\n  }\n  return 'Try again';\n}\n\nconsole.log(checkScore(8));",
        },
        {
          title: "DOM and Events",
          content:
            "The Document Object Model lets JavaScript access page elements. Events allow code to respond to actions such as clicks.",
          code: "document.querySelector('h1').textContent = 'Welcome!';",
        },
      ],
    },
    4: {
      title: "React.js",
      icon: "⚛️",
      description: "Learn reusable components and dynamic interfaces.",
      topics: [
        {
          title: "Introduction to React",
          content:
            "React is a JavaScript library for building user interfaces. It encourages developers to create reusable components.",
          code: "function Welcome() {\n  return <h1>Welcome to React!</h1>;\n}\n\nexport default Welcome;",
        },
        {
          title: "Components and Props",
          content:
            "Components are reusable UI building blocks. Props pass information from a parent component to a child component.",
          code: "function Greeting({ name }) {\n  return <h2>Hello, {name}!</h2>;\n}\n\n<Greeting name='Student' />",
        },
        {
          title: "State and Events",
          content:
            "The useState hook stores component state. Event handlers respond to user actions, such as button clicks.",
          code: "const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>\n  Increase\n</button>",
        },
        {
          title: "React Router",
          content:
            "React Router supports navigation between pages in a React application without reloading the entire website.",
          code: "<Routes>\n  <Route path='/dashboard' element={<Dashboard />} />\n  <Route path='/learning' element={<LearningPath />} />\n</Routes>",
        },
      ],
    },
  };

  const course = courses[id];
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completed, setCompleted] = useState([]);

  if (!course) {
    return (
      <div className="materials-error">
        <h2>Course not found</h2>
        <button onClick={() => navigate("/learning")}>
          Back to Learning Path
        </button>
      </div>
    );
  }

  const topic = course.topics[currentTopic];
  const isCompleted = completed.includes(currentTopic);
  const progress = Math.round(
    (completed.length / course.topics.length) * 100
  );

  function markComplete() {
    setCompleted((previous) =>
      previous.includes(currentTopic)
        ? previous
        : [...previous, currentTopic]
    );
  }

  function nextTopic() {
    if (currentTopic < course.topics.length - 1) {
      setCurrentTopic(currentTopic + 1);
    }
  }

  return (
    <div className="materials-page">
      <nav className="materials-navbar">
        <h2>EventFlow</h2>
        <button onClick={() => navigate("/learning")}>
          ← Learning Path
        </button>
      </nav>

      <div className="materials-layout">
        <aside className="materials-sidebar">
          <div className="materials-course-icon">{course.icon}</div>
          <p className="materials-label">YOUR COURSE</p>
          <h2>{course.title}</h2>
          <p className="materials-course-description">{course.description}</p>

          <div className="materials-progress-heading">
            <span>Course Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="materials-progress-track">
            <div
              className="materials-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="materials-topic-heading">Course Topics</h3>

          <div className="materials-topic-list">
            {course.topics.map((item, index) => (
              <button
                key={item.title}
                className={`materials-topic-button ${
                  currentTopic === index ? "active" : ""
                }`}
                onClick={() => setCurrentTopic(index)}
              >
                <span className="materials-topic-number">
                  {completed.includes(index) ? "✓" : index + 1}
                </span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="materials-content">
          <p className="materials-breadcrumb">
            Learning Path / {course.title}
          </p>

          <div className="materials-topic-count">
            TOPIC {currentTopic + 1} OF {course.topics.length}
          </div>

          <h1>{topic.title}</h1>
          <p className="materials-topic-content">{topic.content}</p>

          <section className="materials-lesson">
            <h3>Code Example</h3>
            <p>Study the example below to understand the concept.</p>
            <pre>
              <code>{topic.code}</code>
            </pre>
          </section>

          <div className="materials-tip">
            <span>💡</span>
            <p>
              <strong>Learning tip</strong>
              <br />
              Read the concept carefully and practise the code in your own
              development environment.
            </p>
          </div>

          <div className="materials-actions">
            <button
              className="materials-back-btn"
              disabled={currentTopic === 0}
              onClick={() => setCurrentTopic(currentTopic - 1)}
            >
              ← Previous
            </button>

            {!isCompleted ? (
              <button
                className="materials-complete-btn"
                onClick={markComplete}
              >
                Mark as Completed ✓
              </button>
            ) : currentTopic < course.topics.length - 1 ? (
              <button
                className="materials-complete-btn"
                onClick={nextTopic}
              >
                Next Topic →
              </button>
            ) : (
              <button
                className="materials-complete-btn"
                onClick={() => navigate("/my-quiz")}
              >
                Course Topics Completed · Take Quiz →
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LearningMaterials;