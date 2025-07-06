import React from 'react';
import WardNavbar from './WardNavbar';
import './WardAdminHome.css';

export default function WardAdminHome() {
  const wardNo = localStorage.getItem('wardNo');
  const username = localStorage.getItem('username');

  return (
    <>  <WardNavbar />
    <div className="ward-home">
   
      <div className="ward-home-content">
        <h1>Welcome, {username || 'Ward Admin'}!</h1>
        <h2>Ward No: {wardNo}</h2>

        <p>
          You are currently viewing the dashboard for <strong>Ward {wardNo}</strong>.
        </p>

        <div className="card-container">
          <div className="card">
            <h3>📝 View Complaints</h3>
            <p>Check complaints filed by residents of your ward.</p>
          </div>

          <div className="card">
            <h3>👷 Assign Teams</h3>
            <p>Assign maintenance teams to handle submitted complaints.</p>
          </div>

          <div className="card">
            <h3>📊 Track Progress</h3>
            <p>Update progress and add remarks to complaints in real-time.</p>
          </div>

          <div className="card">
            <h3>📁 Reports</h3>
            <p>Download and view summary of complaints handled this month.</p>
          </div>
        </div>

        <footer className="footer">
          &copy; 2025 Fix My City | Ward Admin Portal
        </footer>
      </div>
    </div>
    </>
  );
}
