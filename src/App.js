import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Events from './Pages/Events';
import Techtalk from './Pages/Techtalk';
import Registration from './Pages/Registration';
import CreativeMind from './Pages/CreativeMind';
import WebDevelopment from './Pages/WebDevelopment';
import CareerGuidance from './Pages/CareerGuidance';
import ScienceExpo from './Pages/ScienceExpo';
import CommunicationSkills from './Pages/CommunicationSkills';
import LearningPath from './Pages/LearningPath';
import Quiz from './Pages/Quiz';
import QuizResult from './Pages/QuizResult';
import MyRegistration from './Pages/MyRegistration';
import Profile from './Pages/Profile';




function App() {
  return (
    
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Events" element={<Events/>}/>
          <Route path="/Techtalk" element={<Techtalk/>}/>
          <Route path="/CreativeMind" element={<CreativeMind/>}/>
          <Route path="/WebDevelopment" element={<WebDevelopment/>}/>
          <Route path="/CareerGuidance" element={<CareerGuidance/>}/>
          <Route path="/ScienceExpo" element={<ScienceExpo/>}/>
          <Route path="/CommunicationSkills" element={<CommunicationSkills/>}/>
          <Route path="/LearningPath" element={<LearningPath/>}/>
          <Route path="/quiz/:topic" element={<Quiz/>}/>
          <Route path="/quiz-result/:topic" element={<QuizResult/>}/>
          <Route path="/MyRegistration" element={<MyRegistration/>}/>
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="/Profile"  element={<Profile/>}/>
    
        </Routes>
    
  
  );
}


export default App;
