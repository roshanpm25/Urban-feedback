// src/Components/WardAdmin/AssignMembers.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WardNavbar from './WardNavbar'; // ✅ Use ward-specific navbar

export default function AssignMembers() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!team.trim()) {
      return setError('Team members field cannot be empty');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${complaintId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: team.split(',').map(member => member.trim()), // clean comma-separated input
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.error || 'Assignment failed');
      }

      alert('✅ Team assigned successfully');
      navigate('/wardAdmin/complaints');
    } catch (err) {
      console.error('Error assigning team:', err);
      setError('Server error while assigning team');
    }
  };

  return (
    <div>
      <WardNavbar />
      <h2>Assign Team to Complaint</h2>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <form onSubmit={handleAssign}>
        <label>Team Members (comma separated):</label><br />
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="e.g. Ravi, Priya, Mohan"
          required
        /><br /><br />

        <label>Additional Notes:</label><br />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Any special instructions or remarks"
        /><br /><br />

        <button type="submit">Assign Team</button>
      </form>
    </div>
  );
}
