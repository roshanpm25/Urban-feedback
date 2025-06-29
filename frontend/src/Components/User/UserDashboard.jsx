import React from 'react';

const UserDashboard = () => {
  const username = localStorage.getItem('username');
  const wardNo = localStorage.getItem('wardNo');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {username}</h2>
      <p>Your ward number: {wardNo}</p>
    </div>
  );
};

export default UserDashboard;
