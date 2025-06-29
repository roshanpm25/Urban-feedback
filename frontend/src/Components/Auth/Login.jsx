import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

    const bodyData = isRegister
      ? { username, email, password, role, wardNo: role === 'wardAdmin' ? wardNo : undefined }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Invalid credentials');
        return;
      }

      if (!data.user || !data.user.role || !data.user.username) {
        alert('Login response missing user data');
        return;
      }

      const { username, role, wardNo } = data.user;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('wardNo', wardNo || '');

      // ✅ Role-based redirection
      if (role === 'superAdmin') {
        navigate('/superadmin/panel');
      } else if (role === 'wardAdmin') {
        navigate('/wardadmin/dashboard');
      } else if (role === 'user') {
        navigate(`/user/${username}/home`);
      } else {
        navigate('/unauthorized');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br /><br />

            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="user">User</option>
              <option value="wardAdmin">Ward Admin</option>
              <option value="superAdmin">Super Admin</option>
            </select>
            <br /><br />

            {role === 'wardAdmin' && (
              <>
                <label>Ward No:</label>
                <input
                  type="text"
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
                  required
                />
                <br /><br />
              </>
            )}
          </>
        )}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>

      <br />
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </button>
    </div>
  );
};

export default Login;
