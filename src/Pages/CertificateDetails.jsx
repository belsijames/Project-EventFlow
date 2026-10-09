
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CertificateDetails.css";

function CertificateDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const certificates = {
    1: {
      title: "Web Development Workshop",
      date: "10 October 2026",
      certificateId: "EF-WEB-001",
    },
    2: {
      title: "Communication Skills Workshop",
      date: "15 October 2026",
      certificateId: "EF-COM-002",
    },
  };

  const certificate = certificates[id];

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  if (!certificate) {
    return (
      <div className="certificate-not-found">
        <h2>Certificate not found</h2>
        <button onClick={() => navigate("/certificates")}>
          Back to Certificates
        </button>
      </div>
    );
  }

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="certificate-details-page">
      <div className="certificate-details-actions">
        <button onClick={() => navigate("/Certificate")}>
          ← Back to Certificates
        </button>

        <button
          className="print-certificate-btn"
          onClick={printCertificate}
        >
          Print / Save as PDF
        </button>
      </div>

      <div className="full-certificate">
        <div className="full-certificate-inner">
          <p className="full-certificate-brand">EVENTFLOW</p>

          <div className="full-certificate-emblem">✦</div>

          <p className="full-certificate-label">
            CERTIFICATE OF PARTICIPATION
          </p>

          <h1>Certificate</h1>

          <p className="full-certificate-intro">
            This certificate is presented to
          </p>

          <h2 className="participant-name">
            {user.name || "Participant Name"}
          </h2>

          <div className="participant-underline"></div>

          <p className="full-certificate-description">
            for participating in
          </p>

          <h3 className="full-certificate-event">
            {certificate.title}
          </h3>

          <p className="full-certificate-description">
            We appreciate the effort and enthusiasm shown
            throughout this learning experience.
          </p>

          <div className="full-certificate-footer">
            <div>
              <div className="signature-line"></div>
              <p>EventFlow</p>
              <small>Platform</small>
            </div>

            <div className="certificate-gold-seal">
              <span>✦</span>
              <small>ACHIEVEMENT</small>
            </div>

            <div>
              <div className="signature-line"></div>
              <p>{certificate.date}</p>
              <small>Issue Date</small>
            </div>
          </div>

          <p className="full-certificate-id">
            Certificate ID: {certificate.certificateId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CertificateDetails;