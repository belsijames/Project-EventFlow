import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminIssueCertificate.css";

const EVENTS = [
  "Tech Talk 2026",
  "Creative Minds Workshop",
  "Web Development Bootcamp",
  "Communication Skills Workshop",
  "Career Guidance Session",
  "Science & Innovation Expo",
];

const STUDENTS = [
  { id: 1, name: "Mary Belsi", email: "marybelsi@example.com" },
  { id: 2, name: "Arun Kumar", email: "arunkumar@example.com" },
  { id: 3, name: "Priya Devi", email: "priyadevi@example.com" },
];

function AdminIssueCertificate() {
  const navigate = useNavigate();

  const [student, setStudent] = useState("");
  const [event, setEvent] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("eventflow_admin_certificates") || "[]"
      );
      setCertificates(Array.isArray(saved) ? saved : []);
    } catch {
      setCertificates([]);
    }
  }, []);

  const saveCertificates = (updated) => {
    setCertificates(updated);
    localStorage.setItem(
      "eventflow_admin_certificates",
      JSON.stringify(updated)
    );
  };

  const issueCertificate = (e) => {
    e.preventDefault();

    if (!student || !event) {
      setMessage("Please select both student and event.");
      return;
    }

    const selectedStudent = STUDENTS.find(
      (item) => String(item.id) === student
    );

    const alreadyIssued = certificates.some(
      (item) =>
        item.studentId === selectedStudent.id && item.event === event
    );

    if (alreadyIssued) {
      setMessage("Certificate already issued for this student and event.");
      return;
    }

    const certificate = {
      id: `EF-${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      email: selectedStudent.email,
      event,
      issuedDate: new Date().toLocaleDateString("en-IN"),
    };

    saveCertificates([certificate, ...certificates]);
    setStudent("");
    setEvent("");
    setMessage("Certificate record created successfully!");
  };

  const deleteCertificate = (id) => {
    if (window.confirm("Delete this certificate record?")) {
      saveCertificates(certificates.filter((item) => item.id !== id));
      setMessage("Certificate record deleted.");
    }
  };

  const printCertificate = (certificate) => {
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
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body {
            font-family: Georgia, serif;
            color: #30203d;
            text-align: center;
            margin: 0;
            padding: 15px;
          }
          .certificate {
            border: 8px double #a17a35;
            min-height: 440px;
            padding: 35px;
            box-sizing: border-box;
          }
          h1 {
            font-size: 38px;
            color: #54256d;
            margin-bottom: 8px;
          }
          .subtitle { font-size: 17px; }
          .name {
            font-size: 32px;
            font-weight: bold;
            border-bottom: 1px solid #a17a35;
            display: inline-block;
            padding: 10px 35px;
          }
          .event { font-size: 21px; font-weight: bold; }
          .footer {
            display: flex;
            justify-content: space-around;
            margin-top: 45px;
          }
          .line {
            border-top: 1px solid #6c5a72;
            padding-top: 8px;
            width: 210px;
          }
          .id { font-size: 12px; color: #665a6d; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <p class="subtitle">EVENTFLOW • SMART LEARNING PLATFORM</p>
          <h1>Certificate of Participation</h1>
          <p>This certificate is presented to</p>
          <p class="name">${certificate.studentName}</p>
          <p>for participating in</p>
          <p class="event">${certificate.event}</p>
          <p>Issued on ${certificate.issuedDate}</p>
          <p class="id">Certificate ID: ${certificate.id}</p>
          <div class="footer">
            <div class="line">Faculty / Event Coordinator</div>
            <div class="line">Authorized Administrator</div>
          </div>
        </div>
        <script>
          window.onload = () => window.print();
        <\/script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="admin-certificate-page">
      <aside className="certificate-sidebar">
        <div className="certificate-brand">
          <span className="brand-icon">E</span>
          <div>
            <h2>EventFlow</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <div className="sidebar-label">ADMINISTRATION</div>

        <button onClick={() => navigate("/AdminDashboard")}>
          <span>▦</span> Dashboard
        </button>

        <button onClick={() => navigate("/AdminIssueCertificate")} className="active">
          <span>▤</span> Certificates
        </button>

        <div className="sidebar-bottom">
          <p>Certificate Control</p>
          <small>Manage student certificates</small>
        </div>
      </aside>

      <main className="certificate-main">
        <header className="certificate-topbar">
          <div>
            <p className="breadcrumb">Admin / Certificates</p>
            <h1>Certificate Management</h1>
            <p className="page-description">
              Issue and manage participation certificates for students.
            </p>
          </div>
          <div className="admin-avatar">A</div>
        </header>

        <section className="certificate-stats">
          <div className="certificate-stat">
            <span className="stat-icon purple">▤</span>
            <div>
              <p>Total Certificates</p>
              <h2>{certificates.length}</h2>
            </div>
          </div>

          <div className="certificate-stat">
            <span className="stat-icon gold">✓</span>
            <div>
              <p>Available Events</p>
              <h2>{EVENTS.length}</h2>
            </div>
          </div>

          <div className="certificate-stat">
            <span className="stat-icon blue">♙</span>
            <div>
              <p>Sample Students</p>
              <h2>{STUDENTS.length}</h2>
            </div>
          </div>
        </section>

        <section className="issue-certificate-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CERTIFICATE CONTROL</span>
              <h2>Issue New Certificate</h2>
              <p>Select a student and the event they participated in.</p>
            </div>
            <span className="certificate-heading-icon">✦</span>
          </div>

          <form onSubmit={issueCertificate}>
            <div className="certificate-form-grid">
              <div className="certificate-field">
                <label htmlFor="student">Select Student</label>
                <select
                  id="student"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  required
                >
                  <option value="">Choose a student</option>
                  {STUDENTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="certificate-field">
                <label htmlFor="event">Select Event</label>
                <select
                  id="event"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  required
                >
                  <option value="">Choose an event</option>
                  {EVENTS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {message && (
              <p className="certificate-message" role="status">
                {message}
              </p>
            )}

            <button className="issue-certificate-button" type="submit">
              + Issue Certificate
            </button>
          </form>
        </section>

        <section className="issued-certificates-card">
          <div className="issued-heading">
            <div>
              <span className="eyebrow">RECORDS</span>
              <h2>Issued Certificates</h2>
            </div>
            <span className="record-count">{certificates.length} records</span>
          </div>

          {certificates.length === 0 ? (
            <div className="certificate-empty">
              <span>▤</span>
              <h3>No certificates issued yet</h3>
              <p>Choose a student and event above to create your first record.</p>
            </div>
          ) : (
            <div className="certificate-table-wrap">
              <table className="certificate-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Event</th>
                    <th>Issued Date</th>
                    <th>Certificate ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.studentName}</strong>
                        <small>{item.email}</small>
                      </td>
                      <td>{item.event}</td>
                      <td>{item.issuedDate}</td>
                      <td><span className="certificate-id">{item.id}</span></td>
                      <td>
                        <div className="certificate-actions">
                          <button
                            className="print-certificate-button"
                            onClick={() => printCertificate(item)}
                            type="button"
                          >
                            Print
                          </button>
                          <button
                            className="delete-certificate-button"
                            onClick={() => deleteCertificate(item.id)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="certificate-note">
          Note: This version uses sample students and browser storage.
          Connect the backend and MySQL before using real student records.
        </p>
      </main>
    </div>
  );
}

export default AdminIssueCertificate;