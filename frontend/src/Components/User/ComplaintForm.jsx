// Components/User/ComplaintForm.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ComplaintForm() {
  const { serviceType } = useParams();

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [number, setNumber] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaint = {
      username,
      phone: number,
      service: serviceType,
      description: details,
      timestamp: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem('complaints')) || [];
    existing.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(existing));

    alert(`Complaint submitted for ${serviceType}\nName: ${username}\nDetails: ${details}`);

    setUsername('');
    setNumber('');
    setDetails('');
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
