// src/components/RegisterStepOne.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegisterStepOne = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone_number: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('stepOneData', JSON.stringify(formData));
    navigate('/register-step-two');
  };

  return (
    <div className="register-container">
      <div className="form-header">
        <img src="/wyzdom_logo.png" alt="WYZdom Logo" className="logo" />
        <h2>Sign Up - Step 1</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    </div>
  );
};

export default RegisterStepOne;
