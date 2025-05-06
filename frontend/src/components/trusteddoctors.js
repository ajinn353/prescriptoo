import React, { useEffect, useState } from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom'; 

function Trusteddoctors() {
  const [assets, setAssets] = useState({});
  const [islogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(localStorage.getItem("islogin") === "true");

    async function fetchAssets() {
      try {
        const res = await fetch('http://localhost:3300/api/assets');
        const data = await res.json();
        const assetMap = {};
        for (const asset of data) {
          const filename = asset.name.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
          assetMap[filename] = `http://localhost:3300/api/assets/${filename}`;
        }
        setAssets(assetMap);
      } catch (err) {
        console.error("Error loading appointment image", err);
      }
    }

    fetchAssets();
  }, []);

  return (
    <>
        <div className='row createaccount'>
          <div className='col-lg-6 col-md-12 a5'>
            <div className='txt lg'>Book Appointment<br />
              With 100+ Trusted Doctors</div>
            {!islogin && (
              <button
                className="btn btn-primary accountbtn"
                onClick={() => {
                  navigate("/login");
                  window.scrollTo(0, 0);
                }}
              >
                Create account
              </button>
            )}
          </div>
          <div className='col-lg-6 col-md-12 appoint'>
            <img src={assets.appointmentimage} className='img-fluid' alt='appointmentimage'></img>
          </div>
        </div>
    </>
  );
}

export default Trusteddoctors;
