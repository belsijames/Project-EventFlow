import React from "react";
import "./Registration.css";

function Registration() {
  return (
    <div className="registration-page">

      <div className="registration-card">
        <h2>Event Registration</h2>
        <p>Register for your selected event</p>

        <form>
          <input type="text" placeholder="Full Name" required />

          <input type="email" placeholder="Email Address" required />

          <input type="tel" placeholder="Phone Number" required />

          <input
            type="text"
            placeholder="College / Institution Name"
            required
          />

          <select required>
            <option value="">Select Department</option>
            <option>CSE</option>
            <option>EEE</option>
            <option>ECE</option>
            <option>IT</option>
            <option>Other</option>
          </select>

          <select required>
            <option value="">Select Year of Study</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <select required>
            <option value="">Select Event</option>
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Hackathon</option>
            <option>Technical Event</option>
          </select>

          <select required>
            <option value="">Participation Type</option>
            <option>Individual</option>
            <option>Team</option>
          </select>

          <label className="terms">
            <input type="checkbox" required />
            I agree to the terms and conditions
          </label>

          <button type="submit">Register Now</button>
        </form>
      </div>

    </div>
  );
}

export default Registration;