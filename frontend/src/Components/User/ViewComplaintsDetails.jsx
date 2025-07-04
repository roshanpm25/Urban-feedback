

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ViewComplaintDetails() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const wardNo = localStorage.getItem('wardNo');

    if (!wardNo) {
      setError('Ward number not found in localStorage');
      return;
    }

    fetch(`http://localhost:5000/api/complaints/ward/${wardNo}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setError('Invalid data format received from server');
        } else {
          setComplaints(data);
        }
      })
      .catch(err => {
        console.error("Error fetching complaints:", err);
        setError('Failed to fetch complaints');
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;

  return (
    <div>
      <h2>Ward Complaints</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Service</th>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.service}</td>
              <td>{complaint.username}</td>
              <td>{complaint.status}</td>
              <td>
                <Link to={`/ward/view/${complaint._id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
