import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
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
          Report civic issues in your area with location, images, and status tracking all in one place.
        </p>
      </section>
      {/* Steps to Use Section */}
<section className="steps">
  <h2>How to Use This Application</h2>
  <ol>
    <li>🔐 <strong>Login/Register</strong> with your username and role (User or Ward Admin).</li>
    <li>📝 <strong>Lodge Complaints</strong> by selecting the service and filling in your issue.</li>
    <li>📂 <strong>Track Complaint</strong> status updates and team progress under "My Complaints".</li>
    <li>🛠️ <strong>Ward Admins</strong> can view, assign teams, and update complaint progress.</li>
    <li>✅ <strong>Get Resolved!</strong> Once the issue is handled, mark it as completed.</li>
  </ol>
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

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Fix My City | All rights reserved
      </footer>
    </div>
    </>
  );
};

export default Home;
