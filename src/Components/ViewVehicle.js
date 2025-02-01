import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import "../Styles/Vehicle.css";

const ViewVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    // Fetch vehicle data from the API
    axios
      .get("http://localhost:8080/getvehicle")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  // Filter logic
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vehicle.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArea = !selectedArea || vehicle.area === selectedArea;
    const matchesPrice = !selectedPrice || vehicle.price <= parseFloat(selectedPrice);

    return matchesSearch && matchesArea && matchesPrice;
  });

  return (
    <div className="laborer-container">
      <h2 className="title">Vehicle</h2>
      
      {/* Enlarged Search Bar */}
      <div className="large-search-bar">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="large-search-icon" size={32} />
      </div>

      {/* Filters */}
      <div className="filter-section">
        <select 
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Select Area</option>
          <option value="Downtown">Downtown</option>
          <option value="Uptown">Uptown</option>
          <option value="Midtown">Midtown</option>
          <option value="Suburb">Suburb</option>
        </select>

        <select 
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Price/hr</option>
          <option value="300">Under ₹300</option>
          <option value="500">Under ₹500</option>
          <option value="800">Under ₹800</option>
          <option value="1000">Under ₹1000</option>
        </select>
      </div>

      <h3 className="subtitle">Display Nearest Vehicles</h3>

      {/* Vehicle List */}
      <div className="laborer-list">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="laborer-card">
              <div className="vehicle-info">
                <span className="vehicle-type">{vehicle.name}</span>
                <span className="vehicle-price">₹{vehicle.price}/hr</span>
                <span className="vehicle-location">{vehicle.address}</span>
              </div>
              <div className="owner-info">
                <span className="owner-name">Owner: {vehicle.name}</span>
                <span className="owner-contact">Contact: {vehicle.phone}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No vehicles found</p>
        )}
      </div>
    </div>
  );
};

export default ViewVehicle;
