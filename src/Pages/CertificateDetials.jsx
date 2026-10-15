
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Certificate.css";

const API = "http://localhost:5000/api/certificates";

function Certificate() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userInfo] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      return {
        ...currentUser,
        ...user,
      };
    } catch {
      return {};
    }
  });

  const userId =
    userInfo.id || userInfo.userId || userInfo.user_id;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCertificates() {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Login session not found. Please log in again.");
        setLoading(false);
        return;
      }

      if (!userId) {
        setError(
          "Student ID not found in login details. Please log out and log in again."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API}/my/${encodeURIComponent(userId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `Request failed (${response.status})`
          );
        }

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.certificates)
          ? data.certificates
          : Array.isArray(data.data)
          ? data.data
          : [];

        setCertificates(list);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Certificate loading error:", err);
          setError(err.message || "Unable to load certificates.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCertificates();

    return () => controller.abort();
  }, [token, userId]);

  const formatDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const printCertificate = (certificate) => {
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
      alert("Please allow pop-ups to print your certificate.");
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
            certificates.length >= 0
              ? userInfo.name || certificate.student_name || "Student"
              : "Student"
          )}</div>
          <p>for participating in</p>
          <div class="event">${safe(certificate.event_name)}</div>
          <div class="footer">
            <span>Issue Date: ${safe(formatDate(certificate.issue_date))}</span>
            <span>Certificate ID: ${safe(certificate.certificate_id || "N/A")}</span>
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
    <div className="new-certificate-page">
      <header className="nc-header">
        <button
          className="nc-back"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="nc-brand">
          <span className="nc-brand-icon">✦</span>
          <span>EventFlow</span>
        </div>

        <button
          className="nc-dashboard-btn"
          type="button"
          onClick={() => navigate("/Dashboard")}
        >
          Dashboard
        </button>
      </header>

      <main className="nc-main">
        <section className="nc-hero">
          <div>
            <span className="nc-eyebrow">YOUR ACHIEVEMENTS</span>
            <h1>My Certificates</h1>
            <p>Certificates issued to your account by faculty.</p>
          </div>
          <div className="nc-trophy">🏆</div>
        </section>

        {loading ? (
          <div className="nc-summary">Loading your certificates...</div>
        ) : error ? (
          <div className="nc-summary">
            <p>{error}</p>
            <button
              className="nc-print-btn"
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : certificates.length === 0 ? (
          <div className="nc-summary">
            <div>
              <strong>No certificates yet</strong>
              <p>
                No certificates were returned for this account.
                Please check that faculty issued the certificate to
                this student's database ID.
              </p>
            </div>
          </div>
        ) : (
          <>
            <section className="nc-section-heading">
              <h2>Your Certificates</h2>
              <p>{certificates.length} certificate(s) issued to you.</p>
            </section>

            <section className="nc-grid">
              {certificates.map((certificate, index) => (
                <article
                  className="nc-card"
                  key={certificate.id || certificate.certificate_id || index}
                >
                  <div className="nc-preview">
                    <div className="nc-preview-inner">
                      <span className="nc-preview-brand">EVENTFLOW</span>
                      <span className="nc-preview-award">✦</span>
                      <h3>Certificate</h3>
                      <span className="nc-preview-line" />
                      <p>{certificate.event_name}</p>
                      <span className="nc-preview-footer">
                        CERTIFICATE OF PARTICIPATION
                      </span>
                    </div>
                  </div>

                  <div className="nc-card-content">
                    <span className="nc-category">Issued Certificate</span>
                    <h3>{certificate.event_name}</h3>
                    <p className="nc-date">
                      Issued: {formatDate(certificate.issue_date)}
                    </p>
                    <p className="nc-date">
                      Certificate ID: {certificate.certificate_id || "N/A"}
                    </p>
                    <button
                      className="nc-print-btn"
                      type="button"
                      onClick={() => printCertificate(certificate)}
                    >
                      Print Certificate ↗
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Certificate;
