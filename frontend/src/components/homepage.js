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

    async function fetchData() {
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
        <div className='row a1 mt-3'>
          <div className='col-lg-6 col-md-12 a2'>
            <div className='txt lg'>Book Appointment<br />
              With Trusted Doctors</div>
            <div className='a4'>
              <img src={assets.groupprofile} className=' groupprofile' alt='groupprofile'></img>
              <div className='txt-sm'>Simply browse through our extensive list of trusted doctors,<br />
                schedule your appointment hassle-free.</div>
            </div>
            <button onClick={() => document.getElementById('speciality').scrollIntoView({ behavior: 'smooth' })}
              className='btn btn-primary appointmentbtn mt-3'>Book Appointments
              <img src={assets.arrow} className='w-3'></img>
            </button>
          </div>
          <div className='col-lg-6 col-md-12 a3' style={{ paddingTop: 30 }}>
            <img src={assets.headerimage} className='img-fluid' alt='headerimage'></img>
          </div>
        </div>
      </div>
      <div className='container' id='speciality'>
        <div className='speciality text-center'>
          <h1 className='text-3xl'>Find by Speciality</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
          <div className="category-scroll">
            <div className="d-flex category-wrapper">

              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/general-physician" className='diff'>
                  <img src={assets.generalphysician} className='img-fluid w-4 mb-2' alt="General Physician" />
                  <p>General physician</p>
                </Link>
              </div>
              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/gynecologist" className='diff'>
                  <img src={assets.gynecologist} className='img-fluid w-4 sm:w-6 mb-2' alt="Gynecologist" />
                  <p>Gynecologist</p>
                </Link>
              </div>
              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/dermatologist" className='diff'>
                  <img src={assets.dermatologist} className='img-fluid w-4 sm:w-6 mb-2' alt="Dermatologist" />
                  <p>Dermatologist</p>
                </Link>
              </div>
              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/pediatricians" className='diff'>
                  <img src={assets.pediatrician} className='img-fluid w-4 sm:w-6 mb-2' alt="Pediatricians" />
                  <p>Pediatricians</p>
                </Link>
              </div>
              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/neurologist" className='diff'>
                  <img src={assets.neurologist} className='img-fluid w-4 sm:w-6 mb-2' alt="Neurologist" />
                  <p>Neurologist</p>
                </Link>
              </div>
              <div className='col-6 col-sm-4 col-md-2'>
                <Link to="/doctors/specialty/gastroenterologist" className='diff'>
                  <img src={assets.gastroenterologist} className='img-fluid w-4 sm:w-6 mb-2' alt="Gastroenterologist" />
                  <p>Gastroenterologist</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='topdoc text-center'>
          <h1 className='text-3xl'>Top Doctors to Book</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors.</p>
          <div className="row doctors">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                <div className="card shadow-sm border-0" onClick={() => { navigate(`/appointment/${doctor.id}`); window.scrollTo(0, 0); }}>
                  <img src={doctor.image || "/default-doctor.png"} className="card-img-top" alt={doctor.name} />
                  <div className="card-body ">
                    <div className="d-flex justify-content-center mb-2">
                      <div className="d-flex align-items-center">
                        <span className="rounded-circle bg-success d-inline-block" style={{ width: "8px", height: "8px" }}></span>
                        <p className="text-success ms-2 mb-0" style={{ fontSize: '0.875rem' }}>Available</p>
                      </div>
                    </div>

                    <h6 className="card-title" >{doctor.name}</h6>
                    <p className="card-text text-muted" >{doctor.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/doctors")} className='btn btn-secondary more'>more</button>
        </div>
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
        <Footer />
      </div>
    </>
  )
}

export default Homepage