import React from "react";
import '../Styles/View.css';
import { LuTreePine } from "react-icons/lu";
import { FaTruck, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Rmain = () => {
    const navigate = useNavigate();
  return (
    <div className="">
      <div className="container">
          <div className="col-12 col-md-4" onClick={()=>{navigate("/registeruser")}}>
            <div className="dashboard-card">
              <FaUserCog className="dashboard-icon" />
              <h2 className="dashboard-text">Register Labor</h2>
              <p>Farmers are the backbone of our food production</p>
            </div> 
          </div>
          <div className="col-12 col-md-4"  onClick={()=>{navigate("/vehiclregis")}}>
            <div className="dashboard-card">
              <FaTruck className="dashboard-icon" />
              <h2 className="dashboard-text">Register Tools</h2>
              <p>Needed vehicles and machineries for Agriculture</p>
            </div>
          </div>
          <div className="col-12 col-md-4" onClick={()=>{navigate("/landregis")}}>
            <div className="dashboard-card">
              <LuTreePine className="dashboard-icon" />
              <h2 className="dashboard-text">Register Land</h2>
              <p>Lands for rents whenever you want</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Rmain;
