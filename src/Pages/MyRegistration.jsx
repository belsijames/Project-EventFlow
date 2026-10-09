import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MyRegistration.css";

function MyRegistration() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/my-registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Event image
  const getEventImage = (eventName) => {
    if (eventName.includes("Web Development")) {
      return "/bootcamp.jpeg";
    }

    if (eventName.includes("Tech Talk")) {
      return "/techtalk.jpeg";
    }

    if (eventName.includes("Creative Mind")) {
      return "/mind.jpeg";
    }

    if (eventName.includes("Career")) {
      return "/Career.jpeg";
    }

    if (eventName.includes("Science")) {
      return "/innovation.jpeg";
    }

    if (eventName.includes("Communication")) {
      return "/communication.jpeg";
    }

    return "/images/default-event.jpg";
  };

  // Event date and time
  const getEventDetails = (eventName) => {
    if (eventName.includes("Web Development")) {
      return {
        date: "20 Oct 2026",
        time: "10:00 AM - 4:00 PM"
      };
    }

    if (eventName.includes("Tech Talk")) {
      return {
        date: "10 Oct 2026",
        time: "10:00 AM - 1:00 PM"
      };
    }

    if (eventName.includes("Creative Mind")) {
      return {
        date: "18 Oct 2026",
        time: "10:00 AM - 1:00 PM"
      };
    }

    if (eventName.includes("Career")) {
      return {
        date: "22 Oct 2026",
        time: "10:00 AM - 12:00 PM"
      };
    }

    if (eventName.includes("Science")) {
      return {
        date: "25 Oct 2026",
        time: "10:00 AM - 3:00 PM"
      };
    }

    if (eventName.includes("Communication")) {
      return {
        date: "28 Oct 2026",
        time: "10:00 AM - 1:00 PM"
      };
    }

    return {
      date: "Date not available",
      time: "Time not available"
    };
  };

  const handleViewDetails = (eventName) => {
    if (eventName.includes("Web Development")) {
      navigate("/webdevelopment");
    } else if (eventName.includes("Tech Talk")) {
      navigate("/techtalk");
    } else if (eventName.includes("Creative Mind")) {
      navigate("/creativemind");
    } else if (eventName.includes("Career")) {
      navigate("/careerguidance");
    } else if (eventName.includes("Science")) {
      navigate("/scienceexpo");
    } else if (eventName.includes("Communication")) {
      navigate("/communicationskills");
    }
  };


  const eventImages = {
  "Tech Talk 2026": "/techtalk.jpeg",
  "Creative Minds Workshop": "/creative.jpeg",
  "Web Development Bootcamp": "/bootcamp.jpeg",
  "Career Guidance": "/Career.jpeg",
  "Science and Innovation Expo": "/innovation.jpeg",
  "Communication Skills Workshop": "/communication.jpeg"
};


  return (
    <div className="my-registration-container">

      {/* SIDEBAR */}
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
     
                         <Link to="/myregistration" className="ef-nav-item active">
                             <span className="ef-nav-icon">◷</span>
                             <span>My Registration</span>
                         </Link>
     
                         <Link to="/profile" className="ef-nav-item">
                             <span className="ef-nav-icon">♙</span>
                             <span>Profile</span>
                         </Link>
     
                     </nav>
     
                 </aside>

      {/* MAIN CONTENT */}
      <main className="registration-main">

        {/* TOP HEADER */}
        <div className="registration-topbar">

          <div></div>

          <div className="user-area">

            <span className="notification-icon">
              ♧
            </span>

            <div className="profile-circle">
              B
            </div>

            <span className="user-name">
              Belsi
            </span>

            <span className="dropdown-icon">
              ▾
            </span>

          </div>

        </div>

        {/* PAGE TITLE */}
        <div className="registration-title">

          <h1>My Registrations</h1>

          <p>
            View and manage your registered events
          </p>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="registration-loading">
            Loading your registrations...
          </div>
        )}

        {/* NO REGISTRATION */}
        {!loading && registrations.length === 0 && (
          <div className="empty-registration">
            <h2>No Registrations Yet</h2>
            <p>
              You have not registered for any event yet.
            </p>
          </div>
        )}

        {/* EVENT LIST */}
        {!loading && registrations.length > 0 && (

          <div className="registered-events">

            {registrations.map((registration) => {

              const eventDetails =
                getEventDetails(registration.event_name);

              return (
                <div
                  className="registered-event-card"
                  key={registration.id}
                >

                  {/* IMAGE */}
                 <img
  src={eventImages[registration.event_name]}
  alt={registration.event_name}
  className="registered-event-image"
/>

                  {/* EVENT INFO */}
                  <div className="registered-event-info">

                    <h2>
                      {registration.event_name}
                    </h2>

                    <p className="event-date-time">
                      {eventDetails.date}
                      <span>•</span>
                      {eventDetails.time}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div className="event-status">
                    <span className="confirmed-status">
                      Confirmed
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="view-registration-btn"
                    onClick={() =>
                      handleViewDetails(
                        registration.event_name
                      )
                    }
                  >
                    View Details
                  </button>

                </div>
              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyRegistration;