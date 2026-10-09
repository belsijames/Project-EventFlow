import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      <aside className="ef-sidebar">
     
                     <div className="ef-brand">
                         <div className="ef-brand-icon">◆</div>
                         <span>EventFlow</span>
                     </div>
     
                     <nav className="ef-navigation">
     
                         <Link to="/dashboard" className="ef-nav-item">
                             <span className="ef-nav-icon">⌂</span>
                             <span>Dashboard</span>
                         </Link>
     
                         <Link to="/events" className="ef-nav-item">
                             <span className="ef-nav-icon">▣</span>
                             <span>Events</span>
                         </Link>
     
                         <Link to="/learning" className="ef-nav-item">
                             <span className="ef-nav-icon">▤</span>
                             <span>Learning Path</span>
                         </Link>
     
                         <Link to="/myregistration" className="ef-nav-item">
                             <span className="ef-nav-icon">◷</span>
                             <span>My Registration</span>
                         </Link>
     
                         <Link to="/profile" className="ef-nav-item active">
                             <span className="ef-nav-icon">♙</span>
                             <span>Profile</span>
                         </Link>
     
                     </nav>
     
                 </aside>
      <main className="profile-content">

        <div className="profile-title">
          <h1>My Profile</h1>
          <p>
            Manage your profile and view your learning activity.
          </p>
        </div>

        <section className="profile-card">

          <div className="profile-avatar">
            <img src="profile.jpg"/>
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


        <div className="profile-grid">

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