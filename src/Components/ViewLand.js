import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import "../Styles/Land.css";

const ViewLand = () => {
  const [lands, setLands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:8080/getlands")
      .then((response) => {
        setLands(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the lands!", error);
      });
  }, []);

  const filteredLands = lands.filter((land) => {
    const matchesSearch = land.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = areaFilter === "all" ? true :
      areaFilter === "small" ? parseFloat(land.area) <= 20 :
      areaFilter === "medium" ? parseFloat(land.area) > 20 && parseFloat(land.area) <= 30 :
      parseFloat(land.area) > 30;

    const matchesPrice = priceFilter === "all" ? true :
      priceFilter === "low" ? land.price <= 4500 :
      priceFilter === "medium" ? land.price > 4500 && land.price <= 5500 :
      land.price > 5500;

    return matchesSearch && matchesArea && matchesPrice;
  });

  return (
    <div className="land-display-container">
      <h2 className="title">Available Lands for Rent</h2>

      <div className="filters-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" />
        </div>

        {/* Filter Options */}
        <div className="filter-options">
          <select 
            value={areaFilter} 
            onChange={(e) => setAreaFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Areas</option>
            <option value="small">Small (≤20 acres)</option>
            <option value="medium">Medium (21-30 acres)</option>
            <option value="large">Large (>30 acres)</option>
          </select>

          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="low">Low (≤₹4,500/acre)</option>
            <option value="medium">Medium (₹4,501-5,500/acre)</option>
            <option value="high">High (>₹5,500/acre)</option>
          </select>
        </div>
      </div>

      {/* Land List */}
      <center>
        <div className="land-list">
          {filteredLands.length > 0 ? (
            filteredLands.map((land) => (
              <div key={land.id} className="land-card">
                <div className="land-main-info">
                  <h3>{land.name}</h3>
                  <p className="address">{land.address}</p>
                </div>

                <div className="land-details">
                  <div className="detail-item">
                    <span className="label">Area:</span>
                    <span className="value">{land.area} acres</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Price:</span>
                    <span className="value">₹{land.price}/acre</span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Water Pump:</span>
                    <span className={land.status === 'available' ? 'available' : 'not-available'}>
                      {land.status === 'available' ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>

                <div className="contact-info">
                  <p><strong>Owner:</strong> {land.ownerName}</p>
                  <p><strong>Contact:</strong> {land.phone}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No lands found matching your criteria</p>
          )}
        </div>
      </center>
    </div>
  );
};

export default ViewLand;
