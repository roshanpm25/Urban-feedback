// src/Components/Auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../Common/Navbar';

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [wardNo, setWardNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    const payload = isRegister
      ? {
          username,
          email,
          password,
          role,
          wardNo: role === 'wardAdmin' ? wardNo : ''
        }
      : { username, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Invalid credentials');
        return;
      }

      const user = data.user;
      if (!user) {
        alert("Invalid response from server");
        return;
      }

      const { username, role, wardNo, email } = user;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('email', email || '');
      localStorage.setItem('role', role);
      localStorage.setItem('wardNo', wardNo || '');

      console.log("✅ Logged in & Saved in localStorage");

      if (role === 'wardAdmin') {
        navigate(`/wardAdmin/${username}/home`);
      } else if (role === 'user') {
        navigate(`/user/${username}/home`);
      } else {
        navigate('/unauthorized');
      }
    } catch (error) {
      console.error('Login/Register Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <header><Navbar /></header>

      <div className="login-container">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

          {isRegister && (
            <>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="user">User</option>
                <option value="wardAdmin">Ward Admin</option>
              </select>

              {role === 'wardAdmin' && (
                <>
                  <label>Ward Number:</label>
                  <input type="text" value={wardNo} onChange={(e) => setWardNo(e.target.value)} required />
                </>
              )}
            </>
          )}

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>

        <br />
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'New user? Register'}
        </button>
      </div>
    </>
  );
}
