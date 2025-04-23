import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editableProfile, setEditableProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser._id) {
      console.warn("No user found in localStorage");
      navigate("/login");
      return;
    }

    fetch("http://localhost:3300/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getData", userId: storedUser._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setEditableProfile(data); // initialize editable fields
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [navigate]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("action", "updateData");
    formData.append("userId", storedUser._id);

    // Add editable profile fields
    Object.keys(editableProfile).forEach((key) => {
      formData.append(key, editableProfile[key]);
    });

    // Add image only if user selected one
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await fetch("http://localhost:3300/api/user", {
        method: "POST", // keep POST for multipart/form-data
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setProfile(data.user); // updatedUser is returned as 'user'
        setEditMode(false);
        setPreviewImage(null);
        setSelectedFile(null);
      } else {
        alert(data.error || "Update failed.");
      }
    } catch (err) {
      alert("Error updating profile.");
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  useEffect(() => {

    const filename = "profile.png"
    const name = filename.toLowerCase().replace(/\s+/g, '').replace(/\.[^/.]+$/, '');
    const imageUrl = `http://localhost:3300/api/assets/${name}`;

    setImages({ [name]: imageUrl });
  }
    , []);


  if (loading || !profile) return <div>Loading profile...</div>;






  return (
    <div className="container">
      <Header />
      <div className="profile">
        <div className="profiledetails">
          {editMode ? (
            <div onClick={() => document.getElementById("fileInput").click()} style={{ cursor: "pointer" }}>
              <img
                src={
                  previewImage ||
                  (profile?.image
                    ? `data:${profile.image.contentType};base64,${profile.image.data}`
                    : images.profile)
                }
              />

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <img
              src={
                profile?.image
                ? `data:${profile.image.contentType};base64,${profile.image.data}`
                : images?.profile
              }
              alt="Profile"
            />
          )}



          {editMode ? (
            <input
              type="text"
              name="name"
              value={editableProfile.name || ""}
              onChange={handleChange}
              className="mt-4"
            />
          ) : (
            <p className="profilename mt-4">{profile.name}</p>
          )}
          <hr />
          <p className="contactinf mt-3"><u>CONTACT INFORMATION</u></p>
          <div className="address mt-3">
            <p>Email id:</p>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={editableProfile.email || ""}
                onChange={handleChange}
                className="textblue"
              />
            ) : (
              <p className="textblue">{profile.email}</p>
            )}

            <p>Phone:</p>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={editableProfile.phone || ""}
                onChange={handleChange}
                className="textblue"
              />
            ) : (
              <p className="textblue">
                {profile.phone && profile.phone !== "000000000" ? profile.phone : "000000000"}
              </p>
            )}

            <p>Address:</p>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={editableProfile.address || ""}
                onChange={handleChange}
                className="textgray"
              />
            ) : (
              <p className="textgray">{profile.address || ""}</p>
            )}
          </div>

          <p className="basicinf mt-3"><u>BASIC INFORMATION</u></p>
          <div className="basicdetails">
            <p className="basictext">Gender:</p>
            {editMode ? (
              <select
                name="gender"
                value={editableProfile.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

            ) : (
              <p>{profile.gender || "Not Selected"}</p>
            )}
            <p className="basictext">Birthday:</p>
            {editMode ? (
              <input
                type="date"
                name="birthday"
                value={editableProfile.birthday || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.birthday || "Not Selected"}</p>
            )}
          </div>

          {editMode ? (
            <button className="editbtn mt-5" onClick={handleSave}>Save</button>
          ) : (
            <button className="editbtn mt-5" onClick={handleEditToggle}>Edit</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
