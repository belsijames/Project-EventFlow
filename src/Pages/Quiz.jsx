import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quiz.css";

const quizData = {
  html: {
    title: "HTML & CSS Quiz",
    questions: [
      {
        question: "What is HTML used for?",
        options: [
          "Web page structure",
          "Database management",
          "Server creation",
          "Image editing"
        ],
        answer: 0
      },
      {
        question: "Which tag creates the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
      },
      {
        question: "Which tag creates a paragraph?",
        options: ["<p>", "<para>", "<text>", "<pg>"],
        answer: 0
      },
      {
        question: "Which language is used for styling?",
        options: ["HTML", "CSS", "SQL", "Node.js"],
        answer: 1
      },
      {
        question: "Which property changes text color?",
        options: ["font", "text-color", "color", "font-color"],
        answer: 2
      },
      {
        question: "Which property changes background color?",
        options: ["background-color", "bg-color", "color", "background"],
        answer: 0
      },
      {
        question: "Which property changes font size?",
        options: ["text-size", "font-size", "size", "font"],
        answer: 1
      },
      {
        question: "Which layout is useful for one-dimensional layouts?",
        options: ["Grid", "Flexbox", "Table", "Float"],
        answer: 1
      },
      {
        question: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
      },
      {
        question: "Which property adds space inside an element?",
        options: ["margin", "padding", "border", "spacing"],
        answer: 1
      }
    ]
  },

  javascript: {
    title: "JavaScript Quiz",
    questions: [
      {
        question: "What is JavaScript mainly used for?",
        options: [
          "Web interactivity",
          "Database management",
          "Styling",
          "Image editing"
        ],
        answer: 0
      },
      {
        question: "Which keyword declares a variable?",
        options: ["variable", "let", "define", "value"],
        answer: 1
      },
      {
        question: "Which keyword declares a constant?",
        options: ["constant", "const", "fixed", "static"],
        answer: 1
      },
      {
        question: "Which operator checks strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2
      },
      {
        question: "Which method prints output to the console?",
        options: ["print()", "console.log()", "display()", "output()"],
        answer: 1
      },
      {
        question: "Which keyword creates a function?",
        options: ["function", "method", "fun", "create"],
        answer: 0
      },
      {
        question: "Which symbol starts a single-line comment?",
        options: ["<!--", "//", "##", "**"],
        answer: 1
      },
      {
        question: "Which type stores true or false?",
        options: ["String", "Number", "Boolean", "Array"],
        answer: 2
      },
      {
        question: "Which method adds an item to an array?",
        options: ["push()", "add()", "insert()", "append()"],
        answer: 0
      },
      {
        question: "What does DOM stand for?",
        options: [
          "Document Object Model",
          "Data Object Method",
          "Document Order Model",
          "Digital Object Model"
        ],
        answer: 0
      }
    ]
  },

  react: {
    title: "React.js Quiz",
    questions: [
      {
        question: "What is React?",
        options: [
          "JavaScript library",
          "Database",
          "Programming language",
          "Operating system"
        ],
        answer: 0
      },
      {
        question: "What is a React component?",
        options: [
          "Reusable UI building block",
          "Database table",
          "CSS property",
          "Server"
        ],
        answer: 0
      },
      {
        question: "Which file commonly contains the App component?",
        options: ["App.js", "server.js", "database.js", "style.sql"],
        answer: 0
      },
      {
        question: "Which hook manages state?",
        options: ["usePage", "useState", "useData", "useComponent"],
        answer: 1
      },
      {
        question: "Which hook handles side effects?",
        options: ["useEffect", "useAction", "useEvent", "usePage"],
        answer: 0
      },
      {
        question: "What is JSX?",
        options: [
          "JavaScript XML syntax",
          "Database language",
          "CSS framework",
          "Server language"
        ],
        answer: 0
      },
      {
        question: "What are props used for?",
        options: [
          "Passing data between components",
          "Creating databases",
          "Styling pages",
          "Starting servers"
        ],
        answer: 0
      },
      {
        question: "React is mainly used to build what?",
        options: [
          "User interfaces",
          "Operating systems",
          "Databases",
          "Hardware"
        ],
        answer: 0
      },
      {
        question: "Which command starts a React development server?",
        options: ["npm start", "npm server", "npm run page", "npm launch"],
        answer: 0
      },
      {
        question: "What does SPA stand for?",
        options: [
          "Single Page Application",
          "Simple Page App",
          "Server Page Application",
          "Single Program Access"
        ],
        answer: 0
      }
    ]
  },

  node: {
    title: "Node.js & Express Quiz",
    questions: [
      {
        question: "What is Node.js?",
        options: [
          "JavaScript runtime",
          "Database",
          "CSS framework",
          "Browser"
        ],
        answer: 0
      },
      {
        question: "Which language does Node.js use?",
        options: ["Java", "Python", "JavaScript", "PHP"],
        answer: 2
      },
      {
        question: "What is Express.js?",
        options: [
          "Node.js web framework",
          "Database",
          "Frontend library",
          "CSS language"
        ],
        answer: 0
      },
      {
        question: "Which command initializes a Node project?",
        options: ["npm init", "node create", "npm start", "node init"],
        answer: 0
      },
      {
        question: "Which method handles GET requests?",
        options: ["app.get()", "app.fetch()", "app.receive()", "app.load()"],
        answer: 0
      },
      {
        question: "Which method handles POST requests?",
        options: ["app.send()", "app.post()", "app.create()", "app.push()"],
        answer: 1
      },
      {
        question: "What does npm stand for?",
        options: [
          "Node Package Manager",
          "Node Program Method",
          "New Package Module",
          "Node Page Manager"
        ],
        answer: 0
      },
      {
        question: "What is an API used for?",
        options: [
          "Communication between applications",
          "Styling webpages",
          "Creating images",
          "Editing videos"
        ],
        answer: 0
      },
      {
        question: "Which file stores Node project information?",
        options: ["package.json", "node.html", "server.css", "project.sql"],
        answer: 0
      },
      {
        question: "What is Express middleware?",
        options: [
          "Function used during request-response processing",
          "Database table",
          "CSS file",
          "HTML element"
        ],
        answer: 0
      }
    ]
  },

  mysql: {
    title: "MySQL Quiz",
    questions: [
      {
        question: "What is MySQL?",
        options: [
          "Relational database management system",
          "Frontend library",
          "CSS framework",
          "Operating system"
        ],
        answer: 0
      },
      {
        question: "Which command retrieves data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: 1
      },
      {
        question: "Which key uniquely identifies a record?",
        options: ["Foreign Key", "Primary Key", "Normal Key", "Data Key"],
        answer: 1
      },
      {
        question: "Which command adds a new record?",
        options: ["ADD", "INSERT", "CREATE", "PUT"],
        answer: 1
      },
      {
        question: "Which command modifies existing data?",
        options: ["CHANGE", "UPDATE", "MODIFY", "EDIT"],
        answer: 1
      },
      {
        question: "Which command removes records?",
        options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
        answer: 1
      },
      {
        question: "Which command creates a database?",
        options: [
          "NEW DATABASE",
          "CREATE DATABASE",
          "MAKE DATABASE",
          "ADD DATABASE"
        ],
        answer: 1
      },
      {
        question: "What does a Foreign Key do?",
        options: [
          "Connects related tables",
          "Deletes a database",
          "Creates CSS",
          "Stores images"
        ],
        answer: 0
      },
      {
        question: "Which clause filters records?",
        options: ["FILTER", "WHERE", "CHECK", "SEARCH"],
        answer: 1
      },
      {
        question: "Which command creates a table?",
        options: ["CREATE TABLE", "NEW TABLE", "ADD TABLE", "MAKE TABLE"],
        answer: 0
      }
    ]
  }
};

function Quiz() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const quiz = quizData[topic];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  if (!quiz) {
    return (
      <div className="quiz-error">
        <h2>Quiz Not Found</h2>
        <button onClick={() => navigate("/learning")}>
          Back to Learning Path
        </button>
      </div>
    );
  }

  const current = quiz.questions[currentQuestion];

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const updatedScore =
      selectedAnswer === current.answer ? score + 1 : score;

    if (currentQuestion === quiz.questions.length - 1) {
      navigate(
        `/quiz-result/${topic}?score=${updatedScore}`
      );
      return;
    }

    setScore(updatedScore);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-page">

      <div className="quiz-card">

        <div className="quiz-header">
          <div>
            <span className="quiz-label">
              EVENTFLOW LEARNING
            </span>

            <h1>{quiz.title}</h1>
          </div>

          <div className="question-number">
            {currentQuestion + 1}
            <span> / {quiz.questions.length}</span>
          </div>
        </div>

        <div className="progress-background">
          <div
            className="progress-value"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  quiz.questions.length) *
                100
              }%`
            }}
          ></div>
        </div>

        <div className="question-box">

          <p className="question-label">
            QUESTION {currentQuestion + 1}
          </p>

          <h2>{current.question}</h2>

          <div className="options">

            {current.options.map((option, index) => (
              <button
                key={index}
                className={
                  selectedAnswer === index
                    ? "option selected"
                    : "option"
                }
                onClick={() => setSelectedAnswer(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                {option}
              </button>
            ))}

          </div>

        </div>

        <div className="quiz-footer">

          <button
            className="back-btn"
            onClick={() => navigate("/learning")}
          >
            ← Back
          </button>

          <button
            className="next-btn"
            disabled={selectedAnswer === null}
            onClick={handleNext}
          >
            {currentQuestion === quiz.questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Quiz;