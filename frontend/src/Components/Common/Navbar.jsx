// src/Components/Common/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';



export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Fix My City</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>

        {isLoggedIn && role === 'user' && (
          <Link to={`/user/${username}/home`}>User Dashboard</Link>
        )}

        {isLoggedIn && role === 'wardAdmin' && (
          <Link to={`/wardAdmin/${username}/home`}>Ward Dashboard</Link>
        )}
      </nav>

      {isLoggedIn ? (
        <button className="login-btn" onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login" className="login-btn">Login</Link>
      )}
    </header>
  );
}
