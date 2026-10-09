import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Techtalk.css";

function CommunicationSkills() {
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
            src="/communication.jpeg"
            alt="Communication Skills Workshop"
          />

          <div className="hero-tags">

            <span className="tag-purple">
              Communication Skills
            </span>

            <span className="tag-white">
              Workshop
            </span>

          </div>

        </div>


        {/* Event Title */}
        <div className="event-heading">

          <div>

            <h1>Communication Skills Workshop</h1>

            <div className="event-info">

              <span>
                📅 &nbsp;28 Oct 2026
              </span>

              <span>
                🕐 &nbsp;10:00 AM – 1:00 PM
              </span>

              <span>
                📍 &nbsp;Seminar Hall
              </span>

            </div>

          </div>


          <div className="event-actions">

 <button className="register-btn"
      onClick={() =>
        navigate("/registration/CommunicationSkills", {
          state: { eventName: "Communication Skills Workshop" }
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
    className={`tab ${activeTab === "activities" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("activities")}
  >
    Activities
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
          Communication Skills Workshop is an interactive session designed
          to help students improve their communication abilities, build
          confidence, express ideas clearly and develop effective
          interpersonal skills.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>🎤</span>
            <h3>Public Speaking</h3>
          </div>

          <div className="feature-card">
            <span>💬</span>
            <h3>Effective Communication</h3>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Team Interaction</h3>
          </div>

          <div className="feature-card">
            <span>🎯</span>
            <h3>Confidence Building</h3>
          </div>

        </div>

      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">

        <h3>Key Highlights</h3>

        <ul>
          <li>Public Speaking Activities</li>
          <li>Interactive Communication Games</li>
          <li>Team Building Activities</li>
          <li>Confidence Building Session</li>
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
          The workshop provides practical activities and interactive
          sessions that help students communicate confidently, improve
          their speaking abilities and develop better interpersonal skills.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>🎙️</span>
            <h3>Speaking Practice</h3>
          </div>

          <div className="feature-card">
            <span>👥</span>
            <h3>Group Discussion</h3>
          </div>

          <div className="feature-card">
            <span>💡</span>
            <h3>Idea Expression</h3>
          </div>

          <div className="feature-card">
            <span>🌟</span>
            <h3>Confidence Skills</h3>
          </div>

        </div>

      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">

        <h3>What You'll Gain</h3>

        <ul>
          <li>Improve Speaking Skills</li>
          <li>Communicate Ideas Clearly</li>
          <li>Build Self-Confidence</li>
          <li>Improve Team Interaction</li>
        </ul>

      </div>
    </div>

  </div>
)}


{activeTab === "activities" && (
  <div className="content-grid">

    <div className="about-card">
      <div className="card-content">

        <h2>Workshop Activities</h2>

        <p>
          Students will participate in engaging communication activities
          that provide practical experience in speaking, listening,
          teamwork and expressing ideas effectively.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>🎤</span>
            <h3>Public Speaking</h3>
          </div>

          <div className="feature-card">
            <span>🗣️</span>
            <h3>Group Discussion</h3>
          </div>

          <div className="feature-card">
            <span>🎭</span>
            <h3>Role Play</h3>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Team Activities</h3>
          </div>

        </div>

      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">

        <h3>Activity Highlights</h3>

        <ul>
          <li>Public Speaking Practice</li>
          <li>Group Discussion Sessions</li>
          <li>Role Play Activities</li>
          <li>Team Communication Challenges</li>
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
          The Communication Skills Workshop will be conducted in the
          Seminar Hall. Students are encouraged to arrive before the
          scheduled time and actively participate in all workshop
          activities.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>📍</span>
            <h3>Seminar Hall</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>28 October 2026</h3>
          </div>

          <div className="feature-card">
            <span>⏰</span>
            <h3>10:00 AM – 1:00 PM</h3>
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
          <li>Date: 28 October 2026</li>
          <li>Time: 10:00 AM – 1:00 PM</li>
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

export default CommunicationSkills;