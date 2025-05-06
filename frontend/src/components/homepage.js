import React from 'react'
import './homepage.css'
import Header from './header';
import Footer from './footer';
import Bookappointment from './Bookappointment';
import TopDoctors from './topdoctors';
import Speciality from './speciality';
import Trusteddoctors from './trusteddoctors';


function Homepage() {

  return (
    <>
      <div className='container' id='top'>
        <Header />
        <Bookappointment />
      </div>
      <div className='container' id='speciality'>
        <Speciality />
        <TopDoctors />
        <Trusteddoctors />
        < Footer />
      </div>
    </>
  )
}

export default Homepage