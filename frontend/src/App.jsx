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
import RoleProtectedRoute from './Components/Auth/RoleProtectedRoute';
import WardDashboard from './Components/Officer/WardDashboard';
import SuperAdminPanel from './Components/SuperAdmin/SuperAdminPanel';
import Unauthorized from './Components/Common/Unauthorized';

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
  <Route path="/login" element={<Login />} />
  <Route path="/view-complaints" element={<ViewComplaints />} />

  <Route path="/user/:username/home" element={
    <RoleProtectedRoute allowedRoles={['user']}>
      <UserHome />
    </RoleProtectedRoute>
  } />

  <Route path="/wardadmin/dashboard" element={
    <RoleProtectedRoute allowedRoles={['wardAdmin']}>
      <WardDashboard />
    </RoleProtectedRoute>
  } />

  <Route path="/superadmin/panel" element={
    <RoleProtectedRoute allowedRoles={['superAdmin']}>
      <SuperAdminPanel />
    </RoleProtectedRoute>
  } />

  {/* ✅ Missing route added */}
  <Route path="/unauthorized" element={<Unauthorized />} />
</Routes>

    </Router>

    </>


  );
}

export default App;
