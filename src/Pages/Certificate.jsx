
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Certificate.css";

const API = "http://localhost:5000/api/certificates";

function Certificate() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState({});
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCertificates() {
      setLoading(true);
      setError("");
      setDebugInfo("");

      try {
        // Read login details
        const storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        const currentUser = JSON.parse(
          localStorage.getItem("currentUser") || "{}"
        );

        const user = {
          ...currentUser,
          ...storedUser,
        };

        const token = localStorage.getItem("token");

        const userId =
          user.id ||
          user.userId ||
          user.user_id ||
          user.userID;

        if (cancelled) return;

        setUserInfo(user);

        console.log("Certificate page - User:", user);
        console.log("Certificate page - User ID:", userId);
        console.log("Certificate page - Token exists:", Boolean(token));

        if (!token) {
          throw new Error(
            "Login token not found. Please logout and login again."
          );
        }

        if (!userId) {
          throw new Error(
            "Student ID is missing from login data. Please login again."
          );
        }

        // Request certificates belonging to this user
        const response = await fetch(
          `${API}/my/${encodeURIComponent(userId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const responseText = await response.text();

        console.log("Certificate API status:", response.status);
        console.log("Certificate API response:", responseText);

        let data;

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned an invalid response. Check that the backend is running on port 5000."
          );
        }

        if (!response.ok) {
          throw new Error(
            data.message || `API error: ${response.status}`
          );
        }

        let list = [];

        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data.certificates)) {
          list = data.certificates;
        } else if (Array.isArray(data.data)) {
          list = data.data;
        }

        if (!cancelled) {
          setCertificates(list);
          setDebugInfo(
            `Logged-in user ID: ${userId} | Certificates received: ${list.length}`
          );
        }
      } catch (err) {
        console.error("Certificate loading failed:", err);

        if (!cancelled) {
          setError(
            err.message || "Unable to load certificates."
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
  }, []);

  const formatDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const printCertificate = (certificate) => {
    const safe = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };

        return entities[char];
      });

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
          @page {
            size: A4 landscape;
            margin: 12mm;
          }

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

          h1 {
            font-size: 36px;
          }

          .student {
            font-size: 34px;
            margin: 25px;
          }

          .event {
            font-size: 25px;
            font-weight: bold;
          }

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

          <div class="student">
            ${safe(
              certificate.student_name ||
              userInfo.name ||
              "Student"
            )}
          </div>

          <p>for participating in</p>

          <div class="event">
            ${safe(certificate.event_name)}
          </div>

          <div class="footer">
            <span>
              Issue Date: ${safe(formatDate(certificate.issue_date))}
            </span>

            <span>
              Certificate ID: ${safe(
                certificate.certificate_id || "N/A"
              )}
            </span>
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
            <span className="nc-eyebrow">
              YOUR ACHIEVEMENTS
            </span>

            <h1>My Certificates</h1>

            <p>
              Certificates issued to your account by faculty.
            </p>
          </div>

          <div className="nc-trophy">🏆</div>
        </section>

        {loading ? (
          <div className="nc-summary">
            Loading your certificates...
          </div>
        ) : error ? (
          <div className="nc-summary">
            <strong>Unable to load certificates</strong>
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
            <strong>No certificates found</strong>

            <p>
              No certificates were returned for this login account.
              Check the user ID shown below.
            </p>

            <p>{debugInfo}</p>
          </div>
        ) : (
          <>
            <section className="nc-section-heading">
              <h2>Your Certificates</h2>

              <p>
                {certificates.length} certificate(s) issued to you.
              </p>
            </section>

            <section className="nc-grid">
              {certificates.map((certificate, index) => (
                <article
                  className="nc-card"
                  key={
                    certificate.id ||
                    certificate.certificate_id ||
                    index
                  }
                >
                  <div className="nc-preview">
                    <div className="nc-preview-inner">
                      <span className="nc-preview-brand">
                        EVENTFLOW
                      </span>

                      <span className="nc-preview-award">
                        ✦
                      </span>

                      <h3>Certificate</h3>

                      <span className="nc-preview-line" />

                      <p>{certificate.event_name}</p>

                      <span className="nc-preview-footer">
                        CERTIFICATE OF PARTICIPATION
                      </span>
                    </div>
                  </div>

                  <div className="nc-card-content">
                    <span className="nc-category">
                      Issued Certificate
                    </span>

                    <h3>{certificate.event_name}</h3>

                    <p className="nc-date">
                      Issued: {formatDate(certificate.issue_date)}
                    </p>

                    <p className="nc-date">
                      Certificate ID:{" "}
                      {certificate.certificate_id || "N/A"}
                    </p>

                    <button
                      className="nc-print-btn"
                      type="button"
                      onClick={() =>
                        printCertificate(certificate)
                      }
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
