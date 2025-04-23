import React ,{useState,useEffect} from 'react'
import Header from './header'
import Footer from './footer'

function Contact() {
  const [images ,setImages] = useState([]);

    useEffect(() => {
      const filename = "contactimage.png";
      const name = filename.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
      const imageUrl = `http://localhost:3300/api/assets/${name}`;
      
      setImages({ [name]: imageUrl });
    }
    , []);
  return (
    <div className='container'>
      <Header />
      <div class="text-center contact">
        <p>CONTACT <span class=" contactus">US</span></p>
      </div>
      <div className='contactdetails'>
        <div className='contactimage'>
          <img src={images.contactimage} className='contactimg' alt='contactimage'></img>
        </div>
        <div className='contactinform'>
          <div className='office'>OUR OFFICE</div>
          <p className='contacttxt'>00000 Willms Station<br/>
          Suite 000, Washington, USA</p>

          <p className='contacttxt'>Tel: (000) 000-0000<br/>
          Email: greatstackdev@gmail.com</p>

          <div className='office'>CAREERS AT PRESCRIPTO </div>

          <p className='contacttxt'>Learn more about our teams and job openings.</p>

          <button className='job'>Explore Jobs</button>


        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact