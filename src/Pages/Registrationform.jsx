// src/Pages/Registrationform.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Registrationform.css";

const Registrationform = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Event details: router state first, saved selection as fallback
  let savedEvent = {};

  try {
    savedEvent = JSON.parse(
      sessionStorage.getItem("selectedEvent") || "{}"
    );
  } catch {
    savedEvent = {};
  }

  const rawEvent = location.state?.event || savedEvent;

  // Support different event property names
  const event = {
    title:
      rawEvent.title ||
      rawEvent.name ||
      rawEvent.event_name ||
      rawEvent.eventName ||
      "",
    date:
      rawEvent.date ||
      rawEvent.event_date ||
      rawEvent.eventDate ||
      "",
    time:
      rawEvent.time ||
      rawEvent.event_time ||
      rawEvent.eventTime ||
      "",
    location:
      rawEvent.location ||
      rawEvent.event_location ||
      rawEvent.eventLocation ||
      "",
    category:
      rawEvent.category ||
      rawEvent.type ||
      "Educational Event",
  };

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    department: user.department || "",
    course: user.course || "",
    year: user.year || "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!event.title) {
      setError(
        "Event details are missing. Please return to Events and select an event."
      );
      return;
    }

    if (!user.id) {
      setError("Please log in again before registering for an event.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            eventName: event.title,
            eventDate: event.date,
            eventTime: event.time,
            eventLocation: event.location,
            name: formData.name,
            email: formData.email,
            department: formData.department,
            course: formData.course,
            year: formData.year,
            phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Registration failed."
        );
      }

      sessionStorage.removeItem("selectedEvent");

      navigate("/MyRegistration", {
        state: { message: "Registration successful!" },
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to register. Please check whether the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Don't show a broken form when no event has been selected
  if (!event.title) {
    return (
      <div className="registration-page">
        <div className="registration-missing">
          <div className="registration-missing-symbol">!</div>
          <h2>No Event Selected</h2>
          <p>
            Select an event first. Its details will appear here
            automatically.
          </p>
          <button
            className="registration-primary-btn"
            onClick={() => navigate("/Events")}
          >
            Explore Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="registration-shell">
        <aside className="registration-banner">
          <div className="registration-brand">EventFlow</div>

          <span className="registration-eyebrow">
            YOUR NEXT EXPERIENCE STARTS HERE
          </span>

          <h1>
            Make it
            <br />
            <span>happen.</span>
          </h1>

          <p className="registration-banner-description">
            Reserve your place, meet new people, and take the next
            step in your learning journey.
          </p>

          <div className="registration-selected-event">
            <span className="registration-event-label">
              YOU'RE REGISTERING FOR
            </span>

            <h2>{event.title}</h2>

            <div className="registration-event-meta">
              <p>
                <span>DATE</span>
                {event.date || "To be announced"}
              </p>

              <p>
                <span>TIME</span>
                {event.time || "To be announced"}
              </p>

              <p>
                <span>VENUE</span>
                {event.location || "To be announced"}
              </p>
            </div>

            <span className="registration-category">
              {event.category}
            </span>
          </div>

          <div className="registration-banner-footer">
            Learn something new. Connect. Grow.
          </div>
        </aside>

        <main className="registration-content">
          <div className="registration-topline">
            <span className="registration-step">EVENT REGISTRATION</span>
            <button
              type="button"
              className="registration-back-link"
              onClick={() => navigate("/Events")}
            >
              ← Back to events
            </button>
          </div>

          <h2 className="registration-form-title">
            Save your <span>spot</span>
          </h2>

          <p className="registration-form-subtitle">
            Enter your details to complete your event registration.
          </p>

          {error && (
            <div className="registration-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 className="registration-group-title">
              Personal information
            </h3>

            <div className="registration-fields">
              <div className="registration-field">
                <label htmlFor="name">Full name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="email">Email address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="department">Department *</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Your department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="course">Course</label>
                <input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="e.g. B.Sc. Computer Science"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div className="registration-field">
                <label htmlFor="year">Year of study</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div className="registration-field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="registration-consent">
              <span className="registration-consent-dot">✓</span>
              <p>
                Please verify your information before submitting.
                Your registration will be linked to your account.
              </p>
            </div>

            <button
              type="submit"
              className="registration-primary-btn registration-submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Confirm Registration"}
              {!loading && <span>→</span>}
            </button>

            <p className="registration-form-note">
              By registering, you confirm that the details provided
              are correct.
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Registrationform;