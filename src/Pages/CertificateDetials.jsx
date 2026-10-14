
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CertificateDetials.css";

const sampleCertificates = [
  {
    id: 1,
    studentName: "Mary Belsi",
    eventName: "Web Development Bootcamp",
    date: "20 October 2026",
    certificateId: "EF-WEB-001",
  },
  {
    id: 2,
    studentName: "Mary Belsi",
    eventName: "Tech Talk 2026",
    date: "10 October 2026",
    certificateId: "EF-TECH-002",
  },
];

function CertificateDetials() {
  const navigate = useNavigate();

  const [studentName] = useState("Mary Belsi");
  const [certificates] = useState(sampleCertificates);
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleDownloadCertificate = () => {
    if (!selectedCertificate) return;
    window.print();
  };

  return (
    <div className="certificate-page">
      {/* Navbar */}
      <nav className="certificate-navbar no-print">
        <div className="certificate-brand">
          <div className="certificate-brand-logo">E</div>
          <span>EventFlow</span>
        </div>

        <button
          className="certificate-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </nav>

      <main className="certificate-main">
        {/* Heading */}
        <div className="certificate-heading no-print">
          <span className="certificate-eyebrow">
            YOUR LEARNING JOURNEY
          </span>

          <h1>My Certificates</h1>

          <p>
            Celebrate your achievements and showcase your
            learning journey with EventFlow.
          </p>
        </div>

        {/* Student summary */}
        <section className="certificate-summary no-print">
          <div className="certificate-avatar">
            {studentName.charAt(0)}
          </div>

          <div className="certificate-student-info">
            <span>WELCOME BACK</span>
            <h2>{studentName}</h2>
            <p>Your certificates and achievements</p>
          </div>

          <div className="certificate-count">
            <strong>{certificates.length}</strong>
            <span>Certificates</span>
          </div>
        </section>

        {/* Certificate cards */}
        <section className="certificate-section no-print">
          <div className="certificate-section-heading">
            <div>
              <h2>Your Achievements</h2>
              <p>Choose a certificate to view its details.</p>
            </div>

            <span className="certificate-total">
              {certificates.length} Available
            </span>
          </div>

          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <article
                className="certificate-card"
                key={certificate.id}
              >
                <div className="certificate-art">
                  <div className="certificate-art-decoration">
                    ✦
                  </div>

                  <div className="certificate-mini-paper">
                    <div className="mini-logo">E</div>
                    <span>EVENTFLOW</span>
                    <h3>CERTIFICATE</h3>
                    <h4>OF ACHIEVEMENT</h4>
                    <div className="mini-line" />
                    <p>{certificate.eventName}</p>
                  </div>
                </div>

                <div className="certificate-card-body">
                  <span className="certificate-issued">
                    <span className="issued-dot" />
                    SAMPLE CERTIFICATE
                  </span>

                  <h3>{certificate.eventName}</h3>

                  <div className="certificate-meta">
                    <div>
                      <span>STUDENT</span>
                      <strong>{certificate.studentName}</strong>
                    </div>

                    <div>
                      <span>COMPLETION DATE</span>
                      <strong>{certificate.date}</strong>
                    </div>
                  </div>

                  <button
                    className="certificate-view-btn"
                    onClick={() =>
                      handleViewCertificate(certificate)
                    }
                  >
                    View Certificate
                    <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Certificate preview */}
        {selectedCertificate && (
          <section className="certificate-preview-section">
            <div className="certificate-preview-heading no-print">
              <div>
                <span className="certificate-eyebrow">
                  CERTIFICATE DETAILS
                </span>
                <h2>Certificate Preview</h2>
              </div>

              <button
                className="certificate-close-btn"
                onClick={() => setSelectedCertificate(null)}
              >
                ✕ Close
              </button>
            </div>

            <div className="certificate-paper print-certificate">
              <div className="certificate-paper-inner">
                <div className="certificate-paper-logo">E</div>

                <span className="paper-brand">
                  EVENTFLOW LEARNING PLATFORM
                </span>

                <h1>Certificate</h1>
                <h2>OF ACHIEVEMENT</h2>

                <p className="paper-intro">
                  This certificate is presented to
                </p>

                <h3 className="paper-student">
                  {selectedCertificate.studentName}
                </h3>

                <div className="paper-name-line" />

                <p className="paper-description">
                  In recognition of completing the learning
                  activity
                </p>

                <h4 className="paper-event">
                  {selectedCertificate.eventName}
                </h4>

                <p className="paper-date">
                  Completion Date: {selectedCertificate.date}
                </p>

                <div className="paper-bottom">
                  <div className="paper-signature">
                    <div className="paper-signature-line" />
                    <strong>EventFlow</strong>
                    <span>Learning Platform</span>
                  </div>

                  <div className="paper-seal">
                    <span>✦</span>
                    <strong>ACHIEVEMENT</strong>
                    <small>EVENTFLOW</small>
                  </div>

                  <div className="paper-signature">
                    <div className="paper-signature-line" />
                    <strong>Certificate ID</strong>
                    <span>{selectedCertificate.certificateId}</span>
                  </div>
                </div>

                <div className="paper-footer">
                  LEARN • PARTICIPATE • ACHIEVE
                </div>
              </div>
            </div>

            <div className="certificate-preview-actions no-print">
              <button
                className="certificate-close-action"
                onClick={() => setSelectedCertificate(null)}
              >
                Close Preview
              </button>

              <button
                className="certificate-download-btn"
                onClick={handleDownloadCertificate}
              >
                ↓ Print / Save as PDF
              </button>
            </div>

            <p className="certificate-print-hint no-print">
              Select “Save as PDF” in the print window to save
              your certificate.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default CertificateDetials;
