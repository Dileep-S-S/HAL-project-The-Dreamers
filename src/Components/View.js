import React from "react";
import '../Styles/View.css';

import { FaTools, FaUserCog, FaLandmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const View = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="container">
          <div className="col-12 col-md-4" onClick={()=>{navigate("/viewusers")}}>
            <div className="dashboard-card">
              <FaUserCog className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Labor</h2>
              <p>Lorem Ipsum es simplemente </p>
            </div> 
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/ViewVehicle")}}>
            <div className="dashboard-card">
              <FaTools className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Tools</h2>
              <p>Lorem Ipsum es simplemente e</p>
            </div>
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/viewland")}}>
            <div className="dashboard-card">
              <FaLandmark className="dashboard-icon text-primary" />
              <h2 className="dashboard-text">Land</h2>
              <p>Lorem Ipsum es simplemente el </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default View;
