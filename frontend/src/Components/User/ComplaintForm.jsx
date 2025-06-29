// Components/User/ComplaintForm.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ComplaintForm() {
  const { serviceType } = useParams();

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [number, setNumber] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  const complaint = {
    username,
    service: serviceType,
    description: details,
    phone: number,
    wardNo: localStorage.getItem('wardNo') || '', // optional
  };

  try {
    const res = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaint),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Failed to submit complaint');
      return;
    }

    alert(`Complaint submitted for ${serviceType}`);
    setNumber('');
    setDetails('');
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
};

 

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Complaint Form: {serviceType}</h2>

      <label>Your Name:</label><br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <label>Phone Number:</label><br />
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      /><br /><br />

      <label>Complaint Details:</label><br />
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      /><br /><br />

      <button type="submit">Submit</button>

      <p><i>(Location support coming soon...)</i></p>
    </form>
  );
}
