import React from "react";
import '../Styles/View.css';
import { LuTreePine } from "react-icons/lu";
import { FaTruck , FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const View = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="container">
          <div className="col-12 col-md-4" onClick={()=>{navigate("/viewusers")}}>
            <div className="dashboard-card">
              <FaUserCog className="dashboard-icon " />
              <h2 className="dashboard-text">Labor</h2>
              <p>Farmers are the backbone of our food production</p>
            </div> 
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/ViewVehicle")}}>
            <div className="dashboard-card">
              <FaTruck  className="dashboard-icon " />
              <h2 className="dashboard-text">Vehicles</h2>
              <p>Needed vehicles and machineries for Agriculture</p>
            </div>
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/viewland")}}>
            <div className="dashboard-card">
              <LuTreePine className="dashboard-icon" />
              <h2 className="dashboard-text">Land</h2>
              <p>Lands for rents whenever you want</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default View;
