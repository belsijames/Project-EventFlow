import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Registrationform.css";

function Registrationform() {
  const navigate = useNavigate();
  const location = useLocation();

  const eventName =
    location.state?.eventName || "Event Registration";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.phone
    ) {
      alert("Please fill all the details.");
      return;
    }

    const registration = {
      ...formData,
      eventName: eventName,
      registeredAt: new Date().toLocaleString(),
    };

    // Get existing registrations
    const existingRegistrations =
      JSON.parse(localStorage.getItem("eventRegistrations")) || [];

    // Add new registration
    existingRegistrations.push(registration);

    // Save
    localStorage.setItem(
      "eventRegistrations",
      JSON.stringify(existingRegistrations)
    );

    alert(`Successfully registered for ${eventName}!`);

    navigate("/my-registration");
  };

  return (
    <div className="event-registration-page">

      {/* Background Image */}
      <img
        src="/login-bg.jpeg"
        alt="EventFlow Background"
        className="registration-background"
      />

      {/* Overlay */}
      <div className="registration-overlay"></div>

      {/* Registration Card */}
      <div className="registration-card">

        <div className="registration-header">
          <h1>EventFlow</h1>

          <h2>Event Registration</h2>

          <p>
            Register now and participate in your selected event
          </p>
        </div>

        {/* Selected Event */}
        <div className="selected-event">
          <span>Selected Event</span>
          <strong>{eventName}</strong>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="English">English</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <button type="submit" className="register-event-btn">
            Register for Event
          </button>

        </form>

        <div className="registration-back">
          <button onClick={() => navigate("/events")}>
            ← Back to Events
          </button>
        </div>

      </div>
    </div>
  );
}

export default Registrationform;