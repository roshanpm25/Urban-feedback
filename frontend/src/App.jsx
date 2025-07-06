
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Login from './Components/Auth/Login';
import Home from './Components/Common/Home';
import About from './Components/Common/About';
import Help from './Components/Common/Help';

// User Components
import UserHome from './Components/User/UserHome';
import UpdateStatus from './Components/User/UpdateStatus';
import ViewComplaints from './Components/User/ViewComplaintsDetails';
import ViewComplaintsDetails from './Components/User/ViewComplaintsDetails'; 
import ComplaintForm from './Components/User/ComplaintForm';


// Ward Admin Components
import WardAdminHome from './Components/WardAdmin/WardAdminHome';
import ComplaintManager from './Components/WardAdmin/ComplaintManager';
import AssignMembers from './Components/WardAdmin/AssignMembers';
import WardViewComplaintDetails from './Components/WardAdmin/WardViewComplaintDetails';
import WardViewComplaints from './Components/WardAdmin/WardViewComplaints';
import WardUpdateStatus from './Components/WardAdmin/WardUpdateStatus';



function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Common Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />

        {/* ✅ User Pages */}
        <Route path="/user/:username/home" element={<UserHome />} />
        <Route path="/user/complaints" element={<ViewComplaints />} />
        <Route path="/user/complaint/:serviceType" element={<ComplaintForm />} />
        <Route path="/user/complaints/:complaintId" element={<ViewComplaintsDetails />} /> 

        {/* ✅ Ward Admin Pages */}
        <Route path="/wardAdmin/:username/home" element={<WardAdminHome />} />
        <Route path="/wardAdmin/complaints" element={<ComplaintManager />} />
        <Route path="/wardAdmin/assign/:complaintId" element={<AssignMembers />} />
        <Route path="/wardAdmin/view/:complaintId" element={<WardViewComplaintDetails />} />
        <Route path="/ward/view/:complaintId" element={<WardViewComplaintDetails />} />
        <Route path="/ward/complaints" element={<WardViewComplaints />} />
        <Route path="/wardAdmin/complaints/:complaintId/status" element={<WardUpdateStatus />} />

      </Routes>
    </Router>
  );
}

export default App;
