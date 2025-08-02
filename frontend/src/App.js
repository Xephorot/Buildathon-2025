import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages (to be created in later tasks)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import SpecialistPortal from './pages/SpecialistPortal';
import HospitalPortal from './pages/HospitalPortal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/specialist" element={<SpecialistPortal />} />
          <Route path="/hospital" element={<HospitalPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;