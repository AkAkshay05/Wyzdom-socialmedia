// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login/', credentials);
      console.log("succsss"+response.data.access)
      localStorage.setItem('token', response.data.access); // Store the access token
      const tokens = response.data.access;
      localStorage.setItem('authToken', tokens);
      navigate('/posts',response.data.access); // Redirect to a protected page
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-header">
        <img src="/wyzdom_logo.png" alt="WYZdom Logo" className="logo" />
        <h2>Log In</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Log In
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
      <footer>
        <a href="/terms">Terms of Use</a> | <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default Login;
