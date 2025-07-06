// src/Components/User/UserNav.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './UserNav.css';

export default function UserNav() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="usernavbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Fix My City</span>
      </div>

      <nav className="nav-links">
        <Link to={`/user/${username}/home`}>Home</Link>
        <Link to="/user/complaints">My Complaints</Link>
        <div className="dropdown">
          <span className="dropbtn">Lodge Complaint ▾</span>
          <div className="dropdown-content">
            <Link to="/user/complaint/electricity">Electricity</Link>
            <Link to="/user/complaint/water">Water</Link>
            <Link to="/user/complaint/road">Road</Link>
            <Link to="/user/complaint/garbage">Garbage</Link>
            <Link to="/user/complaint/others">Others</Link>
          </div>
        </div>
      </nav>

      <button className="login-btn" onClick={handleLogout}>Logout</button>
    </header>
  );
}
