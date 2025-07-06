// src/Components/WardAdmin/AssignMembers.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WardNavbar from './WardNavbar';

export default function AssignMembers() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState('');
  const [notes, setNotes] = useState('');

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/assignments/${complaintId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, notes }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);
      alert('✅ Team assigned');
      navigate('/wardAdmin/complaints');
    } catch (err) {
      alert('❌ Assignment failed');
    }
  };

  return (
    <div>
      <WardNavbar />
      <h2>Assign Members</h2>
      <form onSubmit={handleAssign}>
        <label>Team (comma-separated):</label><br />
        <input value={team} onChange={(e) => setTeam(e.target.value)} required />
        <br /><br />
        <label>Notes:</label><br />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        <br /><br />
        <button type="submit">Assign</button>
      </form>
    </div>
  );
}
