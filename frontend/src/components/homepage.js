import React, { useState, useEffect } from 'react'
import './homepage.css'
import { useNavigate, Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';




function Homepage() {

  const [doctors, setDoctors] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [islogin, setIsLogin] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    setIsLogin(localStorage.getItem("islogin") === "true");
  
 const fetchData = async()=> {
      try {
        const doctorRes = await fetch('https://prescriptoo-xhav.onrender.com/api/doctors');
        const doctorData = await doctorRes.json();
        setDoctors(doctorData || []);
  
        const assetRes = await fetch('https://prescriptoo-xhav.onrender.com/api/assets');
        const assetList = await assetRes.json();
  
        const assetMap = {};
        for (const asset of assetList) {
          const filename = asset.name.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
          const imgRes = await fetch(`https://prescriptoo-xhav.onrender.com/api/assets/${filename}`);
          if (!imgRes.ok) {
            console.error(`Image ${filename} failed to load`);
            continue;
          }
  
          const blob = await imgRes.blob();
          const url = URL.createObjectURL(blob);
          assetMap[filename] = url;
        }
  
        setAssets(assetMap);
      } catch (error) {
        console.error("Error fetching asset data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  
  



  return (
    <>
      <div className='container' id='top'>
        <Header />
        <div className=' a1 mt-3'>
          <div className='a2'>
            <div className='txt lg'>Book Appointment<br />
              With Trusted Doctors</div>
            <div className='a4'>
              <img src= {assets.groupprofile} className='groupprofile' alt='groupprofile'></img>
              <div className='txt-sm'>Simply browse through our extensive list of trusted doctors,<br />
                schedule your appointment hassle-free.</div>
            </div>
            <button onClick={() => document.getElementById('speciality').scrollIntoView({ behavior: 'smooth' })}
              className='appointmentbtn mt-3'>Book Appoinments
              <img src={assets.arrow} className='w-3' alt="arrow"></img>
            </button>
          </div>
          <div className='a3 ' style={{ paddingTop: 30 }}>
            <img src= {assets.headerimage}  alt='headerimage'></img>
          </div>
        </div>
      </div>
      <div className='container' id='speciality'>
        <div className='speciality' >
          <h1 className='text-3xl'>Find by Speciality</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
          <div className='category'>
            <Link to="/doctors/specialty/general-physician" className='diff'>
              <img src= {assets.generalphysician} className='w-4 mb-2' alt="General Physician" />
              <p>General physician</p>
            </Link>

            <Link to="/doctors/specialty/gynecologist" className='diff'>
              <img src={assets.gynecologist} className='w-4 sm:w-6 mb-2' alt="Gynecologist" />
              <p>Gynecologist</p>
            </Link>

            <Link to="/doctors/specialty/dermatologist" className='diff'>
              <img src={assets.dermatologist} className='w-4 sm:w-6 mb-2' alt="Dermatologist" />
              <p>Dermatologist</p>
            </Link>

            <Link to="/doctors/specialty/pediatricians" className='diff'>
              <img src= {assets.pediatrician} className='w-4 sm:w-6 mb-2' alt="Pediatricians" />
              <p>Pediatricians</p>
            </Link>

            <Link to="/doctors/specialty/neurologist" className='diff'>
              <img src= {assets.neurologist} className='w-4 sm:w-6 mb-2' alt="Neurologist" />
              <p>Neurologist</p>
            </Link>

            <Link to="/doctors/specialty/gastroenterologist" className='diff'>
              <img src= {assets.gastroenterologist} className='w-4 sm:w-6 mb-2' alt="Gastroenterologist" />
              <p>Gastroenterologist</p>
            </Link>
          </div>
        </div>
        <div className='topdoc'>
          <h1 className='text-3xl'>Top Doctors to Book</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors.</p>
          <div className="doctors">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="card" onClick={() => { navigate(`/appointment/${doctor.id}`); window.scrollTo(0, 0); }}>
                  <img src={doctor.image} className="card-img-top" alt={doctor.name} />
                  <div className="card-body">
                    <div className='w-2'>
                      <p className='roundedfull'></p>
                      <p>Available</p>
                    </div>
                    <h6 className="card-title">{doctor.name}</h6>
                    <p className="card-text">{doctor.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/doctors")} className='more'>more</button>
        </div>
        <div className='createaccount'>
          <div className='a2'>
            <div className='txt lg'>Book Appointment<br />
              With 100+ Trusted Doctors</div>
            {islogin ? (
              <button
                className="accountbtn"
                onClick={() => document.getElementById("top")?.scrollIntoView()}
              >
                Create account
              </button>
            ) : (
              <button className="accountbtn" onClick={() => { navigate("/login"); window.scrollTo(0, 0) }}>
                Create account
              </button>
            )}

          </div>
          <div className='appoint'>
            <img src= {assets.appointmentimage} alt = 'appointmentimage' ></img>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
