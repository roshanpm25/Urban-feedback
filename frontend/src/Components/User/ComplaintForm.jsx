import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNav from './UserNav';
import './ComplaintForm.css';

export default function ComplaintForm() {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
    setEmail(localStorage.getItem('email') || '');
    setWardNo(localStorage.getItem('wardNo') || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !wardNo || !phone || !description || !address) {
      alert('⚠️ Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('wardNo', wardNo);
    formData.append('service', serviceType.charAt(0).toUpperCase() + serviceType.slice(1));
    formData.append('phone', phone);
    formData.append('description', description);
    formData.append('address', address);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || '❌ Submission failed');
        return;
      }
      alert('✅ Complaint submitted successfully!');
      navigate('/user/complaints');
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="complaint-form-container">
      <UserNav />
      <div className="complaint-form-box">
        <h2>🚨 Lodge Complaint for: {serviceType}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Ward No:</label>
          <input type="text" value={wardNo} onChange={(e) => setWardNo(e.target.value)} />

          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />

          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label>Upload Image (optional):</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}
