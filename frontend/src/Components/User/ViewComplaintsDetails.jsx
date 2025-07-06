import React, { useEffect, useState } from 'react';
import UserNav from './UserNav';
import './ViewComplaints.css';

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      setError('❌ Username not found in localStorage');
      return;
    }

    fetch(`http://localhost:5000/api/complaints/user/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch complaints');
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComplaints(sorted);
      })
      .catch((err) => {
        console.error(err);
        setError('❌ Could not load complaints');
      });
  }, [username]);

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!complaints.length) return <p style={{ textAlign: 'center' }}>You haven’t filed any complaints yet.</p>;

  return (
    <>
     <UserNav />
    <div className="complaints-container">
     
      <h2>My Complaints</h2>
      <div className="complaints-list">
        {complaints.map((comp) => (
          <div key={comp._id} className="complaint-card">
            <div className="complaint-info">
              <h3>{comp.service} Complaint</h3>
              <p><strong>Description:</strong> {comp.description}</p>
              <p><strong>Phone:</strong> {comp.phone}</p>
              <p><strong>Address:</strong> {comp.address || 'Not provided'}</p>
              <p><strong>Submitted:</strong> {new Date(comp.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {comp.status} ({comp.statusProgress}%)</p>
              <p><strong>Remarks:</strong> {comp.statusNote || 'Not updated yet'}</p>

              {comp.assignment && (
                <>
                  <p><strong>Team Assigned:</strong> {comp.assignment.team}</p>
                  <p><strong>Team Notes:</strong> {comp.assignment.notes}</p>
                </>
              )}

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${comp.statusProgress || 0}%` }}
                ></div>
              </div>
            </div>

            {comp.imageUrl && (
              <img
                src={`http://localhost:5000/uploads/${comp.imageUrl}`}
                alt="Complaint"
                style={{ width: '120px', height: 'auto', borderRadius: '10px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
