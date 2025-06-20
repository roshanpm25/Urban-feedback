// Components/User/ViewComplaints.jsx
import React, { useEffect, useState } from 'react';

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(stored);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <ul>
          {[...complaints].reverse().map((c, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>Service:</strong> {c.service}<br />
              <strong>Name:</strong> {c.username}<br />
              <strong>Phone:</strong> {c.phone}<br />
              <strong>Details:</strong> {c.description}<br />
              <strong>Time:</strong> {c.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
