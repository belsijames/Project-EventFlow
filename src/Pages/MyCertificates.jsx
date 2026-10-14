
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./MyCertificates.css";

const API = "http://localhost:5000/api/certificates";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  let user = {};

  try {
    user =
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null") ||
      {};
  } catch {
    user = {};
  }

  useEffect(() => {
    let cancelled = false;

    async function loadCertificates() {
      setLoading(true);
      setError("");

      if (!user.id) {
        setError("Please log in to view your certificates.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API}/my/${encodeURIComponent(user.id)}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const responseText = await response.text();

        let data;

        try {
          data = JSON.parse(responseText);
        } catch {
          console.error(
            "Certificate API returned non-JSON response:",
            responseText
          );

          throw new Error(
            "Backend returned HTML instead of JSON. Check server.js and the certificate API route."
          );
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load certificates."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            data.message || "Invalid certificate response from backend."
          );
        }

        if (!cancelled) {
          setCertificates(data);
        }
      } catch (err) {
        console.error("Certificate loading error:", err);

        if (!cancelled) {
          setError(
            err.message || "Cannot connect to the backend server."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCertificates();

    return () => {
      cancelled = true;
    };
  }, [user.id]);

  function formatDate(value) {
    if (!value) return "—";

    // MySQL DATE values may arrive as YYYY-MM-DD.
    const dateText =
      typeof value === "string" ? value.slice(0, 10) : value;

    const parts =
      typeof dateText === "string"
        ? dateText.split("-")
        : [];

    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-IN");
  }

  function downloadCertificate(certificate) {
    if (!certificate.certificate_id || !certificate.event_name) {
      alert("Certificate details are incomplete.");
      return;
    }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const width = 297;
    const height = 210;
    const studentName =
      certificate.student_name || user.name || "Student";

    // Outer decorative border
    pdf.setDrawColor(111, 65, 160);
    pdf.setLineWidth(1.5);
    pdf.rect(10, 10, width - 20, height - 20);

    // Inner border
    pdf.setDrawColor(198, 166, 112);
    pdf.setLineWidth(0.6);
    pdf.rect(15, 15, width - 30, height - 30);

    // Brand
    pdf.setTextColor(73, 35, 100);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(17);
    pdf.text("EVENTFLOW", width / 2, 33, {
      align: "center",
    });

    // Certificate title
    pdf.setFontSize(25);
    pdf.text("CERTIFICATE OF PARTICIPATION", width / 2, 55, {
      align: "center",
    });

    // Intro
    pdf.setTextColor(75, 75, 75);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(13);
    pdf.text(
      "This certificate is proudly presented to",
      width / 2,
      76,
      { align: "center" }
    );

    // Student name
    pdf.setTextColor(73, 35, 100);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);

    const nameLines = pdf.splitTextToSize(studentName, 230);

    pdf.text(nameLines, width / 2, 94, {
      align: "center",
    });

    // Event details
    const nameBottomY = 94 + nameLines.length * 10;

    pdf.setTextColor(75, 75, 75);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(13);

    pdf.text(
      "for participating in",
      width / 2,
      nameBottomY + 8,
      { align: "center" }
    );

    pdf.setTextColor(73, 35, 100);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);

    const eventLines = pdf.splitTextToSize(
      certificate.event_name,
      230
    );

    pdf.text(eventLines, width / 2, nameBottomY + 22, {
      align: "center",
    });

    // Issue information
    pdf.setTextColor(65, 65, 65);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
      `Issue Date: ${formatDate(certificate.issue_date)}`,
      30,
      169
    );

    pdf.text(
      `Certificate ID: ${certificate.certificate_id}`,
      30,
      178
    );

    // Signature area
    pdf.setDrawColor(100, 70, 120);
    pdf.line(210, 166, 260, 166);

    pdf.setFontSize(10);
    pdf.text("Authorized Signature", 235, 173, {
      align: "center",
    });

    pdf.setFontSize(9);
    pdf.text("EventFlow", 235, 180, {
      align: "center",
    });

    const safeId = String(certificate.certificate_id).replace(
      /[^a-zA-Z0-9_-]/g,
      "_"
    );

    pdf.save(`${safeId}.pdf`);
  }

  if (loading) {
    return (
      <div className="my-cert-message">
        <div className="my-cert-spinner" />
        <p>Loading your certificates...</p>
      </div>
    );
  }

  return (
    <div className="my-cert-page">
      <div className="my-cert-heading">
        <div>
          <p className="my-cert-eyebrow">YOUR ACHIEVEMENTS</p>
          <h1>My Certificates</h1>
          <p>
            View and download certificates issued to you by EventFlow.
          </p>
        </div>

        <div className="my-cert-count">
          <span>{certificates.length}</span>
          <small>Certificates</small>
        </div>
      </div>

      {error && (
        <div className="my-cert-error">
          <strong>Unable to load certificates</strong>
          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!error && certificates.length === 0 && (
        <div className="my-cert-empty">
          <div className="my-cert-award">★</div>
          <h2>No certificates yet</h2>
          <p>
            Certificates issued by your administrator will appear here.
          </p>
        </div>
      )}

      {!error && certificates.length > 0 && (
        <div className="my-cert-grid">
          {certificates.map((certificate) => (
            <article
              className="my-cert-card"
              key={certificate.id}
            >
              <div className="my-cert-card-top">
                <span className="my-cert-seal">★</span>
                <span className="my-cert-status">
                  <span className="my-cert-status-dot" />
                  Issued
                </span>
              </div>

              <p className="my-cert-label">
                EVENTFLOW CERTIFICATE
              </p>

              <h2>{certificate.event_name}</h2>

              <p className="my-cert-recipient">
                Awarded to{" "}
                <strong>
                  {certificate.student_name || user.name || "Student"}
                </strong>
              </p>

              <div className="my-cert-meta">
                <span>Certificate ID</span>
                <strong>{certificate.certificate_id}</strong>

                <span>Issue date</span>
                <strong>{formatDate(certificate.issue_date)}</strong>
              </div>

              <div className="my-cert-actions">
                <button
                  type="button"
                  className="my-cert-view"
                  onClick={() => setSelected(certificate)}
                >
                  View Certificate
                </button>

                <button
                  type="button"
                  className="my-cert-download"
                  onClick={() => downloadCertificate(certificate)}
                >
                  ↓ Download PDF
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="my-cert-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="my-cert-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="my-cert-close"
              onClick={() => setSelected(null)}
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="my-cert-preview">
              <div className="my-cert-preview-inner">
                <p className="my-cert-preview-brand">
                  EVENTFLOW
                </p>

                <p className="my-cert-preview-subtitle">
                  SMART EDUCATIONAL EVENT MANAGEMENT
                </p>

                <h2>Certificate of Participation</h2>

                <div className="my-cert-preview-line" />

                <p>This certificate is proudly presented to</p>

                <h3>
                  {selected.student_name || user.name || "Student"}
                </h3>

                <p>for participating in</p>

                <h4>{selected.event_name}</h4>

                <p className="my-cert-preview-date">
                  Issue Date: {formatDate(selected.issue_date)}
                </p>

                <p className="my-cert-preview-id">
                  Certificate ID: {selected.certificate_id}
                </p>

                <div className="my-cert-signature">
                  <span />
                  <small>Authorized Signature</small>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="my-cert-download modal-download"
              onClick={() => downloadCertificate(selected)}
            >
              ↓ Download Certificate PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCertificates;
