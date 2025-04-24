import React from 'react';
import Header from './header';
import Footer from './footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";



function Appointment() {

  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); 
  const {id} = useParams();
  const [doctor,setDoctors] = useState("");
  const [images ,setImages] = useState([]);
  

  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return {
        day: date.toLocaleString("en-US", { weekday: "short" }).toUpperCase(), 
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0], 
      };
    });
  };

  const dates = generateDates();

  useEffect(() => {
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0].fullDate); 
    }
  }, [dates,selectedDate]); 

  useEffect(() => {
    generateTimeSlots();
  }, [selectedDate]); 

  useEffect(() => {
    if (times.length > 0) {
      setSelectedTime(times[0]); 
    }
  }, [times]); 

  const generateTimeSlots = () => {
    const now = new Date();
    let startHour = 10;
    const endHour = 21; 

    const selectedDay = new Date(selectedDate);
    const isToday = selectedDay.toDateString() === now.toDateString();

    if (isToday) {
      if (now.getHours() >= 21) {
        const tomorrowDate = dates[1]?.fullDate;
        if (tomorrowDate) setSelectedDate(tomorrowDate);
        startHour = 10;
      } else if (now.getHours() >= 10) {
        startHour = now.getHours() + 1; 
      }
    }

    const newTimes = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const formattedTime = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`;
      newTimes.push(formattedTime);
    }

    setTimes(newTimes);
  };

  useEffect (()=>{
    fetch(`https://prescriptoo-xhav.onrender.com/api/doctors/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data)=>{
      setDoctors(data)
    })
    .catch((error)=>{
      console.error("Error fetching doctor:",error); 
    });
  },[id])

  const handleBooking = async () => {
    const isLogin = localStorage.getItem("islogin");
  
  if (isLogin !== "true") {
    toast.warn("Login to book an appointment.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) {
    toast.warn("Please log in to book an appointment.");
    return;
  }
  
    if (!selectedDate || !selectedTime) {
      toast.warn("Please select a date and time.");
      return;
    }
  
    const appointmentData = {
      userId: user._id,
      doctorId: id,
      date: selectedDate,
      time: selectedTime,
    };
  
    try {
      const response = await fetch("https://prescriptoo-xhav.onrender.com/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(result.message || "Appointment booked successfully!");
      } else {
        toast.error(result.message || "Error booking appointment.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

    useEffect(() => {
      const filename = "verified.svg";
      const name = filename.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
      const imageUrl = `https://prescriptoo-xhav.onrender.com/api/assets/${name}`;
      
      setImages({ [name]: imageUrl });
    }, []);
  




  return (
    <div className="container">
      <Header />

      <div className="container my-4">
        <div className='docdetails d-flex'>
          <div className="row g-3 ">
            <div className="col-md-3">
              <div className=" text-center rounded docimg" style={{ backgroundColor: '#5F6FFF' }}>
                <img src={doctor.image} className="img-fluid rounded" alt="Doctor" />
              </div>
            </div>

            <div className="col-md-9 h-100 d-flex">
              <div className="border rounded w-100 h-100 d-flex flex-column docdet">
                <div className="doctorname">
                  {doctor.name}
                  <span className='verified'>
                    <img src = {images.verified} alt= 'logo'></img>
                  </span>
                </div>
                <p className="mb-1 text-muted d-flex gap-2">
                  MBBS - {doctor.category} <button className="year ">{doctor.experience} Year</button>
                </p>

                <p className="mt-3" style={{ fontSize: "14px", fontWeight: "500" }}>
                  About
                </p>
                <p className="details mt-2">
                  {doctor.about}
                </p>

                <p className="apointfee">
                  Appointment fee: <span className="text-dark">${doctor.appointmentFee}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container ">
        <div className='booking'>
          <p className="slot">Booking slots</p>

          <div className="d-flex gap-3 mt-4">
            {dates.map((d) => (
              <button
                key={d.fullDate} 
                className={`date-btn ${selectedDate === d.fullDate ? "active" : ""}`} 
                onClick={() => setSelectedDate(d.fullDate)}
              >
                {d.day} <br /> {d.date}
              </button>
            ))}
          </div>

          <div className="time-slot-container mt-3">
            <div className="time-slot-wrapper">
              {times.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? "active" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button className="appointment-btn" onClick={handleBooking}>
              Book an appointment
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Appointment;
