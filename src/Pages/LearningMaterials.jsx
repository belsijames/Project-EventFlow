import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LearningMaterials.css";

const courses = {
  1: {
    title: "HTML Fundamentals",
    icon: "🌐",
    language: "html",
    description: "Learn to build the structure of web pages.",
    topics: [
      {
        title: "Introduction to HTML",
        content: "HTML creates the structure of a web page using elements and tags.",
        code: "<h1>Hello World</h1>\n<p>Welcome to HTML</p>",
        task: "Create an h1 heading containing Hello EventFlow and a paragraph.",
        starter: "<h1>Hello EventFlow</h1>\n<p>I am learning HTML.</p>",
        checks: [
          ["Contains an h1 heading", /<h1\b[^>]*>[\s\S]*?<\/h1>/i],
          ["Contains Hello EventFlow", /Hello EventFlow/],
          ["Contains a paragraph", /<p\b[^>]*>[\s\S]*?<\/p>/i]
        ]
      },
      {
        title: "Elements and Headings",
        content: "HTML elements display content. Headings range from h1 to h6, p creates paragraphs, and a creates links.",
        code: "<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<a href='https://example.com'>Visit Website</a>",
        task: "Create an h2 heading named My Skills and a link labelled Learn HTML.",
        starter: "<h2>My Skills</h2>\n<a href='https://example.com'>Learn HTML</a>",
        checks: [
          ["Contains an h2 heading", /<h2\b[\s\S]*?<\/h2>/i],
          ["Heading says My Skills", /<h2\b[^>]*>\s*My Skills\s*<\/h2>/i],
          ["Contains a Learn HTML link", /<a\b[^>]*>[\s\S]*?Learn HTML[\s\S]*?<\/a>/i]
        ]
      },
      {
        title: "Lists and Tables",
        content: "Use ul and li for unordered lists, ol for ordered lists, and table, tr, th and td for tables.",
        code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
        task: "Create an unordered list containing HTML, CSS and JavaScript.",
        starter: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>",
        checks: [
          ["Contains an unordered list", /<ul\b[\s\S]*?<\/ul>/i],
          ["Contains HTML", /<li>\s*HTML\s*<\/li>/i],
          ["Contains CSS", /<li>\s*CSS\s*<\/li>/i],
          ["Contains JavaScript", /<li>\s*JavaScript\s*<\/li>/i]
        ]
      },
      {
        title: "HTML Forms",
        content: "Forms collect information from users using inputs, labels, select elements and buttons.",
        code: "<form>\n  <label for='email'>Email</label>\n  <input id='email' type='email' />\n  <button type='button'>Submit</button>\n</form>",
        task: "Create a form with an email input and a button labelled Join.",
        starter: "<form>\n  <input type='email' placeholder='Enter email' />\n  <button type='button'>Join</button>\n</form>",
        checks: [
          ["Contains a form", /<form\b[\s\S]*?<\/form>/i],
          ["Contains an email input", /<input\b[^>]*type\s*=\s*['"]?email/i],
          ["Contains a Join button", /<button\b[^>]*>\s*Join\s*<\/button>/i]
        ]
      }
    ]
  },

  2: {
    title: "CSS Styling",
    icon: "🎨",
    language: "css",
    description: "Style pages with colours, layouts and responsive design.",
    topics: [
      {
        title: "Introduction to CSS",
        content: "CSS controls the colours, fonts, spacing and appearance of HTML elements.",
        code: "h1 {\n  color: purple;\n  font-size: 32px;\n}",
        task: "Make h1 headings purple and set their font size to 32px.",
        starter: "h1 {\n  color: purple;\n  font-size: 32px;\n}",
        checks: [
          ["Targets h1", /h1\s*\{/i],
          ["Sets purple colour", /color\s*:\s*(purple|#800080)/i],
          ["Sets 32px font size", /font-size\s*:\s*32px/i]
        ]
      },
      {
        title: "Selectors and Properties",
        content: "Class selectors begin with a dot, while ID selectors begin with a hash symbol.",
        code: ".card {\n  background: white;\n  padding: 20px;\n}",
        task: "Create a .card rule with white background and 20px padding.",
        starter: ".card {\n  background: white;\n  padding: 20px;\n}",
        checks: [
          ["Targets .card", /\.card\s*\{/],
          ["Adds 20px padding", /padding\s*:\s*20px/i],
          ["Sets a white background", /background(?:-color)?\s*:\s*(white|#fff(?:fff)?)/i]
        ]
      },
      {
        title: "Flexbox Layout",
        content: "Flexbox arranges elements in rows or columns and helps align content.",
        code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}",
        task: "Create a .container rule using flexbox, centred alignment and a gap.",
        starter: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}",
        checks: [
          ["Uses display flex", /display\s*:\s*flex/i],
          ["Centres items vertically", /align-items\s*:\s*center/i],
          ["Defines a gap", /gap\s*:\s*\d+px/i]
        ]
      },
      {
        title: "Responsive Design",
        content: "Media queries adapt a layout to different screen sizes.",
        code: "@media (max-width: 600px) {\n  .container {\n    flex-direction: column;\n  }\n}",
        task: "Write a media query for screens up to 600px and stack the container items.",
        starter: "@media (max-width: 600px) {\n  .container {\n    flex-direction: column;\n  }\n}",
        checks: [
          ["Uses a 600px media query", /@media\s*\([^)]*max-width\s*:\s*600px/i],
          ["Targets .container", /\.container\s*\{/],
          ["Stacks items vertically", /flex-direction\s*:\s*column/i]
        ]
      }
    ]
  },

  3: {
    title: "JavaScript",
    icon: "⚡",
    language: "javascript",
    description: "Learn programming logic and interactive websites.",
    topics: [
      {
        title: "Introduction to JavaScript",
        content: "JavaScript makes websites interactive and responds to user actions.",
        code: "console.log('Hello JavaScript!');",
        task: "Print Hello EventFlow using console.log.",
        starter: "console.log('Hello EventFlow');",
        checks: [
          ["Uses console.log", /console\s*\.\s*log\s*\(/],
          ["Prints Hello EventFlow", /Hello EventFlow/]
        ]
      },
      {
        title: "Variables and Data Types",
        content: "Use const for values that are not reassigned and let for values that may change.",
        code: "const course = 'JavaScript';\nlet score = 0;\nscore++;\nconsole.log(course, score);",
        task: "Create a const variable called course with the value JavaScript and print it.",
        starter: "const course = 'JavaScript';\nconsole.log(course);",
        checks: [
          ["Declares course using const", /const\s+course\s*=/],
          ["Assigns JavaScript", /const\s+course\s*=\s*['"]JavaScript['"]/],
          ["Prints course", /console\s*\.\s*log\s*\(\s*course\s*\)/]
        ]
      },
      {
        title: "Functions and Conditions",
        content: "Functions group reusable instructions. Conditions allow a program to make decisions.",
        code: "function double(number) {\n  return number * 2;\n}\nconsole.log(double(4));",
        task: "Create a function called double that returns a number multiplied by two.",
        starter: "function double(number) {\n  return number * 2;\n}\nconsole.log(double(4));",
        checks: [
          ["Declares double function", /function\s+double\s*\(/],
          ["Returns a value", /return\s+/],
          ["Multiplies by two", /\*\s*2|2\s*\*/]
        ]
      },
      {
        title: "DOM and Events",
        content: "The DOM allows JavaScript to read and update page elements. Events respond to user actions.",
        code: "document.querySelector('#message').textContent = 'Welcome!';",
        task: "Select #message and change its textContent to Hello.",
        starter: "document.querySelector('#message').textContent = 'Hello';",
        checks: [
          ["Selects #message", /querySelector\s*\(\s*['"]#message['"]\s*\)/],
          ["Updates textContent", /textContent\s*=/],
          ["Sets text to Hello", /textContent\s*=\s*['"]Hello['"]/]
        ]
      }
    ]
  },

  4: {
    title: "React.js",
    icon: "⚛️",
    language: "react",
    description: "Build reusable components and dynamic interfaces.",
    topics: [
      {
        title: "Introduction to React",
        content: "React is a JavaScript library for building user interfaces with reusable components.",
        code: "function Welcome() {\n  return <h1>Welcome to React!</h1>;\n}\nexport default Welcome;",
        task: "Create a Welcome component that returns an h1 containing Hello React.",
        starter: "function Welcome() {\n  return <h1>Hello React</h1>;\n}\nexport default Welcome;",
        checks: [
          ["Declares Welcome component", /function\s+Welcome\s*\(/],
          ["Returns JSX", /return\s+<h1/i],
          ["Displays Hello React", /<h1[^>]*>\s*Hello React\s*<\/h1>/]
        ]
      },
      {
        title: "Components and Props",
        content: "Props pass information from a parent component to a child component.",
        code: "function Greeting({ name }) {\n  return <h2>Hello, {name}!</h2>;\n}",
        task: "Create a Greeting component that accepts name as a prop and displays it in an h2.",
        starter: "function Greeting({ name }) {\n  return <h2>Hello, {name}!</h2>;\n}",
        checks: [
          ["Declares Greeting component", /function\s+Greeting\s*\(/],
          ["Receives the name prop", /\{\s*name\s*\}/],
          ["Renders an h2", /<h2\b[\s\S]*?<\/h2>/]
        ]
      },
      {
        title: "State and Events",
        content: "The useState hook stores changing component data. Event handlers respond to actions like clicks.",
        code: "const [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>Increase</button>",
        task: "Use useState and an onClick handler to increment count by one.",
        starter: "const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(count + 1)}>Increase</button>;",
        checks: [
          ["Uses useState", /useState\s*\(/],
          ["Includes onClick", /onClick\s*=/],
          ["Increments count", /setCount\s*\(\s*count\s*\+\s*1\s*\)/]
        ]
      },
      {
        title: "React Router",
        content: "React Router supports navigation between pages without reloading the entire application.",
        code: "<Routes>\n  <Route path='/learning' element={<LearningPath />} />\n</Routes>",
        task: "Add a Route for /learning that renders LearningPath.",
        starter: "<Routes>\n  <Route path='/learning' element={<LearningPath />} />\n</Routes>",
        checks: [
          ["Contains a Route", /<Route\b/],
          ["Uses /learning path", /path\s*=\s*['"]\/learning['"]/],
          ["Renders LearningPath", /element\s*=\s*\{\s*<LearningPath\s*\/>\s*\}/]
        ]
      }
    ]
  }
};

function LearningMaterials() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = courses[id];

  const [currentTopic, setCurrentTopic] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [mode, setMode] = useState("learn");
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [runCount, setRunCount] = useState(0);

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
  const topicKey = `${id}-${currentTopic}`;
  const progress = Math.round(
    (completed.filter((item) => item.startsWith(`${id}-`)).length /
      course.topics.length) * 100
  );

  const startPractice = () => {
    setCode(topic.starter);
    setResults(null);
    setMode("practice");
  };

  const markComplete = () => {
    setCompleted((old) => old.includes(topicKey) ? old : [...old, topicKey]);
  };

  const changeTopic = (index) => {
    setCurrentTopic(index);
    setMode("learn");
    setCode("");
    setResults(null);
  };

  const checkSolution = () => {
    setResults(topic.checks.map(([label, pattern]) => ({
      label,
      passed: pattern.test(code || topic.starter)
    })));
  };

  const previewHtml = () => {
    const escapeHtml = (value) => value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (course.language === "html") {
      return code || topic.starter;
    }

    if (course.language === "css") {
      return `<h1 class="demo-title">EventFlow Practice</h1>
        <p class="demo-card">Edit the CSS and click Run Preview.</p>
        <button class="demo-button">Practice Button</button>
        <style>${(code || topic.starter).replace(/<\/style/gi, "<\\/style")}</style>`;
    }

    if (course.language === "javascript") {
      const script = (code || topic.starter).replace(/<\/script/gi, "<\\/script");
      return `<h2 id="message">EventFlow Practice</h2>
        <p>JavaScript output appears below.</p><pre id="output"></pre>
        <script>
          const output = document.getElementById('output');
          const originalLog = console.log;
          console.log = (...args) => {
            output.textContent += args.join(' ') + '\\n';
            originalLog(...args);
          };
          try { ${script} }
          catch (error) { output.textContent = 'Error: ' + error.message; }
        </script>`;
    }

    return `<h2>React.js Practice</h2>
      <p>React JSX code is checked using the lesson requirements.</p>
      <pre>${escapeHtml(code || topic.starter)}</pre>`;
  };

  const passedCount = results ? results.filter((item) => item.passed).length : 0;

  return (
    <div className="materials-page">
      <nav className="materials-navbar">
        <div className="materials-brand">
          <span className="materials-brand-mark">E</span>
          <h2>EventFlow</h2>
          <span className="materials-brand-subtitle">LEARNING STUDIO</span>
        </div>
        <button className="materials-return-btn" onClick={() => navigate("/learning")}>
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
            <span>Course Progress</span><strong>{progress}%</strong>
          </div>
          <div className="materials-progress-track">
            <div className="materials-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <h3 className="materials-topic-heading">Course Topics</h3>
          <div className="materials-topic-list">
            {course.topics.map((item, index) => (
              <button
                key={item.title}
                className={`materials-topic-button ${currentTopic === index ? "active" : ""}`}
                onClick={() => changeTopic(index)}
              >
                <span className={`materials-topic-number ${completed.includes(`${id}-${index}`) ? "done" : ""}`}>
                  {completed.includes(`${id}-${index}`) ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
                <span className="materials-topic-chevron">›</span>
              </button>
            ))}
          </div>
          <div className="materials-sidebar-note">
            <span>✦</span><p>Small steps every day lead to big skills.</p>
          </div>
        </aside>

        <main className="materials-content">
          <div className="materials-welcome-row">
            <div>
              <p className="materials-breadcrumb">Learning Path <span>/</span> {course.title}</p>
              <p className="materials-eyebrow">YOUR LEARNING JOURNEY</p>
            </div>
            <div className="materials-topic-count">
              LESSON {currentTopic + 1} <span>OF</span> {course.topics.length}
            </div>
          </div>

          <section className="materials-hero">
            <div className="materials-hero-copy">
              <span className="materials-hero-tag">✦ LEARN · PRACTICE · GROW</span>
              <h1>{topic.title}</h1>
              <p>{topic.content}</p>
            </div>
            <div className="materials-hero-art">
              <div className="materials-art-orbit orbit-one" />
              <div className="materials-art-orbit orbit-two" />
              <span>{course.icon}</span>
              <small>LESSON {String(currentTopic + 1).padStart(2, "0")}</small>
            </div>
          </section>

          <div className="materials-mode-tabs">
            <button className={mode === "learn" ? "selected" : ""} onClick={() => setMode("learn")}>
              <span>01</span><div><strong>Learn</strong><small>Understand the concept</small></div>
            </button>
            <button className={mode === "practice" ? "selected" : ""} onClick={() => {
              if (!code) setCode(topic.starter);
              setMode("practice");
            }}>
              <span>02</span><div><strong>Practice</strong><small>Write and test code</small></div>
            </button>
            <button className={mode === "quiz" ? "selected" : ""} onClick={() => setMode("quiz")}>
              <span>03</span><div><strong>Knowledge Check</strong><small>Check your solution</small></div>
            </button>
          </div>

          {mode === "learn" && (
            <section className="materials-panel">
              <div className="materials-section-heading">
                <div><p className="materials-eyebrow">LESSON NOTES</p><h2>Understand the basics</h2></div>
                <span className="materials-section-icon">📘</span>
              </div>
              <p className="materials-explanation">{topic.content}</p>
              <div className="materials-code-heading">
                <div><i /><i /><i /><strong>Example code</strong></div>
                <span>{course.language.toUpperCase()}</span>
              </div>
              <pre className="materials-example-code"><code>{topic.code}</code></pre>
              <div className="materials-tip">
                <span>✦</span><p><strong>Learning tip</strong><br />
                  Read the example carefully, then open Practice and try writing the code yourself.</p>
              </div>
              <div className="materials-actions">
                <button className="materials-back-btn" disabled={currentTopic === 0} onClick={() => changeTopic(currentTopic - 1)}>
                  ← Previous
                </button>
                <button className="materials-secondary-btn" onClick={startPractice}>Try it yourself ↗</button>
                <button className="materials-complete-btn" onClick={() => {
                  markComplete();
                  if (currentTopic < course.topics.length - 1) changeTopic(currentTopic + 1);
                  else setMode("quiz");
                }}>
                  {currentTopic === course.topics.length - 1 ? "Finish Lessons ✓" : "Complete & Continue →"}
                </button>
              </div>
            </section>
          )}

          {mode === "practice" && (
            <section className="materials-panel">
              <div className="materials-section-heading">
                <div><p className="materials-eyebrow">HANDS-ON WORKSPACE</p><h2>Practice by doing</h2></div>
                <span className="materials-section-icon">⌘</span>
              </div>

              <div className="materials-task-card">
                <span className="materials-task-label">YOUR CHALLENGE</span>
                <p>{topic.task}</p>
                <small>Edit the code, run the preview and check your solution.</small>
              </div>

              <div className="materials-workspace">
                <div className="materials-editor">
                  <div className="materials-editor-top">
                    <span><i /><i /><i /><strong>
                      {course.language === "html" ? "index.html" :
                        course.language === "css" ? "styles.css" :
                        course.language === "javascript" ? "script.js" : "App.jsx"}
                    </strong></span>
                    <span className="materials-editor-language">{course.language.toUpperCase()}</span>
                  </div>
                  <label className="materials-sr-label" htmlFor="materials-code-editor">Write your code</label>
                  <textarea
                    id="materials-code-editor"
                    spellCheck="false"
                    value={code || topic.starter}
                    onChange={(event) => { setCode(event.target.value); setResults(null); }}
                  />
                  <div className="materials-editor-actions">
                    <button className="materials-run-btn" onClick={() => setRunCount((n) => n + 1)}>▶ Run Preview</button>
                    <button className="materials-check-btn" onClick={checkSolution}>✓ Check Solution</button>
                    <button className="materials-reset-btn" onClick={() => { setCode(topic.starter); setResults(null); }}>Reset</button>
                  </div>
                </div>

                <div className="materials-preview">
                  <div className="materials-preview-header">
                    <span>LIVE PREVIEW</span><span className="materials-preview-status"><i /> Ready</span>
                  </div>
                  <iframe
                    key={runCount}
                    title="Code practice preview"
                    sandbox="allow-scripts"
                    srcDoc={previewHtml()}
                  />
                  <p className="materials-preview-note">
                    HTML, CSS and JavaScript previews run in an isolated frame. React JSX is checked against the task requirements, not compiled here.
                  </p>
                </div>
              </div>

              {results && (
                <div className="materials-test-results">
                  <div className="materials-test-summary">
                    <strong>{passedCount}/{results.length} checks passed</strong>
                    <span>{passedCount === results.length ? "Great work! All requirements are met." : "Review the failed checks and try again."}</span>
                  </div>
                  {results.map((result) => (
                    <div className="materials-test-row" key={result.label}>
                      <span className={result.passed ? "test-pass" : "test-fail"}>{result.passed ? "✓" : "×"}</span>
                      {result.label}
                    </div>
                  ))}
                  {passedCount === results.length && (
                    <button className="materials-complete-btn" onClick={() => { markComplete(); setMode("quiz"); }}>
                      Complete Practice →
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          {mode === "quiz" && (
            <section className="materials-panel">
              <div className="materials-section-heading">
                <div><p className="materials-eyebrow">KNOWLEDGE CHECK</p><h2>Check what you learned</h2></div>
                <span className="materials-section-icon">✧</span>
              </div>
              <p className="materials-explanation">
                Complete the coding challenge checks to review your understanding of this lesson.
              </p>
              <div className="materials-quiz-card">
                <div className="materials-quiz-icon">✓</div>
                <div><strong>{topic.title}</strong><p>{topic.task}</p><span>{topic.checks.length} solution checks · Instant feedback</span></div>
              </div>
              <div className="materials-actions">
                <button className="materials-back-btn" onClick={() => setMode("learn")}>← Review Lesson</button>
                <button className="materials-secondary-btn" onClick={startPractice}>Open Practice ↗</button>
                <button className="materials-complete-btn" onClick={() => {
                  markComplete();
                  if (currentTopic < course.topics.length - 1) changeTopic(currentTopic + 1);
                  else navigate("/my-quiz");
                }}>
                  {currentTopic === course.topics.length - 1 ? "Go to My Quiz →" : "Next Lesson →"}
                </button>
              </div>
            </section>
          )}

          <footer className="materials-footer">
            <span>EVENTFLOW LEARNING STUDIO</span>
            <span>Learn at your pace · Build real skills</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default LearningMaterials;