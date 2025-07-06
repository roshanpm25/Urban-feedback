
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WardNavbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'wardAdmin'; // fallback

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user data
    navigate('/login');   // Redirect to login
  };

  return (
    <nav style={{
      backgroundColor: '#004466',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '25px',
        margin: 0,
        padding: 0
      }}>
        <li><Link to={`/wardAdmin/${username}/home`} style={{ color: '#fff', textDecoration: 'none' }}>🏠 Home</Link></li>
        <li><Link to="/wardAdmin/complaints" style={{ color: '#fff', textDecoration: 'none' }}>📋 Complaints</Link></li>
      </ul>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#ff4d4d',
          color: '#fff',
          border: 'none',
          padding: '8px 14px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        🔒 Logout
      </button>
    </nav>
  );
}
