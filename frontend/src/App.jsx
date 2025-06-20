import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './Components/Common/Navbar'; 
import Home from './Components/Common/Home'; 
import UserHome from './Components/User/UserHome'; 
import ComplaintForm from './Components/User/ComplaintForm';
import About from './Components/Common/About';
import Help from './Components/Common/Help';
import Login from  './Components/Auth/Login';
import ViewComplaints from './Components/User/ViewComplaints';


function App() {
  return (
   <>
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/complaint/:serviceType" element={<ComplaintForm />} /> 
        <Route path="/login" element={< Login/>}/>
        <Route path="/user/:username/home" element={<UserHome />} />
        <Route path="/view-complaints" element={<ViewComplaints/>}/>


      </Routes>
    </Router>

    </>


  );
}

export default App;
