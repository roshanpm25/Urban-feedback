import React, { useEffect, useState } from 'react';

export default function WardComplaints() {
  const [complaints, setComplaints] = useState([]);
  const wardNo = localStorage.getItem('wardNo');

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/ward/${wardNo}`)
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error(err));
  }, [wardNo]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Complaints in Ward {wardNo}</h2>
      {complaints.map((c, idx) => (
        <div key={idx} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>User:</strong> {c.username}</p>
          <p><strong>Service:</strong> {c.service}</p>
          <p><strong>Details:</strong> {c.description}</p>
          <p><strong>Phone:</strong> {c.phone}</p>
        </div>
      ))}
    </div>
  );
}
