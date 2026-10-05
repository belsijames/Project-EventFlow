import React from "react";
import "./CareerGuidance.css";

function CareerGuidance() {
  return (
    <>
    <div className="body">
    <div className="navbar5">

                <div class="nav-card" style={{ width: "13rem" }}>
                    <ul class="sidebar">
                        <h1>EventFlow</h1>
                        <li className="list-group-item" onClick={()=> window.location.href='/Dashboard'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                            </svg>Dashboard</li>
                        <li className="list-group-item" onClick={() => window.location.href = "/Events"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>Events</li>
                        <li className="list-group-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-medical" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v.634l.549-.317a.5.5 0 1 1 .5.866L9 6l.549.317a.5.5 0 1 1-.5.866L8.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L7 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5A.5.5 0 0 1 8 4M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                            </svg>My Registrations</li>
                        <li className="list-group-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>Profile</li>
                    </ul>
                </div>
                <p className="logout" style={{marginTop:"420px"}}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>Logout</p>
            </div>
    <div className="career-page">

      <div className="career-card">

        <img src="/Career.jpeg"  alt="Career Guidance"  className="career-image" />

        <div className="career-content">

          <button  className="career-back" onClick={() => window.history.back()} >
            ← Back to Events
          </button>

          <h1>Career Guidance Session</h1>

          <div className="career-tags">
            <span>Career Guidance</span>
            <span>Free</span>
          </div>

          <div className="career-details">

            <div className="career-detail">
              <span>📅</span>
              <div>
                <small>Date</small>
                <p>30 October 2026</p>
              </div>
            </div>

            <div className="career-detail">
              <span>⏰</span>
              <div>
                <small>Time</small>
                <p>10:00 AM - 12:00 PM</p>
              </div>
            </div>

            <div className="career-detail">
              <span>📍</span>
              <div>
                <small>Venue</small>
                <p>College Auditorium</p>
              </div>
            </div>

            <div className="career-detail">
              <span>👥</span>
              <div>
                <small>Organized By</small>
                <p>Career Development Cell</p>
              </div>
            </div>

          </div>

          <section className="career-about">
            <h2>About the Event</h2>

            <p>
              Career Guidance Session is an informative event designed to help students understand career opportunities, identify
              their interests and skills, and make informed decisions about their future career path.
            </p>
          </section>

          <section className="career-highlights">
            <h2>Highlights</h2>

            <div className="career-highlight">
              <span>✓</span>
              Career Opportunities
            </div>

            <div className="career-highlight">
              <span>✓</span>
              Skill Development Guidance
            </div>

            <div className="career-highlight">
              <span>✓</span>
              Resume & Interview Tips
            </div>

            <div className="career-highlight">
              <span>✓</span>
              Industry and Higher Study Guidance
            </div>
          </section>

          <div className="career-register">
            <button onClick={() => {  window.location.href = "/Registration";  }} >
              Register Now
            </button>
          </div>

        </div>
      </div>

    </div>
    </div>
    </>
  );
}

export default CareerGuidance;