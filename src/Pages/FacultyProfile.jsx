
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";
import "./FacultyProfile.css";

const defaultProfile = {
  name: "Faculty Member",
  email: "",
  phone: "",
  department: "Computer Science",
  designation: "Assistant Professor",
  employeeId: "",
  qualification: "",
  bio: "",
};

function FacultyProfile() {
  const navigate = useNavigate();

  const getSavedProfile = () => {
    try {
      const saved = localStorage.getItem("facultyProfile");
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  };

  const [profile, setProfile] = useState(getSavedProfile);
  const [formData, setFormData] = useState(getSavedProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setFormData({ ...profile });
    setEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setEditing(false);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Please enter your name and email address.");
      return;
    }

    const updatedProfile = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    localStorage.setItem("facultyProfile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setFormData(updatedProfile);
    setEditing(false);
    setMessage("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "FM";

  return (
    <div className="faculty-layout">
      <aside className="faculty-sidebar">
        <div className="faculty-brand">
          <div className="faculty-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <p>Faculty Portal</p>
          </div>
        </div>

        <p className="faculty-menu-title">MAIN MENU</p>

        <nav className="faculty-navigation">
          <button type="button" onClick={() => navigate("/faculty")}>
            <span>▦</span><span>Dashboard</span>
          </button>
          <button type="button" onClick={() => navigate("/faculty/events")}>
            <span>▣</span><span>Manage Events</span>
          </button>
          <button type="button" onClick={() => navigate("/faculty/registrations")}>
            <span>☷</span><span>Registrations</span>
          </button>
          <button type="button" onClick={() => navigate("/faculty/quizzes")}>
            <span>✎</span><span>Manage Quizzes</span>
          </button>
          <button type="button" onClick={() => navigate("/faculty/results")}>
            <span>▤</span><span>Quiz Results</span>
          </button>
          <button
            type="button"
            className="active"
            onClick={() => navigate("/faculty/profile")}
          >
            <span>♙</span><span>My Profile</span>
          </button>
        </nav>

        <div className="faculty-sidebar-bottom">
          <div className="faculty-sidebar-note">
            <span>✦</span>
            <p>Empowering learning through events.</p>
          </div>
          <button className="faculty-logout" type="button" onClick={handleLogout}>
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      <main className="faculty-main faculty-profile-main">
        <header className="faculty-topbar">
          <div>
            <h2>My Profile</h2>
            <p>Manage your personal and professional information</p>
          </div>
          <div className="faculty-topbar-user">
            <div className="faculty-avatar">{initials}</div>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.designation}</span>
            </div>
          </div>
        </header>

        <div className="faculty-profile-content">
          <div className="faculty-profile-breadcrumb">
            <span onClick={() => navigate("/faculty")}>Dashboard</span>
            <span> / </span>
            <strong>My Profile</strong>
          </div>

          <section className="faculty-profile-hero">
            <div className="faculty-profile-hero-decoration decoration-one" />
            <div className="faculty-profile-hero-decoration decoration-two" />

            <div className="faculty-profile-hero-content">
              <div className="faculty-profile-large-avatar">{initials}</div>

              <div className="faculty-profile-identity">
                <span className="faculty-profile-eyebrow">
                  FACULTY MEMBER
                </span>
                <h1>{profile.name}</h1>
                <p>{profile.designation}</p>
                <div className="faculty-profile-tags">
                  <span>✦ {profile.department}</span>
                  <span>✓ Faculty Account</span>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  className="faculty-profile-edit-button"
                  onClick={handleEdit}
                >
                  ✎ Edit Profile
                </button>
              )}
            </div>
            <div className="faculty-profile-hero-footer">
              <span>EVENTFLOW</span>
              <span>Faculty Workspace · Personal Information</span>
            </div>
          </section>

          {message && (
            <div
              className={`faculty-profile-message ${
                message.includes("successfully") ? "success" : "error"
              }`}
              role="status"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="faculty-profile-section-heading">
              <div>
                <span className="faculty-profile-section-label">
                  YOUR ACCOUNT
                </span>
                <h2>Personal Information</h2>
                <p>Keep your contact details up to date.</p>
              </div>
              <span className="faculty-profile-section-icon">♙</span>
            </div>

            <section className="faculty-profile-card">
              <div className="faculty-profile-card-heading">
                <div className="faculty-profile-card-icon">♧</div>
                <div>
                  <h3>Basic Details</h3>
                  <p>Your identity and contact information</p>
                </div>
              </div>

              <div className="faculty-profile-form-grid">
                <div className="faculty-profile-field">
                  <label htmlFor="faculty-name">Full Name <span>*</span></label>
                  <input
                    id="faculty-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="faculty-profile-field">
                  <label htmlFor="faculty-email">Email Address <span>*</span></label>
                  <input
                    id="faculty-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    placeholder="faculty@example.com"
                  />
                </div>

                <div className="faculty-profile-field">
                  <label htmlFor="faculty-phone">Phone Number</label>
                  <input
                    id="faculty-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="faculty-profile-field">
                  <label htmlFor="faculty-employee-id">Employee ID</label>
                  <input
                    id="faculty-employee-id"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>
            </section>

            <div className="faculty-profile-section-heading faculty-profile-professional-heading">
              <div>
                <span className="faculty-profile-section-label">
                  WORK INFORMATION
                </span>
                <h2>Professional Details</h2>
                <p>Your department and academic qualifications.</p>
              </div>
              <span className="faculty-profile-section-icon">✧</span>
            </div>

            <section className="faculty-profile-card">
              <div className="faculty-profile-card-heading">
                <div className="faculty-profile-card-icon">✧</div>
                <div>
                  <h3>Academic Information</h3>
                  <p>Your professional background</p>
                </div>
              </div>

              <div className="faculty-profile-form-grid">
                <div className="faculty-profile-field">
                  <label htmlFor="faculty-department">Department</label>
                  <select
                    id="faculty-department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!editing}
                  >
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Electronics and Communication</option>
                    <option>Electrical Engineering</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Commerce</option>
                  </select>
                </div>

                <div className="faculty-profile-field">
                  <label htmlFor="faculty-designation">Designation</label>
                  <select
                    id="faculty-designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    disabled={!editing}
                  >
                    <option>Assistant Professor</option>
                    <option>Associate Professor</option>
                    <option>Professor</option>
                    <option>Lecturer</option>
                    <option>Guest Faculty</option>
                  </select>
                </div>

                <div className="faculty-profile-field faculty-profile-full-width">
                  <label htmlFor="faculty-qualification">
                    Highest Qualification
                  </label>
                  <input
                    id="faculty-qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="e.g. M.Sc., M.Phil., Ph.D."
                  />
                </div>

                <div className="faculty-profile-field faculty-profile-full-width">
                  <label htmlFor="faculty-bio">About Me</label>
                  <textarea
                    id="faculty-bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!editing}
                    rows="4"
                    placeholder="Write a short professional introduction..."
                  />
                </div>
              </div>
            </section>

            {editing && (
              <div className="faculty-profile-form-actions">
                <button
                  type="button"
                  className="faculty-profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="faculty-profile-save-button"
                >
                  ✓ Save Changes
                </button>
              </div>
            )}
          </form>

          <footer className="faculty-profile-footer">
            <span>EventFlow Faculty Portal</span>
            <span>Smart Educational Event Management</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default FacultyProfile;

