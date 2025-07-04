// src/Components/WardAdmin/WardAdminHome.jsx

import React from 'react';
import WardNavbar from './WardNavbar';

export default function WardAdminHome() {
  return (
    <div>
      <WardNavbar />
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>🏠 Ward Admin Dashboard</h2>

      <div style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <iframe
          title="Ward Map"
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5561520344555!2d76.94862801428708!3d10.782450992314233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859a91b2fb267%3A0x4f38aebecb8c8c4a!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1625824871234!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
