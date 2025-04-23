import React ,{useState,useEffect} from 'react'
import Header from './header'
import Footer from './footer'

function About() {

  const [images ,setImages] = useState([]);
    
  useEffect(() => {
    const filename = "aboutimage.png";
    const name = filename.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
    const imageUrl = `http://localhost:3300/api/assets/${name}`;
    
    setImages({ [name]: imageUrl });
  }
  , []);

  return (
    <div className='container'>
      <Header />
      <div class="text-center aboutt">
        <p>ABOUT <span className=" aboutus">US</span></p>
      </div>

      <div className='aboutdata'>
        <div className='aboutimg'>
          <img src= {images.aboutimage} alt='about_img'></img>
        </div>
        <div className='aboutpara'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto,
            we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <div style={{ fontWeight: "bolder", color: "black" }}>Our Vision</div>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between
            patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='choose'>
        <p className='why'>WHY<span className=" chooseus">&nbsp;CHOOSE US</span></p>

        <div class="row text-center g-0">
          <div class="col-md-4 d-flex">
            <div class="feature-box">
              <p class="feature-title">EFFICIENCY:</p><br/>
              <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
          </div>
          <div class="col-md-4 d-flex">
            <div class="feature-box">
              <p class="feature-title">CONVENIENCE:</p><br/>
              <p>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
          </div>
          <div class="col-md-4 d-flex">
            <div class="feature-box">
              <p class="feature-title">PERSONALIZATION:</p><br/>
              <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About