import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from './components/homepage';
import Doctors from './components/doctors';
import About from './components/about';
import Contact from './components/contact'
import Appointment from './components/appointment';
import Myappointment from './components/myappointment';
import Profile from './components/profile';
import Login from './components/login';



function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/doctors/specialty/:specialtyName" element={<Doctors/>} /> 
        <Route path="/myappointment" element={<Myappointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
