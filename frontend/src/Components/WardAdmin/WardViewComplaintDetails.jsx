// src/Components/WardAdmin/ViewComplaintDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WardNavbar from './WardNavbar';

export default function ViewComplaintDetails() {
  const { complaintId } = useParams();
  const [details, setDetails] = useState(null);
  const [progress, setProgress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!complaintId) {
      setError('❌ Complaint ID not found in URL');
      return;
    }

    fetch(`http://localhost:5000/api/complaints/${complaintId}`)
      .then(res => {
        if (!res.ok) throw new Error('Complaint not found');
        return res.json();
      })
      .then(data => {
        setDetails(data);
        setProgress(data.statusProgress || '');
        setNote(data.statusNote || '');
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

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!details) return <p>Loading complaint details...</p>;

  return (
    <div>
      <WardNavbar />
      <h2>Complaint Details</h2>

      <p><strong>Service:</strong> {details.service}</p>
      <p><strong>Status:</strong> {details.status}</p>
      <p><strong>Description:</strong> {details.description}</p>
      <p><strong>Phone:</strong> {details.phone}</p>
      <p><strong>Date:</strong> {new Date(details.createdAt).toLocaleString()}</p>

      {details.assignment ? (
        <>
          <h3>Assigned Team</h3>
          <p><strong>Team:</strong> {details.assignment.team}</p>
          <p><strong>Notes:</strong> {details.assignment.notes}</p>
        </>
      ) : (
        <p><i>No team assigned yet.</i></p>
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
