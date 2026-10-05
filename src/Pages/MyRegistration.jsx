import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyRegistration.css";

function MyRegistration() {
  const navigate = useNavigate();

  const registrations = [
    {
      title: "Web Development Workshop",
      type: "Workshop",
      date: "10 October 2026",
      time: "10:00 AM - 1:00 PM",
      location: "Computer Science Department",
      icon: "💻",
    },
    {
      title: "Career Guidance",
      type: "Seminar",
      date: "15 October 2026",
      time: "11:00 AM - 1:00 PM",
      location: "Seminar Hall",
      icon: "🎓",
    },
  ];

  return (
    <div className="my-registration-page">

      {/* Navbar */}
      <nav className="registration-navbar">

        <div
          className="registration-logo"
          onClick={() => navigate("/dashboard")}
        >
          Event<span>Flow</span>
        </div>

        <ul className="registration-nav-links">
          <li onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>

          <li onClick={() => navigate("/events")}>
            Events
          </li>

          <li onClick={() => navigate("/learning")}>
            Learning Path
          </li>

          <li className="active">
            My Registration
          </li>
        </ul>

      </nav>

      {/* Page Content */}
      <main className="registration-content">

        <div className="registration-title">
          <h1>My Registration</h1>

          <p>
            View and manage the events you have registered for.
          </p>
        </div>

        {/* Registration List */}
        <div className="registration-list">

          {registrations.map((event, index) => (

            <div className="registration-item" key={index}>

              {/* Icon */}
              <div className="registration-event-icon">
                {event.icon}
              </div>

              {/* Main Information */}
              <div className="registration-main">

                <div className="registration-heading">

                  <div>
                    <span className="event-type">
                      {event.type}
                    </span>

                    <h2>{event.title}</h2>
                  </div>

                  <span className="registered-status">
                    Registered
                  </span>

                </div>

                {/* Details */}
                <div className="registration-details">

                  <div className="detail">
                    <span className="detail-label">
                      Date
                    </span>

                    <span className="detail-value">
                      {event.date}
                    </span>
                  </div>

                  <div className="detail">
                    <span className="detail-label">
                      Time
                    </span>

                    <span className="detail-value">
                      {event.time}
                    </span>
                  </div>

                  <div className="detail location-detail">
                    <span className="detail-label">
                      Location
                    </span>

                    <span className="detail-value">
                      {event.location}
                    </span>
                  </div>

                </div>

                <div className="registration-action">

                  <button
                    onClick={() => navigate("/events")}
                  >
                    View Event
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Explore Section */}
        <div className="explore-registration">

          <div>
            <h2>Discover More Events</h2>

            <p>
              Explore upcoming events and find new opportunities
              to learn, connect and grow.
            </p>
          </div>

          <button
            onClick={() => navigate("/events")}
          >
            Explore Events →
          </button>

        </div>

      </main>

    </div>
  );
}

export default MyRegistration;