// src/Components/WardAdmin/WardComplaintList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WardNavbar from './WardNavbar';

export default function WardViewComplaints() {
  const wardNo = localStorage.getItem('wardNo');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wardNo) {
      alert('❌ Ward number not found in localStorage');
      return;
    }

    fetch(`http://localhost:5000/api/complaints/ward/${wardNo}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComplaints(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching ward complaints:', err);
        setLoading(false);
      });
  }, [wardNo]);

  if (loading) return <p>Loading complaints...</p>;

  return (
    <>
   
      <div className="ward-complaints-container">
        <h2>📋 Complaints in Ward {wardNo}</h2>

        {complaints.length === 0 ? (
          <p>No complaints found in this ward.</p>
        ) : (
          complaints.map((comp) => (
            <div key={comp._id} className="complaint-card">
              <p><strong>User:</strong> {comp.username}</p>
              <p><strong>Service:</strong> {comp.service}</p>
              <p><strong>Address:</strong> {comp.address}</p>
              <p><strong>Description:</strong> {comp.description}</p>

              {comp.imagePath && (
                <img
                  src={`http://localhost:5000/${comp.imagePath}`}
                  alt="Complaint"
                  style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }}
                />
              )}

              <p><strong>Status:</strong> {comp.status}</p>
              <p><strong>Progress:</strong> {comp.statusProgress}%</p>
              <p><strong>Assigned Team:</strong> {comp.assignment?.team || 'Not assigned'}</p>
              <p><strong>Complaint Date:</strong> {new Date(comp.createdAt).toLocaleString()}</p>

              <Link to={`/wardAdmin/view/${comp._id}`}>
                <button>View / Update</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
