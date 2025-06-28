import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const username=localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };


  return (
    <nav style={{ marginBottom: '20px' }}>
      {/* <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '15px' }}>About</Link>
      <Link to="/help" style={{ marginRight: '15px' }}>Help</Link> */}
 {isLoggedIn ? (
        <Link to={`/user/${username}/home`} style={{ marginRight: '15px' }}>Home</Link>
      ) 
      :
       (
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      )}

      <Link to="/about" style={{ marginRight: '15px' }}>About</Link>
      <Link to="/help" style={{ marginRight: '15px' }}>Help</Link>

      {isLoggedIn ? (
        <>
          <Link to="/view-complaints" style={{ marginLeft: '15px', marginRight: '15px' }}>
            View All Complaints
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ marginLeft: '15px' }}>
          Login
        </Link>
      )}

</nav>
      

      ) }



