import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Vehicle.css";

const Vehicleregis = () => {
    const [formData, setFormData] = useState({
        name: '',
        status: 'Online',
        price: '',             
        phone: '',
        area: '',             
        address: ''      
    });
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        // Price validation
        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        // Status validation
        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        // Area validation
        if (!formData.area.trim()) {
            newErrors.area = 'Area is required';
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
     useEffect(() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              setlatitude(position.coords.latitude);
              setlongitude(position.coords.longitude);
            });
          }
        }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const response = await axios.post('http://localhost:8080/postvehicle', formData);
                console.log('Form submitted:', response.data);
                setFormData({
                    name: '',
                    status: '',
                    price: '',
                    phone: '',
                    area: '',
                    address: '',
                    latitude,
                    longitude,
                });
                setErrors({});
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error (e.g., show error message to the user)
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="land-registration-container">
            <h2>Vehicle Registration Form</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Owner Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter owner's name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>


                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        min="0"
                    />
                    {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="form-group phone-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10 digit number"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Area:</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Enter area"
                    />
                    {errors.area && <span className="error">{errors.area}</span>}
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register Vehicle'}
                </button>
            </form>
        </div>
    );
};

export default Vehicleregis;
