import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import Footer from "./footer";

const DoctorList = () => {
  const { specialtyName } = useParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyName || "All");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, '-').trim();


  useEffect(() => {
    if (specialtyName) {
      setSelectedSpecialty(specialtyName);
    }
  }, [specialtyName]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://prescriptoo-xhav.onrender.com/api/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="text-center">Loading doctors...</p>;
  }

  if (doctors.length === 0) {
    return <p className="text-center">No doctors available.</p>;
  }

  const specialties = [...new Set(doctors.map((doc) => doc.category?.trim()).filter(Boolean))];
  const filteredDoctors =
  selectedSpecialty === "All"
    ? doctors
    : doctors.filter((doc) => normalize(doc.category) === normalize(selectedSpecialty));


  return (
    <div className="container">
      <Header />
      <div className="doctorlist">
      <div className="specialitybrowse">Browse through the doctors specialist.</div>

        <div className="container d-flex flex-column flex-md-row gap-3">
          {/* Sidebar */}
          <div className="d-flex flex-column align-items-center align-items-md-start" style={{ maxWidth: "180px" }}>
            <div className="d-md-block d-flex flex-wrap align-items-start gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    border: "1px solid rgb(209 213 219)",
                    fontSize: "14px",
                    borderRadius: "4px",
                    textAlign: "left",
                    paddingLeft: "10px",
                    color: selectedSpecialty === specialty ? "black" : "#4B5563",
                    backgroundColor: selectedSpecialty === specialty ? "#E2E5FF" : "transparent",
                  }}
                  className="btn"
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="flex-grow-1">
            <div className="row">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 cardimg" onClick={() => {navigate(`/appointment/${doctor.id}`)}}>
                  <div className="card shadow-sm border-0">
                    <img src={doctor.image || "/default-doctor.png"} className="card-img-top" alt={doctor.name} />
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="rounded-circle bg-success d-inline-block" style={{ width: "10px", height: "10px" }}></span>
                        <p className="text-success ms-2 mb-0">Available</p>
                      </div>
                      <h6 className="card-title">{doctor.name}</h6>
                      <p className="card-text text-muted">{doctor.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;
