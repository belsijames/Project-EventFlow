import React, {useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./Techtalk.css";

function CareerGuidance() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about")
  return (
    <div className="techtalk-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>Event<span>Flow</span></span>
        </div>

        <ul className="side-menu">

          <li>
                     <Link to="/dashboard">
                       <span>⌂</span> Dashboard
                     </Link>
                   </li>
         
                   <li className="active">
                     <Link to="/events">
                       <span>▣</span> Events
                     </Link>
                   </li>
         
                   <li>
                     <Link to="/learning">
                       <span>▤</span> Learning Path
                     </Link>
                   </li>
         
                   <li>
                     <Link to="/MyRegistration">
                       <span>♧</span> My Registration
                     </Link>
                   </li>
         
                   <li>
                     <Link to="/Profile">
                       <span>♙</span> Profile
                     </Link>
                   </li>
        </ul>

    

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Top Header */}
        <div className="top-header">

          <Link to="/events" className="back-events">
            ← &nbsp; Back to Events
          </Link>

          <div className="header-icons">
            <span>🔔</span>
            <span className="profile-circle">👤</span>
            <span>⌄</span>
          </div>

        </div>


        {/* Hero Image */}
        <div className="event-hero">

          <img
            src="/Career.jpeg"
            alt="Career Guidance Session"
          />

          <div className="hero-tags">

            <span className="tag-purple">
              Career Guidance
            </span>

            <span className="tag-white">
              Session
            </span>

          </div>

        </div>


        {/* Event Title */}
        <div className="event-heading">

          <div>

            <h1>Career Guidance Session</h1>

            <div className="event-info">

              <span>
                📅 &nbsp;22 Oct 2026
              </span>

              <span>
                🕐 &nbsp;10:00 AM – 12:00 PM
              </span>

              <span>
                📍 &nbsp;Seminar Hall
              </span>

            </div>

          </div>


          <div className="event-actions">

             <button className="register-btn"
      onClick={() =>
        navigate("/registration/CareerGuidance", {
          state: { eventName: "Career Guidance" }
        })
      }
    >
      Register Now
    </button>
            <button className="heart-btn">
              ♡
            </button>

          </div>

        </div>


        {/* Tabs */}
        <div className="tabs">

          <div className="tabs">
  <div
    className={`tab ${activeTab === "about" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("about")}
  >
    About
  </div>

  <div
    className={`tab ${activeTab === "highlights" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("highlights")}
  >
    Highlights
  </div>

  <div
  className={`tab ${activeTab === "speakers" ? "active-tab" : ""}`}
  onClick={() => setActiveTab("speakers")}
>
  Speakers
</div>

  <div
    className={`tab ${activeTab === "location" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("location")}
  >
    Location
  </div>
</div>

        </div>


        {/* About Section */}
        <div className="details-section">

          {activeTab === "about" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>About the Event</h2>

        <p>
          Career Guidance is an informative session designed to help
          students understand different career opportunities, identify
          suitable career paths and develop the skills required for their
          future professional journey.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🎯</span>
            <h3>Career Planning</h3>
          </div>

          <div className="feature-card">
            <span>💼</span>
            <h3>Industry Insights</h3>
          </div>

          <div className="feature-card">
            <span>🛤️</span>
            <h3>Career Paths</h3>
          </div>

          <div className="feature-card">
            <span>🏆</span>
            <h3>Skill Development</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Key Highlights</h3>
        <ul>
          <li>Expert Career Guidance</li>
          <li>Industry Opportunities</li>
          <li>Resume & Skill Development</li>
          <li>Interactive Q&A Session</li>
        </ul>
      </div>
    </div>
  </div>
)}

{activeTab === "highlights" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>Event Highlights</h2>

        <p>
          The session provides practical career insights, expert advice
          and useful guidance to help students make informed decisions
          about their education and future career opportunities.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>💡</span>
            <h3>Expert Advice</h3>
          </div>

          <div className="feature-card">
            <span>📈</span>
            <h3>Career Growth</h3>
          </div>

          <div className="feature-card">
            <span>📄</span>
            <h3>Resume Tips</h3>
          </div>

          <div className="feature-card">
            <span>🎓</span>
            <h3>Higher Studies</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>What You'll Gain</h3>
        <ul>
          <li>Understand Career Opportunities</li>
          <li>Identify Suitable Career Paths</li>
          <li>Improve Professional Skills</li>
          <li>Make Better Career Decisions</li>
        </ul>
      </div>
    </div>
  </div>
)}

{activeTab === "speakers" && (
  <div className="content-grid">

    <div className="about-card">
      <div className="card-content">
        <h2>Our Speakers</h2>

        <p>
          Experienced professionals and career mentors will share their
          industry knowledge, career experiences and practical guidance
          to help students prepare for their future careers.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>👨‍💼</span>
            <h3>Industry Expert</h3>
          </div>

          <div className="feature-card">
            <span>🎓</span>
            <h3>Career Mentor</h3>
          </div>

          <div className="feature-card">
            <span>💼</span>
            <h3>HR Professional</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Career Coach</h3>
          </div>

        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Speaker Sessions</h3>

        <ul>
          <li>Industry Career Insights</li>
          <li>Professional Skill Guidance</li>
          <li>Resume & Interview Tips</li>
          <li>Interactive Q&A Session</li>
        </ul>
      </div>
    </div>

  </div>
)}

{activeTab === "location" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>Event Location</h2>

        <p>
          The Career Guidance session will be conducted in the Seminar
          Hall. Students are encouraged to arrive before the scheduled
          time and actively participate in the session.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>📍</span>
            <h3>Seminar Hall</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>22 October 2026</h3>
          </div>

          <div className="feature-card">
            <span>⏰</span>
            <h3>10:00 AM – 12:00 PM</h3>
          </div>

          <div className="feature-card">
            <span>🎓</span>
            <h3>College Campus</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Event Details</h3>
        <ul>
          <li>Venue: Seminar Hall</li>
          <li>Date: 22 October 2026</li>
          <li>Time: 10:00 AM – 12:00 PM</li>
          <li>Open for Students</li>
        </ul>
      </div>
    </div>
  </div>
)}
</div>

      </main>

    </div>
  );
}

export default CareerGuidance;