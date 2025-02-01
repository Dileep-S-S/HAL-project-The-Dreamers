import React, { useContext, useEffect, useState } from 'react';
import "../Styles/Registration.css";
import { Usercontext } from '../UserContext';

const RegistrationLabor = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [wages, setWages] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { user, setuser } = useContext(Usercontext);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const handleImage = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^[0-9]{12}$/.test(aadhaar)) {
      alert("Aadhaar number must be exactly 12 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/postuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          phone,
          aadhaar,
          address,
          photo,
          age,
          gender,
          role: "Labor", 
          skills,
          wages,
          latitude,
          longitude,
          status:"online",
        }),
      });

      if (!response.ok) {
        alert("Registration failed");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Registered successfully!");
    } catch (error) {
      alert("Error sending data: " + error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Labor Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input type="text" value={name} className="form-input" onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Phone:</label>
          <input type="tel" value={phone} className="form-input" onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Aadhaar Number:</label>
          <input type="text" value={aadhaar} className="form-input" onChange={(e) => setAadhaar(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Address:</label>
          <input type="text" value={address} className="form-input" onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Age:</label>
          <input type="number" value={age} className="form-input" onChange={(e) => setAge(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Gender:</label>
          <select value={gender} className="form-select" onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Skills:</label>
          <input type="text" value={skills} className="form-input" onChange={(e) => setSkills(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Price Demand:</label>
          <input type="number" value={wages} className="form-input" onChange={(e) => setWages(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input type="password" value={password} className="form-input" onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input type="password" value={confirmPassword} className="form-input" onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Upload Image:</label>
          <input type="file" accept="image/*" className="upload-input" onChange={handleImage} required />
        </div>

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationLabor;