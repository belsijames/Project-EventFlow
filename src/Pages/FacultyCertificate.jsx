import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyCertificate.css";

const SAMPLE_STUDENTS = [
  {
    id: 1,
    name: "Mary Belsi",
    email: "marybelsi@example.com",
    event: "Tech Talk 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arunkumar@example.com",
    event: "Web Development Bootcamp",
    status: "Pending",
  },
  {
    id: 3,
    name: "Priya Devi",
    email: "priyadevi@example.com",
    event: "Creative Minds Workshop",
    status: "Pending",
  },
  {
    id: 4,
    name: "Rahul Kumar",
    email: "rahulkumar@example.com",
    event: "Communication Skills Workshop",
    status: "Pending",
  },
];

const STORAGE_KEY = "eventflow_faculty_certificate_verification";

function FacultyCertificate() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null"
      );

      if (Array.isArray(saved)) {
        setStudents(saved);
      } else {
        setStudents(SAMPLE_STUDENTS);
      }
    } catch {
      setStudents(SAMPLE_STUDENTS);
    }
  }, []);

  const updateStudents = (updated) => {
    setStudents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateStatus = (id, status) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, status } : student
    );

    updateStudents(updated);
    setMessage(
      status === "Eligible"
        ? "Student marked as eligible for a certificate."
        : "Student participation marked as not eligible."
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesFilter =
      filter === "All" || student.status === filter;

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.event.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pendingCount = students.filter(
    (student) => student.status === "Pending"
  ).length;

  const eligibleCount = students.filter(
    (student) => student.status === "Eligible"
  ).length;

  const notEligibleCount = students.filter(
    (student) => student.status === "Not Eligible"
  ).length;

  return (
    <div className="faculty-certificate-page">
      <aside className="faculty-cert-sidebar">
        <div className="faculty-cert-brand">
          <div className="faculty-cert-logo">E</div>
          <div>
            <h2>EventFlow</h2>
            <p>Faculty Portal</p>
          </div>
        </div>

        <p className="faculty-cert-menu-label">FACULTY MENU</p>

        <button
          className="faculty-cert-nav"
          onClick={() => navigate("/FacultyDashboard")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className="faculty-cert-nav"
          onClick={() => navigate("/FacultyRegistrations")}
        >
          <span>♙</span> Registrations
        </button>

        <button className="faculty-cert-nav active">
          <span>✓</span> Certificate Verification
        </button>

        <div className="faculty-cert-sidebar-bottom">
          <div className="faculty-cert-help-icon">?</div>
          <h4>Certificate Review</h4>
          <p>Verify event participation before recommending certificates.</p>
        </div>
      </aside>

      <main className="faculty-cert-main">
        <header className="faculty-cert-header">
          <div>
            <p className="faculty-cert-breadcrumb">
              Faculty / Certificate Verification
            </p>
            <h1>Certificate Verification</h1>
            <p className="faculty-cert-subtitle">
              Review student participation and confirm certificate eligibility.
            </p>
          </div>

          <div className="faculty-cert-profile">
            <div className="faculty-cert-avatar">F</div>
            <div>
              <strong>Faculty</strong>
              <small>Event Coordinator</small>
            </div>
          </div>
        </header>

        <section className="faculty-cert-welcome">
          <div>
            <span className="faculty-cert-welcome-tag">
              PARTICIPATION REVIEW
            </span>
            <h2>Verify. Approve. Recognize.</h2>
            <p>
              Review each student's participation before marking them eligible
              for an event certificate.
            </p>
          </div>
          <div className="faculty-cert-welcome-icon">✓</div>
        </section>

        <section className="faculty-cert-stats">
          <div className="faculty-cert-stat">
            <div className="faculty-cert-stat-icon total">▤</div>
            <div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="faculty-cert-stat">
            <div className="faculty-cert-stat-icon pending">◷</div>
            <div>
              <p>Pending Review</p>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="faculty-cert-stat">
            <div className="faculty-cert-stat-icon eligible">✓</div>
            <div>
              <p>Eligible</p>
              <h2>{eligibleCount}</h2>
            </div>
          </div>

          <div className="faculty-cert-stat">
            <div className="faculty-cert-stat-icon rejected">×</div>
            <div>
              <p>Not Eligible</p>
              <h2>{notEligibleCount}</h2>
            </div>
          </div>
        </section>

        <section className="faculty-cert-list-card">
          <div className="faculty-cert-list-header">
            <div>
              <h2>Student Participation</h2>
              <p>Check the event details and update the eligibility status.</p>
            </div>
            <span className="faculty-cert-record-count">
              {filteredStudents.length} students
            </span>
          </div>

          <div className="faculty-cert-toolbar">
            <div className="faculty-cert-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search student or event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="faculty-cert-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter by eligibility status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Eligible">Eligible</option>
              <option value="Not Eligible">Not Eligible</option>
            </select>
          </div>

          {message && (
            <div className="faculty-cert-message" role="status">
              {message}
            </div>
          )}

          <div className="faculty-cert-table-wrap">
            <table className="faculty-cert-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Event</th>
                  <th>Review Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="faculty-cert-student">
                        <div className="faculty-cert-student-avatar">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{student.name}</strong>
                          <small>{student.email}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="faculty-cert-event">
                        {student.event}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`faculty-cert-status ${
                          student.status === "Eligible"
                            ? "status-eligible"
                            : student.status === "Not Eligible"
                            ? "status-rejected"
                            : "status-pending"
                        }`}
                      >
                        <span className="faculty-cert-status-dot"></span>
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <div className="faculty-cert-actions">
                        <button
                          className="faculty-cert-approve"
                          onClick={() =>
                            updateStatus(student.id, "Eligible")
                          }
                          type="button"
                          disabled={student.status === "Eligible"}
                        >
                          Approve
                        </button>

                        <button
                          className="faculty-cert-reject"
                          onClick={() =>
                            updateStatus(student.id, "Not Eligible")
                          }
                          type="button"
                          disabled={student.status === "Not Eligible"}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="4">
                      <div className="faculty-cert-no-results">
                        <span>⌕</span>
                        <h3>No students found</h3>
                        <p>Try another search term or status filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="faculty-cert-footer">
            <span>
              Showing {filteredStudents.length} of {students.length} students
            </span>
            <span>Changes are saved in this browser</span>
          </div>
        </section>

        <div className="faculty-cert-info">
          <span>ⓘ</span>
          <p>
            Faculty approval records eligibility only. The Admin is responsible
            for issuing the final certificate.
          </p>
        </div>
      </main>
    </div>
  );
}

export default FacultyCertificate;