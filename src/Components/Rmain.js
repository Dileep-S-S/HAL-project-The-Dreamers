import React from "react";
import '../Styles/View.css';

import { FaTools, FaUserCog, FaLandmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Rmain = () => {
    const navigate = useNavigate();
  return (
    <div className="">
      <div className="container">
          <div className="col-12 col-md-4" onClick={()=>{navigate("/registeruser")}}>
            <div className="dashboard-card">
              <FaUserCog className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Register Labor</h2>
              <p>Lorem Ipsum es simplemente el </p>
            </div> 
          </div>
          <div className="col-12 col-md-4"  onClick={()=>{navigate("/vehiclregis")}}>
            <div className="dashboard-card">
              <FaTools className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Register Tools</h2>
              <p>Lorem Ipsum es simplemente el </p>
            </div>
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/landregis")}}>
            <div className="dashboard-card">
              <FaLandmark className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Register Land</h2>
              <p>Lorem Ipsum es simplemente el texto</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Rmain;
