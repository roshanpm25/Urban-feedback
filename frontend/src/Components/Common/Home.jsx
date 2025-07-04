import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';
import monitor from '../../assets/monitor.png';
import Navbar from '../Common/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <>
    <div className="home-page">
    
    {/* navbar section */}
      <header><Navbar /></header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Fix My City</h1>
        <p>
          Report civic issues in your area with location, images, and status tracking — all in one place.
        </p>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card">
          <h2>245</h2>
          <p>Total Complaints</p>
        </div>
        <div className="stat-card">
          <h2>123</h2>
          <p>Feedback Given</p>
        </div>
        <div className="stat-card">
          <h2>89</h2>
          <p>Issues Resolved</p>
        </div>
      </section>

      {/* Image Section */}
      <section className="info-section">
        <img src={monitor} alt="Monitor" />
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Fix My City | All rights reserved
      </footer>
    </div>
    </>
  );
};

export default Home;
