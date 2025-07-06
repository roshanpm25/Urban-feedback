// src/Components/WardAdmin/ComplaintManager.jsx

import React from 'react';
import ViewComplaints from './WardViewComplaints';
import WardNavbar from './WardNavbar'; 

export default function ComplaintManager() {
  return (
    <div>
      <WardNavbar /> {/* ✅ Include navbar if needed */}
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Complaint Management Dashboard</h1>
      <ViewComplaints />
    </div>
  );
}
