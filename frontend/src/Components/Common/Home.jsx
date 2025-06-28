import React from 'react';
import './Home.css';
import logo from '../../assets/logo.png';        // Adjust path to your image
import monitor from '../../assets/monitor.png';  // Adjust path to your image

const Home = () => {
  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Fix My City</span>
        </div>
        <nav className="nav-links">
          <a href="Home.jsx">Home</a>
          <a href="About.jsx">About Us</a>
          <a href="#">Help</a>
        </nav>
        <a href="#" className="login-btn">Login</a>
      </header>

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
  );
};

export default Home;
