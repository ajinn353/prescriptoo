import React, { useState, useEffect } from 'react';
import './homepage.css';

function Bookappointment() {
  const [islogin, setIsLogin] = useState(false);
  const [assets, setAssets] = useState({});

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
        console.error("Error loading assets", err);
      }
    }

    fetchAssets();
  }, []);

  return (
    <div className='row a1 mt-3'>
      <div className='col-lg-6 col-md-12 a2'>
        <div className='txt lg'>Book Appointment<br />
          With Trusted Doctors</div>
        <div className='a4'>
          <img src={assets.groupprofile} className='groupprofile' alt='groupprofile' />
          <div className='txt-sm'>Simply browse through our extensive list of trusted doctors,<br />
            schedule your appointment hassle-free.</div>
        </div>
        <button onClick={() => document.getElementById('speciality').scrollIntoView({ behavior: 'smooth' })}
          className='btn btn-primary appointmentbtn mt-3'>
          Book Appointments
          <img src={assets.arrow} className='w-3' alt="arrow" />
        </button>
      </div>
      <div className='col-lg-6 col-md-12 a3' style={{ paddingTop: 30 }}>
        <img src={assets.headerimage} className='img-fluid' alt='headerimage' />
      </div>
    </div>
  );
}

export default Bookappointment;
