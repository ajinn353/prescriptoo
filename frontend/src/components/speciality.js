import React, { useEffect, useState } from 'react';
import './homepage.css';
import { Link } from 'react-router-dom'; 

function Speciality() {
  const [assets, setAssets] = useState({});

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch('https://prescriptoo-xhav.onrender.com/api/assets');
        const data = await res.json();
        const assetMap = {};
        for (const asset of data) {
          const filename = asset.name.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
          assetMap[filename] = `https://prescriptoo-xhav.onrender.com/api/assets/${filename}`;
        }
        setAssets(assetMap);
      } catch (err) {
        console.error("Error loading speciality images", err);
      }
    }

    fetchAssets();
  }, []);

  return (
      <div className='speciality text-center'>
        <h1 className='text-3xl'>Find by Speciality</h1>
        <p className='text-sm'>
          Simply browse through our extensive list of trusted doctors,<br />
          schedule your appointment hassle-free.
        </p>
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
  );
}

export default Speciality;
