import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StatePlaces from './pages/StatePlaces';
import PlaceDetails from './pages/PlaceDetails';
import Admin from './pages/Admin'; // Admin Import kiya

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:stateId" element={<StatePlaces />} />
        <Route path="/place/:placeId" element={<PlaceDetails />} />
        
        {/* 🛠️ Secret Admin Control Route */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;