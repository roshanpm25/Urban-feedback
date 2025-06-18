import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Import all
import Navbar from './Components/Common/Navbar'; // Optional: if you have a navbar
import Home from './Components/Common/Home'; // ✅ Import your Home
import UserHome from './Components/User/UserHome'; // ✅ Import your User Home
import ComplaintForm from './Components/User/ComplaintForm';
import About from './Components/Common/About';
import Help from './Components/Common/Help';

function App() {
  return (
   <>
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        {/* <Route path="/user-home" element={<UserHome />} />
        <Route path="/complaint/:serviceType" element={<ComplaintForm />} /> */}
      </Routes>
    </Router>

    </>


  );
}

export default App;
