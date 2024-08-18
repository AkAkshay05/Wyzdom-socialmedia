import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PostManagement from './components/PostManagement';
import PrivateRoute from './components/PrivateRoute';
import RegisterStepOne from './components/RegisterStepOne';
import RegisterStepTwo from './components/RegisterStepTwo';
import RegisterStepThree from './components/RegisterStepThree';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-step-one" element={<RegisterStepOne />} />
          <Route path="/register-step-two" element={<RegisterStepTwo />} />
          <Route path="/register-step-three" element={<RegisterStepThree />} />
          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostManagement />
              </PrivateRoute>
            }
          />

          {/* Redirect root path */}
          <Route
            path="/"
            element={<Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
