import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DamageAssessment from './components/DamageAssessment';  

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/damage-assessment" element={<DamageAssessment />} /> {/* Added route */}
    </Routes>
  );
}

export default App;
