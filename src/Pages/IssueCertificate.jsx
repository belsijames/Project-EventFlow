
import React, { useEffect, useState } from "react";
import "./IssueCertificate.css";

const EVENTS = [
  "Tech Talk 2026",
  "Creative Minds Workshop",
  "Web Development Bootcamp",
  "Communication Skills Workshop",
  "Career Guidance Session",
  "Science & Innovation Expo",
];

const API = "http://localhost:5000/api/certificates";

function IssueCertificate() {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [department, setDepartment] = useState("");
  const [eventName, setEventName] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [issuing, setIssuing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const token = localStorage.getItem("token");

  // Load real students from the backend
  useEffect(() => {
    const loadStudents = async () => {
      if (!token) {
        setMessage("Please log in as Faculty to issue certificates.");
        setLoadingStudents(false);
        return;
      }

      try {
        const response = await fetch(`${API}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load students.");
        }

        const list = Array.isArray(data)
          ? data
          : data.students || data.data || [];

        setStudents(list);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, [token]);

  // Find students by typed name
  const filteredStudents = students.filter((student) =>
    String(student.name || "")
      .toLowerCase()
      .includes(studentName.trim().toLowerCase())
  );

  const handleNameChange = (value) => {
    setStudentName(value);
    setSelectedStudent(null);
    setDepartment("");
    setMessage("");
    setShowSuggestions(true);
  };

  const chooseStudent = (student) => {
    setSelectedStudent(student);
    setStudentName(student.name);
    setDepartment(student.department || "");
    setShowSuggestions(false);
    setMessage("");
  };

  // Issue certificate to the selected real database student
  const handleIssue = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Your login session is missing. Please log in again.");
      return;
    }

    if (!selectedStudent) {
      setMessage(
        "Type the student name and select the matching student from the suggestions."
      );
      return;
    }

    if (!eventName) {
      setMessage("Please select an event.");
      return;
    }

    try {
      setIssuing(true);

      const response = await fetch(`${API}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: selectedStudent.id,
          eventName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Certificate issue failed.");
      }

      const certificate = data.certificate || data.data || {
        id: data.id,
        certificate_id: data.certificate_id,
        user_id: selectedStudent.id,
        student_name: selectedStudent.name,
        department: selectedStudent.department,
        event_name: eventName,
        issue_date: new Date().toISOString().slice(0, 10),
      };

      setCertificates((previous) => [
        certificate,
        ...previous,
      ]);

      setMessage(
        `Certificate issued successfully to ${selectedStudent.name}!`
      );

      setStudentName("");
      setSelectedStudent(null);
      setDepartment("");
      setEventName("");
      setShowSuggestions(false);
    } catch (error) {
      setMessage(error.message || "Unable to issue certificate.");
    } finally {
      setIssuing(false);
    }
  };

  const handlePrint = (certificate) => {
    const safe = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setMessage("Please allow pop-ups to print the certificate.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>EventFlow Certificate</title>
        <meta charset="UTF-8" />
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          body {
            font-family: Georgia, serif;
            text-align: center;
            color: #2f123a;
            padding: 25px;
          }
          .certificate {
            border: 8px double #b18a3b;
            outline: 1px solid #b18a3b;
            outline-offset: -15px;
            padding: 50px 25px;
            min-height: 380px;
          }
          .brand {
            letter-spacing: 5px;
            font: bold 15px Arial, sans-serif;
          }
          h1 { font-size: 36px; }
          .student { font-size: 34px; margin: 25px; }
          .event { font-size: 25px; font-weight: bold; }
          .footer {
            display: flex;
            justify-content: space-between;
            margin-top: 55px;
            font: 12px Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="brand">EVENTFLOW</div>
          <h1>Certificate of Participation</h1>
          <p>This certificate is presented to</p>
          <div class="student">${safe(
            certificate.student_name || selectedStudent?.name
          )}</div>
          <p>for participating in</p>
          <div class="event">${safe(
            certificate.event_name || eventName
          )}</div>
          <div class="footer">
            <span>Issue Date: ${safe(
              certificate.issue_date || new Date().toLocaleDateString()
            )}</span>
            <span>Certificate ID: ${safe(
              certificate.certificate_id || certificate.id || "N/A"
            )}</span>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="icn-page">
      <nav className="icn-navbar">
        <div className="icn-nav-brand">
          <span className="icn-nav-logo">E</span>
          <span>EventFlow</span>
        </div>

        <div className="icn-nav-links">
          <button
            type="button"
            onClick={() => window.history.back()}
          >
            Dashboard
          </button>
          <button type="button" className="icn-nav-active">
            Issue Certificate
          </button>
        </div>
      </nav>

      <header className="icn-header">
        <div>
          <span className="icn-eyebrow">
            EVENTFLOW · FACULTY PANEL
          </span>
          <h1>Issue Certificates</h1>
          <p>Search for a student and issue their certificate.</p>
        </div>
        <div className="icn-trophy">🏆</div>
      </header>

      <div className="icn-layout">
        <section className="icn-card">
          <h2>Issue New Certificate</h2>
          <p className="icn-subtitle">
            Student details are loaded from the database.
          </p>

          {message && (
            <div className="icn-message">
              {message}
            </div>
          )}

          <form onSubmit={handleIssue}>
            <label htmlFor="student-name">Student Name</label>

            <div style={{ position: "relative" }}>
              <input
                id="student-name"
                type="text"
                value={studentName}
                placeholder={
                  loadingStudents
                    ? "Loading students..."
                    : "Type student name..."
                }
                autoComplete="off"
                disabled={loadingStudents || issuing}
                onChange={(e) => handleNameChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px",
                  border: "1px solid #d9c9e3",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />

              {showSuggestions &&
                studentName.trim() &&
                !selectedStudent && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 20,
                      top: "100%",
                      left: 0,
                      right: 0,
                      maxHeight: "200px",
                      overflowY: "auto",
                      background: "#fff",
                      border: "1px solid #e2d5e9",
                      borderRadius: "8px",
                      boxShadow: "0 8px 20px #2f123a18",
                    }}
                  >
                    {filteredStudents.length ? (
                      filteredStudents.map((student) => (
                        <button
                          key={student.id}
                          type="button"
                          onClick={() => chooseStudent(student)}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "12px",
                            background: "#fff",
                            color: "#2f123a",
                            border: "none",
                            borderBottom: "1px solid #f0e8f4",
                            cursor: "pointer",
                          }}
                        >
                          <strong>{student.name}</strong>
                          <br />
                          <small>
                            {student.department || "Department unavailable"}
                          </small>
                        </button>
                      ))
                    ) : (
                      <p style={{ padding: "12px" }}>
                        No matching student found.
                      </p>
                    )}
                  </div>
                )}
            </div>

            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              value={department}
              readOnly
              placeholder="Select a student first"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #d9c9e3",
                borderRadius: "8px",
                marginBottom: "15px",
                background: "#f8f5fb",
              }}
            />

            <label htmlFor="event-name">Event Name</label>
            <select
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              disabled={issuing}
            >
              <option value="">Choose an event</option>
              {EVENTS.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>

            <button
              className="icn-primary-btn"
              type="submit"
              disabled={issuing || loadingStudents}
            >
              {issuing ? "Issuing..." : "Issue Certificate"}
            </button>
          </form>
        </section>

        <section className="icn-card">
          <h2>Important</h2>
          <p className="icn-subtitle">
            Only students returned by your backend can receive certificates.
          </p>
          <div className="icn-empty">
            <span>📜</span>
            <h3>Student-specific certificates</h3>
            <p>
              After issuing, the certificate is stored against the selected
              student's database ID. The student's certificate page must
              load data from the backend to display it.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IssueCertificate;
