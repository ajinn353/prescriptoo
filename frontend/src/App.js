import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Lazy load components
const Homepage = lazy(() => import('./components/homepage'));
const Doctors = lazy(() => import('./components/doctors'));
const About = lazy(() => import('./components/about'));
const Contact = lazy(() => import('./components/contact'));
const Appointment = lazy(() => import('./components/appointment'));
const Myappointment = lazy(() => import('./components/myappointment'));
const Profile = lazy(() => import('./components/profile'));
const Login = lazy(() => import('./components/login'));

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2500} />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment/:id" element={<Appointment />} />
          <Route path="/doctors/specialty/:specialtyName" element={<Doctors />} /> 
          <Route path="/myappointment" element={<Myappointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
