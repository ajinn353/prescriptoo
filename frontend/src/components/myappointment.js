import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';

function Myappointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canceledAppointments, setCanceledAppointments] = useState({});


  useEffect(() => {
    setLoading(true);
  
    const userData = localStorage.getItem("user");
    const loggedInUser = userData ? JSON.parse(userData) : null;
    const loggedInUserId = loggedInUser?._id; 

    if (!loggedInUserId) {
      console.error("No logged-in user found!");
      setLoading(false);
      return;
    }
  
    fetch(`http://localhost:3300/api/book-appointment/${loggedInUserId}`)
      .then((response) => response.json())
      .then(async (data) => {
        const detailedAppointments = await Promise.all(
          data.map(async (appointment) => {
            const doctorResponse = await fetch(`http://localhost:3300/api/doctors/${appointment.doctorId}`);
            const doctorData = await doctorResponse.json();
            return {
              ...appointment,
              doctor: doctorData,
            };
          })
        );
  
        setAppointments(detailedAppointments);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);


  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:3300/api/book-appointment/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });  
      if (response.ok) {
        console.log("Appointment deleted successfully");
        setCanceledAppointments((prev) => ({ ...prev, [id]: true }));
        setAppointments((prev) => prev.filter((appointment) => appointment._id !== id)); 
      } else {
        const errorMessage = await response.text();
        console.error("Failed to cancel appointment:", errorMessage);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handlePay = (appointment) => {
    const confirmPay = window.confirm(`Simulate payment for ₹500 to Dr. ${appointment.doctor.name}?`);
  
    if (confirmPay) {
      const mockPaymentData = {
        paymentId: "pay_MOCK123456",
        status: "success",
        doctor: appointment.doctor.name,
        amount: 500,
        appointmentId: appointment._id,
      };
  
      console.log("Payment successful:", mockPaymentData);
      alert("✅ Payment successful!\n\nPayment ID: " + mockPaymentData.paymentId);
      
      // You could also POST this to your server to mark it as paid
    } else {
      alert("❌ Payment cancelled");
    }
  };
  
  
  
  

  
  
  
  
  
  return (
    <div className='container'>
      <Header />
      <div className='myappoiment'>
        <h2 className='appointments'>My Appointments</h2>
        {loading ? (
          <p>Loading...</p>
        ) : appointments.length > 0 ? (
          <div className='appointments-list'>
            {appointments.map((appointment) => (
              <div key={appointment._id} className='border-bottom py-3 d-flex flex-column flex-md-row gap-4'>
                <div>
                  <img
                    className='w-100 t'
                    style={{ maxWidth: "144px", background: "#EAEFFF" }}
                    src={appointment.doctor.image || "doc1.png"}
                    alt='Doctor'
                  />
                </div>
                <div className='flex-grow-1 text-secondary small'>
                  <p className='text-dark fw-semibold fs-6 mb-1'>{appointment.doctor.name}</p>
                  <p className='mb-1'>{appointment.doctor.specialty}</p>
                  <p className='text-dark fw-medium mb-1'>Address:</p>
                  <p className='mb-0'>{appointment.doctor.address}</p>
                  <p className='mt-2'>
                    <span className='text-dark fw-medium'>Date & Time:</span> {appointment.date} | {appointment.time}
                  </p>
                </div>
                <div className='d-flex flex-column gap-2 mt-auto'>
                <button className='btn paybtn' onClick={() => handlePay(appointment)}>Pay Online</button>
                <button className='btn cancelbtn' onClick = {() => handleCancel(appointment._id)}>Cancel Appointment</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments booked.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Myappointment;
