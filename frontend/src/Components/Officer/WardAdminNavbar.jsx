import React from 'react';
import { Link } from 'react-router-dom';

export default function WardAdminNavbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#004d99', color: 'white' }}>
      <Link to="/officer/home" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
      <Link to="/officer/ward-complaints" style={{ marginRight: '15px', color: 'white' }}>Complaints</Link>
      <Link to="/officer/dashboard" style={{ color: 'white' }}>Dashboard</Link>
      <span style={{ float: 'right' }}>Role: Ward Admin</span>
    </nav>
  );
}
