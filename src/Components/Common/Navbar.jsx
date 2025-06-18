import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Help from './Help';


export default function Navbar() {
  return (
    <>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '15px' }}>About</Link>
        <Link to="/help" style={{ marginRight: '15px' }}>Help</Link>
       
      </nav>

      {/* All Routes are here
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
     </Routes> */}
    </>
  );
}
