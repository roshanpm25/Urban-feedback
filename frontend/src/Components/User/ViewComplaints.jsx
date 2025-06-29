import React, { useEffect, useState } from 'react';

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const username = localStorage.getItem('username') || '';

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/complaints/user/${username}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Failed to fetch complaints');
          return;
        }

        setComplaints(data);
      } catch (error) {
        console.error(error);
        alert('Error fetching complaints');
      }
    };

    fetchComplaints();
  }, [username]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((c, index) => (
            <li key={index}>
              <strong>Service:</strong> {c.serviceType} <br />
              <strong>Description:</strong> {c.description} <br />
              <strong>Status:</strong> {c.status || 'Pending'} <br />
              <strong>Date:</strong> {new Date(c.createdAt).toLocaleString()} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
