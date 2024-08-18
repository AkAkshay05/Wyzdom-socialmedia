// src/components/RegisterStepThree.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the Axios instance
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RegisterStepThree = () => {
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    role: '',
    profilePicture: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
    const stepTwoData = JSON.parse(localStorage.getItem('stepTwoData'));
    if (!stepOneData || !stepTwoData) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine data from all steps
    const stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
    const stepTwoData = JSON.parse(localStorage.getItem('stepTwoData'));
    const completeFormData = { ...stepOneData, ...stepTwoData, ...formData };

    const formDataToSend = new FormData();
    Object.keys(completeFormData).forEach((key) => {
      formDataToSend.append(key, completeFormData[key]);
    });

    try {
      const response = await api.post('signup/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="form-header">
        <img src="/wyzdom_logo.png" alt="WYZdom Logo" className="logo" />
        <h2>Complete Your Profile</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={formData.display_name}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="submit-button">
          Complete Registration
        </button>
      </form>
      <button onClick={() => navigate('/register-step-two')}><FontAwesomeIcon icon={faArrowLeft} /></button>
    </div>
  );
};

export default RegisterStepThree;
