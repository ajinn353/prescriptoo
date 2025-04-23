import React, { useState,useEffect } from 'react'
import './homepage.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';



function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [islogin,setIsLogin] = useState(false)
  const [images ,setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(localStorage.getItem("islogin") === "true");
    
    const filename =["prescript.svg","profile.png"]

    const imageMap = {};
    filename.forEach((file) => {
      const name = file.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
      imageMap[name] = `http://localhost:3300/api/assets/${name}`;
    });
   
    setImages(imageMap);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("islogin"); 
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light pt-2 pb-2 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #D5D5D5" }}>

        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src= {images.prescript} alt="Prescripto Logo" className="logo-img me-2" style={{ height: "40px" }} />
        </Link>

        {/* Custom Toggler Button */}
        <button
          className="navbar-toggler"
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "30px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "none",
            marginRight: "20px"
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}

        </button>

        {/* Collapsible Navbar Content */}
        <div className={`collapse navbar-collapse justify-content-center ${isOpen ? "show" : ""}`} id="navbarNav">
          <div className="navbar-nav d-flex gap-4 pt-1 pb-1">

            <Link
              className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}
              to="/"
              style={{ fontWeight: 600, fontSize: 14 }}
            >
              HOME
            </Link>

            <Link
              className={`nav-link ${location.pathname === "/doctors" ? "active-link" : ""}`}
              to="/doctors"
              style={{ fontWeight: 600, fontSize: 14 }}
            >
              ALL DOCTORS
            </Link>

            <Link
              className={`nav-link ${location.pathname === "/about" ? "active-link" : ""}`}
              to="/about"
              style={{ fontWeight: 600, fontSize: 14 }}
            >
              ABOUT
            </Link>

            <Link
              className={`nav-link ${location.pathname === "/contact" ? "active-link" : ""}`}
              to="/contact"
              style={{ fontWeight: 600, fontSize: 14 }}
            >
              CONTACT
            </Link>

          </div>
        </div>
        
        {islogin ?(
        <div className="d-flex align-items-center gap-3">
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="dropdown">
              <button className="btn dropdown-toggle border-0 p-0" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <img src= {images.profile} alt="User Profile" className="rounded-circle" style={{ width: "32px", height: "32px", backgroundColor: "#F0F0FF", cursor: "pointer" }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><button className="dropdown-item" onClick={() => navigate('/profile')}> My Profile</button></li>
                <li><button className="dropdown-item" onClick={() => navigate('/myappointment')}>My Appointments</button></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
        ):(
          <>
          <button className=' create' onClick={() => navigate("/login")}>create account</button>
          </>

        )}

      </nav>
    </header>
  )
}

export default Header