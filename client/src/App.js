// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Neighbourhood from './pages/Neighbourhood';
import Index from './pages/Index';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/neighbourhood" element={<Neighbourhood />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
};
// Default path is first one
export default App;


