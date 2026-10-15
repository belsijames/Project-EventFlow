import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
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
import Certificate from './Pages/Certificate';
import CertificateDetails from './Pages/CertificateDetials';
import Reminder from './Pages/Reminder';
import MyQuiz from './Pages/MyQuiz';
import LearningMaterials from "./Pages/LearningMaterials";
import MyCertificates from "./Pages/MyCertificates";
import Registrationform from './Pages/Registrationform';
import ReminderCenter from "./Pages/ReminderCenter";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminIssueCertificate from "./Pages/AdminIssueCertificate";
import ManageEvents from "./Pages/ManageEvents";
import ManageUsers from "./Pages/ManageUsers";
import ManageRegistrations from "./Pages/ManageRegistrations";
import ManageQuizzes from "./Pages/ManageQuizzes";

import FacultyDashboard from "./Pages/FacultyDashboard";
import FacultyManageEvents from "./Pages/FacultyManageEvents";
import FacultyRegistrations from "./Pages/FacultyRegistrations";
import FacultyManageQuizzes from "./Pages/FacultyManageQuizzes";
import FacultyQuizResults from "./Pages/FacultyQuizResults";
import FacultyProfile from "./Pages/FacultyProfile";
import IssueCertificate from "./Pages/IssueCertificate";
import FacultyCertificate from "./Pages/FacultyCertificate";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ReminderCenter" element={<ReminderCenter/>}/>

      {/* User / Student Protected Routes */}
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Events"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/techtalk"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Techtalk />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CreativeMind"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <CreativeMind />
          </ProtectedRoute>
        }
      />
      <Route
        path="/WebDevelopment"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <WebDevelopment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CareerGuidance"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <CareerGuidance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ScienceExpo"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <ScienceExpo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CommunicationSkills"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <CommunicationSkills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <LearningPath />
          </ProtectedRoute>
        }
      />
      <Route
        path="/LearningPath"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <LearningPath />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:topic"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Quiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz-result/:topic"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <QuizResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/MyRegistration"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <MyRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-registration"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <MyRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registration/:eventName"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Registration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Registrationform"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Registrationform />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-quiz"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <MyQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-materials/:id"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <LearningMaterials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Certificate"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Certificate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificate/:id"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <CertificateDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Reminder"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Reminder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Profile"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-certificates"
        element={
          <ProtectedRoute allowedRoles={["User", "Faculty", "Admin"]}>
            <MyCertificates />
          </ProtectedRoute>
        }
      />

      {/* Faculty Protected Routes */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/events"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyManageEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/registrations"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyRegistrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/quizzes"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyManageQuizzes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/results"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyQuizResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/profile"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/issue-certificate"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <IssueCertificate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/FacultyCertificate"
        element={
          <ProtectedRoute allowedRoles={["Faculty", "Admin"]}>
            <FacultyCertificate />
          </ProtectedRoute>
        }
      />

      {/* Admin Only Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdminIssueCertificate"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminIssueCertificate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/registrations"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ManageRegistrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/quizzes"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ManageQuizzes />
          </ProtectedRoute>
        }
      />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
