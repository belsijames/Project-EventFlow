import React from "react";
import "./Home.css";
 function Home() {
    return (
        <>
            <div className='home-page'>
                <div className='frontimg'>
                    <img src="/background.jpeg" alt="EventFlow Background"/>

                    <div className='hero'>

                        <div className='hero-content'>
                            <p>Explore • Learn • Connect • Grow</p>
                            <h1>EventFlow</h1>
                            <h2>Smart Educational Event<br></br> Management Platform</h2>
                            <p>Discover educational events, connect with opportunities, <br></br>and grow your skills - all in one place.</p>

                        </div>
                        <div className='log'>
                            <button className='btn' onClick={()=> window.location.href="/Login"}>Explore Events →</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default  Home;