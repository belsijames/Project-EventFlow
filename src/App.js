import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Events from './Pages/Events';
import Techtalk from './Pages/Techtalk';
import Registration from './Pages/Registrationform';
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
import ForgotPassword from './Pages/ForgotPassword';
import Certificate from './Pages/Certificate';
import CertificateDetails from './Pages/CertificateDetails';
import Reminder from './Pages/Reminder';
import MyQuiz from './Pages/MyQuiz';
import LearningMaterials from "./Pages/LearningMaterials";



import AdminDashboard from "./Pages/AdminDashboard";



function App() {
  return (
    
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Events" element={<Events/>}/>
          <Route path="/techtalk" element={<Techtalk/>}/>
          <Route path="/CreativeMind" element={<CreativeMind/>}/>
          <Route path="/WebDevelopment" element={<WebDevelopment/>}/>
          <Route path="/CareerGuidance" element={<CareerGuidance/>}/>
          <Route path="/ScienceExpo" element={<ScienceExpo/>}/>
          <Route path="/CommunicationSkills" element={<CommunicationSkills/>}/>
          <Route path="/learning" element={<LearningPath/>}/>
          <Route path="/quiz/:topic" element={<Quiz/>}/>
          <Route path="/quiz-result/:topic" element={<QuizResult/>}/>
          <Route path="/MyRegistration" element={<MyRegistration/>}/>
          <Route path="/registration/:eventName" element={<Registration />}/>
          <Route path="/my-quiz" element={<MyQuiz />} />
          <Route path="/learning-materials/:id" element={<LearningMaterials />}/>
          <Route path="/Certificate" element={<Certificate/>}/>
          <Route path="/certificate/:id" element={<CertificateDetails />}/>
          <Route path="/Reminder" element={<Reminder/>}/>
          <Route path="/Profile"  element={<Profile/>}/>


          <Route path="/admin" element={<AdminDashboard />} />
    
        </Routes>
    
  
  );
}


export default App;
