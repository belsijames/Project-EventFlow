import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      {/* Navbar */}
      <nav className="profile-navbar">

        <div
          className="profile-logo"
          onClick={() => navigate("/dashboard")}
        >
          Event<span>Flow</span>
        </div>

        <ul className="profile-nav-links">
          <li onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>

          <li onClick={() => navigate("/events")}>
            Events
          </li>

          <li onClick={() => navigate("/learning")}>
            Learning Path
          </li>

          <li onClick={() => navigate("/my-registration")}>
            My Registration
          </li>

          <li className="active">
            Profile
          </li>
        </ul>

      </nav>

      {/* Content */}
      <main className="profile-content">

        <div className="profile-title">
          <h1>My Profile</h1>
          <p>
            Manage your profile and view your learning activity.
          </p>
        </div>

        {/* Profile Top Card */}
        <section className="profile-card">

          <div className="profile-avatar">
            <span>JM</span>
          </div>

          <div className="profile-main-info">
            <h2>J. Mary Belsi</h2>

            <p className="profile-role">
              B.Sc. Computer Science Student
            </p>

            <p className="profile-college">
              Immaculate College for Women
            </p>
          </div>

          <button className="edit-profile-btn">
            Edit Profile
          </button>

        </section>

        {/* Main Grid */}
        <div className="profile-grid">

          {/* Personal Information */}
          <section className="profile-section">

            <div className="section-heading">
              <h2>Personal Information</h2>
            </div>

            <div className="information-grid">

              <div className="information-item">
                <span>Name</span>
                <strong>J. Mary Belsi</strong>
              </div>

              <div className="information-item">
                <span>Email</span>
                <strong>marybelsi@example.com</strong>
              </div>

              <div className="information-item">
                <span>Department</span>
                <strong>Computer Science</strong>
              </div>

              <div className="information-item">
                <span>Year</span>
                <strong>Final Year</strong>
              </div>

            </div>

          </section>

          {/* Academic Information */}
          <section className="profile-section">

            <div className="section-heading">
              <h2>Academic Information</h2>
            </div>

            <div className="information-grid">

              <div className="information-item">
                <span>Course</span>
                <strong>B.Sc. Computer Science</strong>
              </div>

              <div className="information-item">
                <span>Area of Interest</span>
                <strong>MERN & Full Stack Development</strong>
              </div>

              <div className="information-item">
                <span>Learning Mode</span>
                <strong>Online & Self Learning</strong>
              </div>

              <div className="information-item">
                <span>Skill Level</span>
                <strong>Intermediate</strong>
              </div>

            </div>

          </section>

        </div>

        {/* Activity */}
        <section className="profile-activity">

          <h2>My Activity</h2>

          <div className="activity-cards">

            <div className="activity-card">
              <div className="activity-icon">🎓</div>
              <div>
                <h3>05</h3>
                <p>Registered Events</p>
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-icon">📚</div>
              <div>
                <h3>05</h3>
                <p>Learning Topics</p>
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-icon">🏆</div>
              <div>
                <h3>80%</h3>
                <p>Quiz Performance</p>
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-icon">⭐</div>
              <div>
                <h3>12</h3>
                <p>Completed Activities</p>
              </div>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;