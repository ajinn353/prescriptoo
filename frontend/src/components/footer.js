import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'


function Footer() {

  const [images ,setImages] = useState([]);

  useEffect(() => {
    const filename = "prescript.svg";
    const name = filename.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
    const imageUrl = `https://prescriptoo-xhav.onrender.com/api/assets/${name}`;
    
    setImages({ [name]: imageUrl });
  }, []);


  return (
    <footer className="footer ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="footer-logo">
                  <img src={images.prescript} alt="Logo" width="150"></img>
                </div>
                <p className="footer-text mt-3 ftxt">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>

              <div className="col-lg-3 col-md-3">
                <h5>COMPANY</h5>
                <div className="footer-links ftxt">
                  <Link  to={"/"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
                  <Link  to= {"/about"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About us</Link>
                  <Link to ={"/contact"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}> Contact</Link>
                  <Link to={"/"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Privacy policy</Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-2">
                <h5>GET IN TOUCH</h5>
                <p className='ftxt'>+91-983-022-1232</p>
                <p className='ftxt'>webcodenexus@gmail.com</p>
              </div>
            </div>

            <div className="footer-bottom">
              Copyright 2025 @ WEBCODE.dev - All Rights Reserved.
            </div>
          </div>
        </footer>
  )
}

export default Footer