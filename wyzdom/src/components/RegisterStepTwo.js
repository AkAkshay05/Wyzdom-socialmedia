// src/components/RegisterStepTwo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RegisterStepTwo = () => {
   var Dob="";
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
    if (!stepOneData) {
      navigate('/register-step-one');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateOfBirth({ ...dateOfBirth, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Dob=dateOfBirth;
    localStorage.setItem('stepTwoData', JSON.stringify(Dob));
    navigate('/register-step-three');
  };

  return (
    <div className="register-container">
      <div className="form-header">
        <img src="/wyzdom_logo.png" alt="WYZdom Logo" className="logo" />
        <h2>Add Your Birthday</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
        
          <select name="month" value={dateOfBirth.month} onChange={handleChange} required>
            <option value="">Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </label>
        <label>
         
          <select name="day" value={dateOfBirth.day} onChange={handleChange} required>
            <option value="">Day</option>
            {/* Add days 1 to 31 */}
            {[...Array(31).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label>
         
          <select name="year" value={dateOfBirth.year} onChange={handleChange} required>
            <option value="">Year</option>
            {/* Add years */}
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={2024 - i}>{2024 - i}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit-button">Next</button>
      </form>
      <button onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} /></button>
    </div>
  );
};


export default RegisterStepTwo;
