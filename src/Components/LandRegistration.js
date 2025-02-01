import React, { useEffect, useState } from "react";
import "../Styles/Land.css";

const LandRegistration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState({});

  
  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!address.trim()) newErrors.address = "Address is required";

    if (!area || area <= 0) newErrors.area = "Please enter a valid land area";

    if (!price || price <= 0) newErrors.price = "Please enter a valid price";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      }
    }, []);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const landData = { name, phone, address, area, price ,status:"online",latitude,longitude};

    try {
      const response = await fetch("http://localhost:8080/postlands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(landData),
      });

      if (response.ok) {
        alert("Land Registered Successfully!");
        setName("");
        setPhone("");
        setAddress("");
        setArea("");
        setPrice("");
        setErrors({});
      } else {
        alert("Failed to register land. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="land-registration-container">
      <h2>Land Registration Form for Rent</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Owner Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter owner's name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter land address"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Land Area (acres):</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter land area in acres"
            min="0"
            step="0.01"
          />
          {errors.area && <span className="error">{errors.area}</span>}
        </div>

        <div className="form-group">
          <label>Price per Acre:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price per acre"
            min="0"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <button type="submit" className="submit-button">
          Register Land for Rent
        </button>
      </form>
    </div>
  );
};

export default LandRegistration;
