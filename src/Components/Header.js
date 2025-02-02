import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import logo from "../gravidalogo.png";
import { Usercontext } from "../UserContext";

export default function Header() {
  const location = useLocation();
  const { user, setuser } = useContext(Usercontext);

  return (
    <>
      <div className='header'>
        <div className="icon">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className='nav-links'>
          <NavLink to='/' text="Home" currentPath={location.pathname}/>
          <NavLink to="/view" text="View" currentPath={location.pathname} />
          <NavLink to="/rmain" text="Register" currentPath={location.pathname} />
          <NavLink to="./about" text="About" currentPath={location.pathname} />
          
          {user ? (
            <NavLink to="./profile" text="Profile" currentPath={location.pathname} />
          ) : (
            <NavLink to="./login" text="Login" currentPath={location.pathname} />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

function NavLink({ to, text, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`headbutton ${isActive ? 'active' : ''}`}>
      {text}
    </Link>
  );
}
