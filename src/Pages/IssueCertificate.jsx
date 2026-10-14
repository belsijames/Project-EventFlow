
import React, { useEffect, useState } from "react";
import "./IssueCertificate.css";

const STUDENTS = [
  {
    id: "1",
    name: "Mary Belsi",
    department: "Computer Science",
  },
  {
    id: "2",
    name: "Arun Kumar",
    department: "Information Technology",
  },
];

const EVENTS = [
  "Tech Talk 2026",
  "Creative Minds Workshop",
  "Web Development Bootcamp",
  "Communication Skills Workshop",
  "Career Guidance Session",
  "Science & Innovation Expo",
];

const STORAGE_KEY = "eventflow_local_certificates";

function IssueCertificate() {
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [eventName, setEventName] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setCertificates(Array.isArray(saved) ? saved : []);
    } catch {
      setCertificates([]);
    }
  }, []);

  const selectedStudent = STUDENTS.find(
    (student) => student.id === studentId
  );

  const handleStudentChange = (value) => {
    setStudentId(value);

    const student = STUDENTS.find(
      (item) => item.id === value
    );

    setDepartment(student?.department || "");
    setMessage("");
  };

  const handleIssue = (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedStudent || !department || !eventName) {
      setMessage(
        "Please select a student, department and event."
      );
      return;
    }

    const certificate = {
      id: `EF-${Date.now()}`,
      studentId,
      studentName: selectedStudent.name,
      department,
      eventName,
      issuedAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    try {
      const updated = [certificate, ...certificates];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      setCertificates(updated);
      setPreview(certificate);
      setMessage("Certificate issued successfully!");

      setStudentId("");
      setDepartment("");
      setEventName("");
    } catch {
      setMessage(
        "Unable to save certificate in this browser."
      );
    }
  };

  const handlePrint = (certificate) => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=850"
    );

    if (!printWindow) {
      setMessage(
        "Please allow pop-ups to print the certificate."
      );
      return;
    }

    const safe = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>EventFlow Certificate</title>
        <meta charset="UTF-8" />

        <style>
          * { box-sizing: border-box; }

          @page {
            size: A4 landscape;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 8mm;
            background: #f5f0e5;
            color: #14233d;
            font-family: Georgia, "Times New Roman", serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .certificate {
            position: relative;
            min-height: 186mm;
            padding: 13mm 20mm 10mm;
            overflow: hidden;
            text-align: center;
            background:
              radial-gradient(
                ellipse at center,
                #ffffff 0%,
                #fffdf7 70%,
                #f5eddb 100%
              );
            border: 5px double #b18a3b;
            outline: 1px solid #b18a3b;
            outline-offset: -10px;
          }

          .certificate:before {
            content: "";
            position: absolute;
            inset: 5mm;
            border: 1px solid #d7bd7b;
            pointer-events: none;
          }

          .corner {
            position: absolute;
            z-index: 1;
            width: 55px;
            height: 55px;
            border-color: #b18a3b;
            border-style: solid;
          }

          .tl {
            top: 8px;
            left: 8px;
            border-width: 4px 0 0 4px;
          }

          .tr {
            top: 8px;
            right: 8px;
            border-width: 4px 4px 0 0;
          }

          .bl {
            bottom: 8px;
            left: 8px;
            border-width: 0 0 4px 4px;
          }

          .br {
            bottom: 8px;
            right: 8px;
            border-width: 0 4px 4px 0;
          }

          .top-label {
            color: #9a742a;
            font: bold 11px Arial, sans-serif;
            letter-spacing: 5px;
          }

          .brand {
            margin-top: 7px;
            font-size: 35px;
            font-weight: bold;
            letter-spacing: 8px;
          }

          .tagline {
            margin-top: 6px;
            color: #7b6742;
            font: 10px Arial, sans-serif;
            letter-spacing: 4px;
          }

          .gold-line {
            width: 150px;
            height: 2px;
            margin: 12px auto;
            background: #b18a3b;
          }

          h1 {
            margin: 12px 0;
            font-size: 37px;
            font-weight: normal;
            letter-spacing: 1px;
          }

          .presented {
            margin: 10px 0;
            font-size: 17px;
            font-style: italic;
          }

          .student {
            margin: 10px 0 4px;
            color: #203653;
            font-family: "Brush Script MT", "Segoe Script", cursive;
            font-size: 43px;
            font-style: italic;
          }

          .department {
            color: #75674e;
            font: 12px Arial, sans-serif;
            letter-spacing: 1px;
          }

          .event-intro {
            margin: 15px 0 5px;
            font-size: 15px;
          }

          .event-name {
            margin: 7px 0;
            color: #9b742d;
            font-size: 27px;
            font-weight: bold;
          }

          .appreciation {
            margin: 8px 0;
            font-size: 13px;
          }

          .bottom-area {
            display: grid;
            grid-template-columns: 1fr 115px 1fr;
            align-items: end;
            gap: 22px;
            margin-top: 23px;
          }

          .sign-box {
            text-align: center;
          }

          .signature-art {
            display: block;
            width: 180px;
            max-width: 100%;
            height: 42px;
            margin: 0 auto 2px;
          }

          .sign-line {
            width: 90%;
            margin: 0 auto 7px;
            border-top: 1px solid #9c7a38;
          }

          .sign-name {
            font-size: 13px;
            font-weight: bold;
          }

          .sign-role {
            margin-top: 4px;
            color: #786b55;
            font: 10px Arial, sans-serif;
            line-height: 1.5;
          }

          .seal {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 92px;
            height: 92px;
            margin: 0 auto 15px;
            border: 4px double #b18a3b;
            border-radius: 50%;
            background: radial-gradient(
              circle,
              #fff7d8,
              #dfbd6b
            );
            color: #8a6523;
            font-size: 38px;
            font-weight: bold;
            box-shadow: 0 0 0 5px #f3e4b8;
          }

          .date {
            margin-bottom: 12px;
            color: #554a38;
            font: 12px Arial, sans-serif;
          }

          .date strong {
            display: block;
            margin-bottom: 5px;
            color: #26354c;
          }

          .certificate-id {
            margin-top: 13px;
            color: #8a7a5b;
            font: 9px Arial, sans-serif;
            letter-spacing: 1px;
          }

          @media print {
            body { padding: 8mm; }
            .certificate { min-height: 186mm; }
          }
        </style>
      </head>

      <body>
        <div class="certificate">
          <div class="corner tl"></div>
          <div class="corner tr"></div>
          <div class="corner bl"></div>
          <div class="corner br"></div>

          <div class="top-label">OFFICIAL RECOGNITION</div>
          <div class="brand">EVENTFLOW</div>
          <div class="tagline">
            LEARN • PARTICIPATE • GROW
          </div>

          <div class="gold-line"></div>

          <h1>Certificate of Participation</h1>

          <div class="presented">
            This certificate is proudly presented to
          </div>

          <div class="student">
            ${safe(certificate.studentName)}
          </div>

          <div class="department">
            ${safe(certificate.department)}
          </div>

          <div class="event-intro">
            In recognition of valuable participation in
          </div>

          <div class="event-name">
            ${safe(certificate.eventName)}
          </div>

          <div class="appreciation">
            With appreciation for your enthusiasm, effort and
            commitment to learning.
          </div>

          <div class="bottom-area">
            <div class="sign-box">
              <svg class="signature-art"
                viewBox="0 0 200 55"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 39 C24 13,31 12,27 34
                  C25 45,41 17,48 23
                  C55 29,37 43,52 39
                  C65 35,64 17,72 19
                  C81 22,64 43,80 38
                  C95 34,93 16,99 20
                  C108 27,90 43,111 36
                  C123 31,127 20,131 24
                  C135 29,122 37,140 34
                  C154 31,163 24,177 29"
                  fill="none"
                  stroke="#172844"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
                <path d="M22 47 C65 43,111 46,169 39"
                  fill="none"
                  stroke="#172844"
                  stroke-width="1.4"
                  stroke-linecap="round"/>
              </svg>

              <div class="sign-line"></div>
              <div class="sign-name">Event Coordinator</div>
              <div class="sign-role">
                EventFlow Administration
              </div>
            </div>

            <div>
              <div class="seal">E</div>
              <div class="date">
                <strong>ISSUE DATE</strong>
                ${safe(certificate.issuedAt)}
              </div>
            </div>

            <div class="sign-box">
              <svg class="signature-art"
                viewBox="0 0 200 55"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M13 39 C27 18,31 13,29 32
                  C27 45,44 17,51 23
                  C57 30,42 41,57 37
                  C72 33,72 17,79 21
                  C87 26,71 42,90 37
                  C105 32,110 20,114 24
                  C119 31,105 38,125 35
                  C141 32,152 23,177 26"
                  fill="none"
                  stroke="#172844"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
                <path d="M25 47 C70 43,120 45,171 38"
                  fill="none"
                  stroke="#172844"
                  stroke-width="1.4"
                  stroke-linecap="round"/>
              </svg>

              <div class="sign-line"></div>
              <div class="sign-name">Authorized Faculty</div>
              <div class="sign-role">
                Faculty Signature
              </div>
            </div>
          </div>

          <div class="certificate-id">
            CERTIFICATE ID: ${safe(certificate.id)}
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
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

          <button
            type="button"
            className="icn-nav-active"
          >
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
          <p>
            Create participation certificates for your students.
          </p>
        </div>

        <div className="icn-trophy">🏆</div>
      </header>

      <div className="icn-stats">
        <div className="icn-stat">
          <span>Total Sample Students</span>
          <strong>{STUDENTS.length}</strong>
        </div>

        <div className="icn-stat">
          <span>Certificates Issued</span>
          <strong>{certificates.length}</strong>
        </div>
      </div>

      <div className="icn-layout">
        <section className="icn-card">
          <h2>Issue New Certificate</h2>
          <p className="icn-subtitle">
            Enter the certificate details.
          </p>

          <form onSubmit={handleIssue}>
            <label htmlFor="icn-student">
              Student Name
            </label>

            <select
              id="icn-student"
              value={studentId}
              onChange={(e) =>
                handleStudentChange(e.target.value)
              }
              required
            >
              <option value="">Choose a student</option>

              {STUDENTS.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </option>
              ))}
            </select>

            <label htmlFor="icn-department">
              Department
            </label>

            <select
              id="icn-department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Choose department</option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Computer Applications">
                Computer Applications
              </option>
              <option value="Commerce">Commerce</option>
            </select>

            <label htmlFor="icn-event">Event Name</label>

            <select
              id="icn-event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            >
              <option value="">Choose an event</option>

              {EVENTS.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>

            {message && (
              <div
                className={`icn-message ${
                  message.includes("successfully")
                    ? "success"
                    : "error"
                }`}
              >
                {message}
              </div>
            )}

            <button
              className="icn-primary-btn"
              type="submit"
            >
              Issue Certificate
            </button>
          </form>
        </section>

        <section className="icn-card">
          <div className="icn-list-header">
            <div>
              <h2>Issued Certificates</h2>
              <p className="icn-subtitle">
                Your locally saved certificates.
              </p>
            </div>

            <span className="icn-count">
              {certificates.length}
            </span>
          </div>

          {certificates.length === 0 ? (
            <div className="icn-empty">
              <span>📜</span>
              <h3>No certificates yet</h3>
              <p>
                Issue a certificate to see it here.
              </p>
            </div>
          ) : (
            <div className="icn-list">
              {certificates.map((certificate) => (
                <article
                  className="icn-item"
                  key={certificate.id}
                >
                  <div className="icn-item-icon">🏆</div>

                  <div className="icn-item-info">
                    <h3>{certificate.studentName}</h3>
                    <p>{certificate.department}</p>
                    <p>{certificate.eventName}</p>
                    <small>ID: {certificate.id}</small>
                  </div>

                  <button
                    className="icn-print-btn"
                    type="button"
                    onClick={() => handlePrint(certificate)}
                  >
                    Print / PDF
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {preview && (
        <div className="icn-preview">
          <div>
            <h3>Certificate Created Successfully</h3>
            <p>
              {preview.studentName} · {preview.eventName}
            </p>
          </div>

          <button
            className="icn-primary-btn"
            type="button"
            onClick={() => handlePrint(preview)}
          >
            Print / Save PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default IssueCertificate;
