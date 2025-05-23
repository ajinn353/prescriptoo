import React, { useState, useEffect } from 'react'
import './homepage.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';



function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false)
  const [images, setImages] = useState([]);
  const [userImage, setUserImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(localStorage.getItem("islogin") === "true");

    const filename = ["prescript.svg", "profile.png"]

    const imageMap = {};
    filename.forEach((file) => {
      const name = file.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
      imageMap[name] = `https://prescriptoo-xhav.onrender.com/api/assets/${name}`;
    });

    setImages(imageMap);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (!storedUser) {
      console.warn('No user object in localStorage');
      return;
    }
  
    const parsedUser = JSON.parse(storedUser);
  
    // Access the user data
    const userId = parsedUser?._id;
    console.log(userId); 
    fetch("https://prescriptoo-xhav.onrender.com/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getData", userId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.image && data.image.data) {
          const base64Image = `data:${data.image.contentType};base64,${data.image.data}`;
          setUserImage(base64Image);
        } else {
          setUserImage(images.profile);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        setUserImage(images.profile);
      });
  }, []); // Empty dependency array
  

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
          <img src={images.prescript} alt="Prescripto Logo" className="logo-img me-2" style={{ height: "40px" }} />
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

        {islogin ? (
          <div className="d-flex align-items-center gap-3">
            <div
              className="dropdown"
            >
              <div className="dropdown">
                <button className="btn dropdown-toggle border-0 p-0" type="button" id="userDropdown" data-bs-toggle="dropdown">
                  <img src={userImage || images.profile}
                    alt="User Profile" className="rounded-circle" style={{ width: "32px", height: "32px", backgroundColor: "#F0F0FF", cursor: "pointer" }} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><button className="dropdown-item" onClick={() => navigate('/profile')}> My Profile</button></li>
                  <li><button className="dropdown-item" onClick={() => navigate('/myappointment')}>My Appointments</button></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button className=' create' onClick={() => navigate("/login")}>create account</button>
          </>

        )}

      </nav>
    </header>
  )
}

export default Header