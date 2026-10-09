import React, {useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./Techtalk.css";

function Techtalk() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about")
  const {eventId} = useParams();
  console.log(eventId);
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
            src="/techtalk.jpeg"
            alt="Tech Talk"
          />

          <div className="hero-tags">
            <span className="tag-purple">Tech Talk</span>
            <span className="tag-white">Workshop</span>
          </div>

        </div>


        {/* Event Title */}
        <div className="event-heading">

          <div>
            <h1>Tech Talk</h1>

            <div className="event-info">

              <span>
                📅 &nbsp;15 Oct 2026
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
    navigate("/registration/Techtalk", {
      state: { eventName: "Tech Talk 2026" }
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



        {/* About Section */}
        <div className="details-section">

          {activeTab === "about" && (
  <div className="content-grid">
    <div className="about-card">
      <div className="card-content">
        <h2>About the Event</h2>
        <p>
          Tech Talk is an interactive technical session designed to provide
          students with knowledge about modern technologies, industry trends,
          and practical development concepts.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>💻</span>
            <h3>Emerging Technologies</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Industry Insights</h3>
          </div>

          <div className="feature-card">
            <span>💡</span>
            <h3>Technical Ideas</h3>
          </div>

          <div className="feature-card">
            <span>🎓</span>
            <h3>Student Learning</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Key Highlights</h3>
        <ul>
          <li>Latest Technology Trends</li>
          <li>Expert Technical Insights</li>
          <li>Interactive Discussions</li>
          <li>Practical Knowledge</li>
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
          The session provides an engaging learning experience through
          technical discussions, real-world examples and interactive sessions.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>🎤</span>
            <h3>Expert Talk</h3>
          </div>

          <div className="feature-card">
            <span>💻</span>
            <h3>Live Demonstration</h3>
          </div>

          <div className="feature-card">
            <span>💬</span>
            <h3>Q&A Session</h3>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Networking</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>What You'll Gain</h3>
        <ul>
          <li>Understand Current Technologies</li>
          <li>Learn Industry Practices</li>
          <li>Improve Technical Knowledge</li>
          <li>Explore Career Opportunities</li>
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
          Experienced technical professionals and mentors share their
          knowledge, practical experience and insights with students.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>👨‍💻</span>
            <h3>Technical Expert</h3>
          </div>

          <div className="feature-card">
            <span>🎓</span>
            <h3>Industry Mentor</h3>
          </div>

          <div className="feature-card">
            <span>💡</span>
            <h3>Technology Specialist</h3>
          </div>

          <div className="feature-card">
            <span>🎤</span>
            <h3>Guest Speaker</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Speaker Sessions</h3>
        <ul>
          <li>Technology Insights</li>
          <li>Industry Experience</li>
          <li>Career Guidance</li>
          <li>Interactive Q&A</li>
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
          The Tech Talk session will be conducted in the Computer Science
          Department. Students are encouraged to arrive before the scheduled
          time.
        </p>

        <div className="feature-row">
          <div className="feature-card">
            <span>📍</span>
            <h3>Computer Science Department</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>10 October 2026</h3>
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
          <li>Venue: Computer Science Department</li>
          <li>Date: 10 October 2026</li>
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

export default Techtalk;