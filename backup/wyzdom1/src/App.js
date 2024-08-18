// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';

import './App.css'; // Import global styles if any


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route to the login page */}
          <Route path="/login" element={<Login />} />
          {/* Route to the register page */}
          <Route path="/register" element={<Register />} />
          {/* Redirect root path to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
