import React, { useEffect, useState } from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom'; 

function TopDoctors() {
  const [doctors, setDoctors] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch('http://localhost:3300/api/doctors');
        const data = await res.json();
        setDoctors(data || []);
      } catch (err) {
        console.error("Error loading doctors", err);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <>
        <div className='topdoc text-center'>
          <h1 className='text-3xl'>Top Doctors to Book</h1>
          <p className='text-sm'>Simply browse through our extensive list of trusted doctors.</p>
          <div className="row doctors">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                <div
                  className="card shadow-sm border-0"
                  onClick={() => {
                    navigate(`/appointment/${doctor.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <img src={doctor.image || "/default-doctor.png"} className="card-img-top" alt={doctor.name} />
                  <div className="card-body ">
                    <div className="d-flex justify-content-center mb-2">
                      <div className="d-flex align-items-center">
                        <span className="rounded-circle bg-success d-inline-block" style={{ width: "8px", height: "8px" }}></span>
                        <p className="text-success ms-2 mb-0" style={{ fontSize: '0.875rem' }}>Available</p>
                      </div>
                    </div>

                    <h6 className="card-title">{doctor.name}</h6>
                    <p className="card-text text-muted">{doctor.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/doctors")} className='btn btn-secondary more'>more</button>
        </div>
    </>
  );
}

export default TopDoctors;
