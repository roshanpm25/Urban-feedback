// src/Components/WardAdmin/ViewComplaints.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WardNavbar from './WardNavbar';

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wardNo = localStorage.getItem('wardNo');
    if (!wardNo) {
      setError('⚠️ Ward number not found in localStorage.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/complaints/ward/${wardNo}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Server returned an error');
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          setError('⚠️ Invalid data format received from server.');
        } else {
          setComplaints(data);
        }
      })
      .catch(err => {
        console.error("❌ Error fetching complaints:", err);
        setError('❌ Failed to fetch complaints. Please try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>🔄 Loading complaints...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <WardNavbar />
      <h2>📋 Ward Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found for this ward.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Service</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
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
                  {" | "}
                  <Link to={`/wardAdmin/complaints/${complaint._id}/status`}>Update Status</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
