import React, {useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./Techtalk.css";

function WebDevelopment() {
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

            <span className="profile-circle">
              👤
            </span>

            <span>⌄</span>

          </div>

        </div>


        {/* Hero Image */}
        <div className="event-hero">

          <img
            src="/bootcamp.jpeg"
            alt="Web Development Bootcamp"
          />

          <div className="hero-tags">

            <span className="tag-purple">
              Web Development
            </span>

            <span className="tag-white">
              Bootcamp
            </span>

          </div>

        </div>


        {/* Event Title */}
        <div className="event-heading">

          <div>

            <h1>Web Development Bootcamp</h1>

            <div className="event-info">

              <span>
                📅 &nbsp;20 Oct 2026
              </span>

              <span>
                🕐 &nbsp;10:00 AM – 4:00 PM
              </span>

              <span>
                📍 &nbsp;Computer Science Department
              </span>

            </div>

          </div>


          <div className="event-actions">

            
    <button className="register-btn"
      onClick={() =>
        navigate("/registration/WebDevelopment", {
          state: { eventName: "Web Development Bootcamp" }
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
          Web Development Bootcamp is a practical learning session designed
          to help students understand modern web development concepts and
          build interactive websites using essential frontend and backend
          technologies.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🌐</span>
            <h3>Frontend Development</h3>
          </div>

          <div className="feature-card">
            <span>⚛️</span>
            <h3>React.js</h3>
          </div>

          <div className="feature-card">
            <span>🖥️</span>
            <h3>Backend Basics</h3>
          </div>

          <div className="feature-card">
            <span>💻</span>
            <h3>Hands-on Project</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Key Highlights</h3>
        <ul>
          <li>Hands-on Coding Sessions</li>
          <li>HTML, CSS & JavaScript</li>
          <li>React.js Introduction</li>
          <li>Real-world Project Experience</li>
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
          The bootcamp provides an interactive learning experience through
          coding demonstrations, practical exercises and project-based
          development activities.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>💻</span>
            <h3>Live Coding</h3>
          </div>

          <div className="feature-card">
            <span>🎨</span>
            <h3>UI Development</h3>
          </div>

          <div className="feature-card">
            <span>⚛️</span>
            <h3>React Practice</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Project Building</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>What You'll Gain</h3>
        <ul>
          <li>Build Responsive Websites</li>
          <li>Understand Modern Web Technologies</li>
          <li>Improve Coding Skills</li>
          <li>Gain Practical Project Experience</li>
        </ul>
      </div>
    </div>
  </div>
)}

{activeTab === "activities" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>Bootcamp Activities</h2>

        <p>
          Students will participate in practical coding activities,
          development challenges and project-based tasks to apply their
          web development knowledge.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>📝</span>
            <h3>HTML & CSS Practice</h3>
          </div>

          <div className="feature-card">
            <span>⚡</span>
            <h3>JavaScript Tasks</h3>
          </div>

          <div className="feature-card">
            <span>⚛️</span>
            <h3>React Activities</h3>
          </div>

          <div className="feature-card">
            <span>🛠️</span>
            <h3>Mini Project</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Activity Highlights</h3>
        <ul>
          <li>Website Development Tasks</li>
          <li>Interactive Coding Exercises</li>
          <li>Frontend Design Challenges</li>
          <li>Mini Project Development</li>
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
          The Web Development Bootcamp will be conducted in the Computer
          Science Department. Participants are encouraged to arrive before
          the scheduled time and bring their learning materials.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>📍</span>
            <h3>Computer Science Department</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>20 October 2026</h3>
          </div>

          <div className="feature-card">
            <span>⏰</span>
            <h3>10:00 AM – 4:00 PM</h3>
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
          <li>Venue: Computer Science Department</li>
          <li>Date: 20 October 2026</li>
          <li>Time: 10:00 AM – 4:00 PM</li>
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

export default WebDevelopment;