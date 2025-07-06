
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WardNavbar from './WardNavbar';

export default function ViewComplaintDetails() {
  const { complaintId } = useParams();
  const [details, setDetails] = useState(null);
  const [progress, setProgress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [team, setTeam] = useState('');
  const [teamNotes, setTeamNotes] = useState('');

  useEffect(() => {
    if (!complaintId) {
      setError('❌ Complaint ID not found in URL');
      return;
    }

    fetch(`http://localhost:5000/api/complaints/${complaintId}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data);
        setProgress(data.statusProgress || '');
        setNote(data.statusNote || '');
        setTeam(data.assignment?.team || '');
        setTeamNotes(data.assignment?.notes || '');
      })
      .catch(err => {
        console.error('Error fetching complaint:', err);
        setError('❌ Failed to fetch complaint details');
      });
  }, [complaintId]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    if (progress < 0 || progress > 100 || isNaN(progress)) {
      alert('Progress must be between 0 and 100');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/status/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusProgress: progress, statusNote: note }),
      });

      const updated = await res.json();
      if (!res.ok) {
        alert(updated.error || 'Failed to update status');
        return;
      }

      alert('✅ Status updated successfully');
      setDetails(updated);
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error while updating status');
    }
  };

  const handleTeamUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/assignments/${complaintId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, notes: teamNotes }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || 'Failed to assign team');
        return;
      }

      alert('✅ Team assignment updated!');
      setEditMode(false);

      // Fetch latest complaint details
      const updated = await fetch(`http://localhost:5000/api/complaints/${complaintId}`);
      const data = await updated.json();
      setDetails(data);
    } catch (err) {
      console.error('Team update error:', err);
      alert('Error updating team assignment');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!details) return <p>Loading complaint details...</p>;

  return (
    <div>
      <WardNavbar />
      <h2>Complaint Details</h2>

      <p><strong>Service:</strong> {details.service}</p>
      <p><strong>Status Progress:</strong> {details.statusProgress}%</p>
      <p><strong>Status Note:</strong> {details.statusNote}</p>
      <p><strong>Description:</strong> {details.description}</p>
      <p><strong>Phone:</strong> {details.phone}</p>
      <p><strong>Date:</strong> {new Date(details.createdAt).toLocaleString()}</p>

      <hr />
      <h3>Team Assignment</h3>
      {details.assignment ? (
        <>
          <p><strong>Team:</strong> {details.assignment.team}</p>
          <p><strong>Notes:</strong> {details.assignment.notes}</p>
        </>
      ) : (
        <p><i>No team assigned yet.</i></p>
      )}
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Cancel Edit' : '✏️ Edit Team Assignment'}
      </button>

      {editMode && (
        <form onSubmit={handleTeamUpdate}>
          <label>Team Name:</label><br />
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          /><br /><br />

          <label>Team Notes:</label><br />
          <textarea
            rows={3}
            value={teamNotes}
            onChange={(e) => setTeamNotes(e.target.value)}
            required
          /><br /><br />

          <button type="submit">Update Assignment</button>
        </form>
      )}

      <hr />
      <h3>Update Work Progress</h3>
      <form onSubmit={handleStatusUpdate}>
        <label>Progress (%):</label><br />
        <input
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          required
        /><br /><br />

        <label>Remarks:</label><br />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          required
        /><br /><br />

        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}
