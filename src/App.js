import logo from './logo.svg';
import './App.css';

import Home from './Pages/Home';
function App() {
  return (
    <>
      <div className='frontimg'>
        <img src='/image1.jpeg'></img>
        <div className='hero'>
          <div className='hero-content'>
            <p>Explore • Learn • Connect • Grow</p>
            <h1>EventFlow</h1>
            <h2>Smart Educational Event<br></br> Management Platform</h2>
            <p>Discover educational events, connect with opportunities, <br></br>and grow your skills - all in one place.</p>

          </div>
           <div className='login'>
        <button>Login</button>
        <button className='btn'>Explore Events →</button>
      </div>
        </div>
      </div>
     
    </>
  );
}

export default App;
