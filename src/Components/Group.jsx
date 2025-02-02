import React, { useState } from "react";
import "../Styles/Group.css";

const Group = () => {
  const [formData, setFormData] = useState({
    headName: "",
    headContact: "",
    address: "",
    numberOfMembers: "",
    pricePerMember: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "headContact") {
      // Allow only numeric input
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(formData.headContact)) {
      alert("Please enter a valid Indian phone number.");
      return;
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="group-container">
      <h2>Group Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Head Name:</label>
        <input type="text" name="headName" value={formData.headName} onChange={handleChange} required />

        <label>Head Contact:</label>
        <input type="text" name="headContact" value={formData.headContact} onChange={handleChange} maxLength="10" required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <label>Number of Members:</label>
        <input type="number" name="numberOfMembers" value={formData.numberOfMembers} onChange={handleChange} required />

        <label>Price Expected per Member:</label>
        <input type="number" name="pricePerMember" value={formData.pricePerMember} onChange={handleChange} required />

        <label>Skills of Group:</label>
        <textarea name="skills" value={formData.skills} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Group;
