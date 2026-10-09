import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
            <div className="head">
                <div className="search-bar1" >
                    <input type="text" placeholder="Search" style={{ padding: "20px", marginLeft: "-670px" }} />
                </div>
                <img src="/board-bg.jpeg" className="board-bg" />
                <div className="section">

                    <h1>Hello,Belsi👋</h1>
                    <p>Explore events, learn new skills, <br /> and make the most of your journey!</p>
                </div>
                <div className="event-cards">
                    <div className="event-card">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="purple" style={{ marginTop: "25px" }} class="bi bi-calendar2-week" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                            </svg><br></br>
                            <i class="bi bi-calendar2-week"></i></span>

                        <h2>Upcoming Events</h2>
                        <p>Explore What's Events</p>
                        <h1>3</h1>
                        <span className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                            <i class="bi bi-arrow-right" ></i></span>
                    </div>
                    <div className="event-card">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="blue" style={{ marginTop: "25px" }} class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                            </svg>
                            <i class="bi bi-people-fill"></i></span>
                        <h2> My Events</h2>
                        <p>View Your Registrations</p>
                        <h1>8</h1>
                        <span className="arrow" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" >
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                            <i class="bi bi-arrow-right" onClick={() => window.location.href = "/Events"} ></i></span>
                    </div>
                    <div className="event-card">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="purple" style={{ marginTop: "25px" }} class="bi bi-book" viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                            </svg>
                            <i class="bi bi-book"></i></span>
                        <h2>Learning Path</h2>
                        <p>Customise Your Learning</p>
                        <h1>8</h1>
                        <span className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                            <i class="bi bi-arrow-right"></i></span>
                    </div>
                    <div className="event-card">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="orange" style={{ marginTop: "25px" }} class="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                            <i class="bi bi-star-fill"></i></span>
                        <h2>Remainders</h2>
                        <p>Stay on Events</p>
                        <h1>8</h1>
                        <span className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                            <i class="bi bi-bell"></i></span>
                    </div>
                </div>



            </div>
            <aside className="ef-sidebar">

                <div className="ef-brand">
                    <div className="ef-brand-icon">◆</div>
                    <span>EventFlow</span>
                </div>

                <nav className="ef-navigation">

                    <Link to="/dashboard" className="ef-nav-item active">
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

                    <Link to="/Certificate" className="ef-nav-item">
                        <span className="ef-nav-icon">♙</span>
                        <span>Certificate</span>
                    </Link>


                     <Link to="/Reminder" className="ef-nav-item">
                        <span className="ef-nav-icon">♙</span>
                        <span>Remainder</span>
                    </Link>

                     <Link to="/my-quiz" className="ef-nav-item">
                        <span className="ef-nav-icon">♙</span>
                        <span>MyQuiz</span>
                    </Link>


                    <Link to="/profile" className="ef-nav-item">
                        <span className="ef-nav-icon">♙</span>
                        <span>Profile</span>
                    </Link>

                </nav>

            </aside>
        </>
    )
}