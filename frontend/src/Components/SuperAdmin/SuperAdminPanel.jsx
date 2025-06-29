import React, { useEffect, useState } from 'react';

export default function SuperAdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');

  // Fetch all complaints
  useEffect(() => {
    fetch('http://localhost:5000/api/complaints/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error('Error loading complaints:', err));
  }, []);

  // Fetch all users (optional)
  useEffect(() => {
    fetch('http://localhost:5000/api/users/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error loading users:', err));
  }, []);

  // Group complaints by ward number
  const complaintsByWard = complaints.reduce((acc, c) => {
    const ward = c.wardNumber || 'Unknown';
    acc[ward] = acc[ward] ? [...acc[ward], c] : [c];
    return acc;
  }, {});

  return (
    <div style={{ padding: '30px' }}>
      <h2>🔒 Super Admin Dashboard</h2>

      <h3>Total Complaints: {complaints.length}</h3>

      <hr />

      <h3>📂 Complaints by Ward</h3>
      {Object.entries(complaintsByWard).map(([ward, list]) => (
        <div key={ward} style={{ marginBottom: '20px' }}>
          <h4>Ward {ward} - {list.length} complaint(s)</h4>
          <ul>
            {list.map((c, i) => (
              <li key={i}>
                <b>{c.username}</b>: {c.description} ({c.service}) at {new Date(c.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <hr />

      <h3>👥 All Registered Users</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.username} ({u.role}) {u.wardNumber ? `- Ward ${u.wardNumber}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
