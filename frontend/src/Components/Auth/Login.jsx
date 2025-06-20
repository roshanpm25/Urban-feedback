import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const navigate=useNavigate()
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    
    const bodyData = isRegister ? { username, email, password }  : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',// is used to send data to the server 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
      } 
      else {
        alert(data.message);
        console.log('Success:', data);
        localStorage.setItem('isLoggedIn', 'true');

        const username = data.user.username; 
        navigate(`/user/${username}/home`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>

        {
        isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">{isRegister ? 'Register' : 'Login'   }   </button>

      </form>

      <br />
      
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'} </button>

    </div>
  );
};

export default Login;
