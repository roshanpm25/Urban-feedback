// src/Components/Officer/WardDashboard.jsx
import React, { useEffect, useState } from 'react';

export default function WardDashboard() {
  const [complaints, setComplaints] = useState([]);

const wardNo = localStorage.getItem('wardNo');

useEffect(() => {
  const wardNo = localStorage.getItem('wardNo'); // for authority
  fetch(`http://localhost:5000/api/complaints/ward/${wardNo}`)
    .then((res) => res.json())
    .then((data) => {
      setComplaints(data);
      console.log('Fetched complaints:', data);
    })
    .catch((err) => console.error(err));
}, []);



  return (
    <div>
      <h2>Ward Admin Dashboard</h2>
      <ul>
        {complaints.map((c, i) => (
          <li key={i}>
            <strong>{c.username}</strong>: {c.description} ({c.service})
          </li>
        ))}
      </ul>
    </div>
  );
}
