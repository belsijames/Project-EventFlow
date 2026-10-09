import React, {useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./Techtalk.css";

function CreativeMind() {
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

        {/* Header */}
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


        {/* Hero */}
        <div className="event-hero">

          <img
            src="/minds.jpeg"
            alt="Creative Mind Workshop"
          />

          <div className="hero-tags">

            <span className="tag-purple">
              Creative Mind
            </span>

            <span className="tag-white">
              Workshop
            </span>

          </div>

        </div>


        {/* Event Heading */}
        <div className="event-heading">

          <div>

            <h1>
              Creative Mind Workshop
            </h1>

            <div className="event-info">

              <span>
                📅 &nbsp;17 Oct 2026
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
        navigate("/registration/CreativeMind", {
          state: { eventName: "Creative Minds Workshop" }
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


        {/* Details */}
        <div className="details-section">

          {/* About */}
          {/* ABOUT */}
{activeTab === "about" && (
  <div className="content-grid">

    <div className="about-card">
      <div className="card-content">

        <h2>About the Event</h2>

        <p>
          Creative Mind Workshop is an engaging session designed to
          encourage students to think creatively, explore new ideas,
          solve problems and develop innovative thinking skills.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>💡</span>
            <h3>Creative Thinking</h3>
          </div>

          <div className="feature-card">
            <span>🎨</span>
            <h3>Idea Generation</h3>
          </div>

          <div className="feature-card">
            <span>🧠</span>
            <h3>Problem Solving</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Innovation</h3>
          </div>

        </div>

      </div>
    </div>


    <div className="highlight-card">
      <div className="card-content">

        <h3>Key Highlights</h3>

        <ul>
          <li>Creative Thinking Activities</li>
          <li>Innovative Idea Development</li>
          <li>Problem Solving Challenges</li>
          <li>Interactive Team Activities</li>
        </ul>

      </div>
    </div>

  </div>
)}


{/* HIGHLIGHTS */}
{activeTab === "highlights" && (
  <div className="content-grid">

    <div className="about-card">
      <div className="card-content">

        <h2>Event Highlights</h2>

        <p>
          The workshop provides practical activities and interactive
          challenges that help students explore their creativity and
          develop innovative solutions.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>🧩</span>
            <h3>Creative Challenges</h3>
          </div>

          <div className="feature-card">
            <span>💭</span>
            <h3>Idea Sharing</h3>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Team Activities</h3>
          </div>

          <div className="feature-card">
            <span>🏆</span>
            <h3>Innovation Tasks</h3>
          </div>

        </div>

      </div>
    </div>


    <div className="highlight-card">
      <div className="card-content">

        <h3>What You'll Gain</h3>

        <ul>
          <li>Improve Creative Thinking</li>
          <li>Develop New Ideas</li>
          <li>Build Problem-Solving Skills</li>
          <li>Improve Team Collaboration</li>
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
          The workshop includes engaging activities that encourage students
          to think creatively, share ideas, work as a team and develop
          innovative solutions to real-world challenges.
        </p>

        <div className="feature-row">
          
          <div className="feature-card">
            <span>💡</span>
            <h3>Idea Generation</h3>
          </div>

          <div className="feature-card">
            <span>🧩</span>
            <h3>Creative Challenges</h3>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Team Activities</h3>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Innovation Tasks</h3>
          </div>

        </div>
      </div>
    </div>

    <div className="highlight-card">
      <div className="card-content">
        <h3>Activity Highlights</h3>

        <ul>
          <li>Brainstorming Sessions</li>
          <li>Creative Problem-Solving</li>
          <li>Team-Based Challenges</li>
          <li>Innovative Idea Presentation</li>
        </ul>
      </div>
    </div>

  </div>
)}


{/* LOCATION */}
{activeTab === "location" && (
  <div className="content-grid">

    <div className="about-card">
      <div className="card-content">

        <h2>Event Location</h2>

        <p>
          The Creative Mind Workshop will be conducted in the Seminar
          Hall. Students are encouraged to arrive before the scheduled
          time and actively participate in the workshop activities.
        </p>

        <div className="feature-row">

          <div className="feature-card">
            <span>📍</span>
            <h3>Seminar Hall</h3>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>18 October 2026</h3>
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
          <li>Date: 18 October 2026</li>
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

export default CreativeMind;