import React, {useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./Techtalk.css";

function ScienceExpo() {
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
            src="/innovation.jpeg"
            alt="Science and Innovation Expo"
          />

          <div className="hero-tags">

            <span className="tag-purple">
              Science & Innovation
            </span>

            <span className="tag-white">
              Expo
            </span>

          </div>

        </div>


        {/* Event Title */}
        <div className="event-heading">

          <div>

            <h1>Science and Innovation Expo</h1>

            <div className="event-info">

              <span>
                📅 &nbsp;25 Oct 2026
              </span>

              <span>
                🕐 &nbsp;10:00 AM – 3:00 PM
              </span>

              <span>
                📍 &nbsp;College Auditorium
              </span>

            </div>

          </div>


          <div className="event-actions">

            <button className="register-btn"
      onClick={() =>
        navigate("/registration/ScienceExpo", {
          state: { eventName: "Science and Innovation Expo" }
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
    className={`tab ${activeTab === "projects" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("projects")}
  >
    Projects
  </div>

  <div
    className={`tab ${activeTab === "location" ? "active-tab" : ""}`}
    onClick={() => setActiveTab("location")}
  >
    Location
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
          Science & Innovation Expo is an educational exhibition that
          provides students with an opportunity to present creative
          scientific ideas, innovative projects and emerging technologies
          through interactive demonstrations.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🔬</span>
            <h3>Science Projects</h3>
          </div>

          <div className="feature-card">
            <span>💡</span>
            <h3>Innovative Ideas</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>New Technologies</h3>
          </div>

          <div className="feature-card">
            <span>🏆</span>
            <h3>Project Showcase</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Key Highlights</h3>

        <ul>
          <li>Student Innovation Projects</li>
          <li>Scientific Demonstrations</li>
          <li>Emerging Technology Showcase</li>
          <li>Interactive Project Exhibition</li>
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
          The expo brings together creative student projects, scientific
          experiments and innovative technology demonstrations in an
          engaging learning environment.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🧪</span>
            <h3>Live Experiments</h3>
          </div>

          <div className="feature-card">
            <span>🤖</span>
            <h3>Smart Technology</h3>
          </div>

          <div className="feature-card">
            <span>💡</span>
            <h3>Innovation Showcase</h3>
          </div>

          <div className="feature-card">
            <span>🎤</span>
            <h3>Project Presentation</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>What You'll Experience</h3>

        <ul>
          <li>Explore Innovative Projects</li>
          <li>Watch Scientific Demonstrations</li>
          <li>Learn About Emerging Technologies</li>
          <li>Interact With Student Innovators</li>
        </ul>
      </div>
    </div>
  </div>
)}


{activeTab === "projects" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>Featured Projects</h2>

        <p>
          Students will showcase innovative projects that demonstrate
          scientific concepts, creative problem-solving and the practical
          application of modern technologies.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🤖</span>
            <h3>Robotics Projects</h3>
          </div>

          <div className="feature-card">
            <span>🌱</span>
            <h3>Smart Agriculture</h3>
          </div>

          <div className="feature-card">
            <span>⚡</span>
            <h3>Green Technology</h3>
          </div>

          <div className="feature-card">
            <span>💻</span>
            <h3>Technology Projects</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Project Activities</h3>

        <ul>
          <li>Project Demonstrations</li>
          <li>Working Model Exhibition</li>
          <li>Innovation Presentations</li>
          <li>Project Evaluation</li>
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
          The Science & Innovation Expo will be conducted in the College
          Auditorium. Students and visitors can explore the displayed
          projects and participate in the exhibition activities.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>📍</span>
            <h3>College Auditorium</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>25 October 2026</h3>
          </div>

          <div className="feature-card">
            <span>⏰</span>
            <h3>10:00 AM – 3:00 PM</h3>
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
          <li>Venue: College Auditorium</li>
          <li>Date: 25 October 2026</li>
          <li>Time: 10:00 AM – 3:00 PM</li>
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

export default ScienceExpo;