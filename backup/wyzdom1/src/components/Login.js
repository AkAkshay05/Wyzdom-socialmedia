// // src/components/Login.js
// import React, { useState } from 'react';
// import './Login.css';
// import api from '../api'; // Import the Axios instance

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     usernameOrEmail: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('login/', credentials); // Adjust the endpoint as needed
//       console.log(response.data); // Handle successful login, e.g., store token, redirect
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="form-header">
//         <img src="/wyzdom_logo.png" alt="WYZdom Logo" className="logo" />
//         <h2>Log In</h2>
//       </div>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="usernameOrEmail"
//           placeholder="Username or Email"
//           value={credentials.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="submit-button">
//           Log In
//         </button>
//       </form>
//       <p>
//         Don't have an account? <a href="/register">Sign Up</a>
//       </p>
//       <footer>
//         <a href="/terms">Terms of Use</a> | <a href="/privacy">Privacy Policy</a>
//       </footer>
//     </div>
//   );
// };

// export default Login;


// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import api from '../api'; // Ensure this path correctly points to your Axios instance
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '', // Ensure this key matches what's expected by your backend
    password: '',
  });

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
      const response = await api.post('login/', credentials); // Make sure the endpoint matches your Django backend
      console.log('Login successful:', response.data);
      navigate('/dashboard'); 
      // Handle successful login, e.g., store the token, redirect, etc.
    } catch (error) {
      console.error('Login failed:', error.response?.data?.detail || error.message);
      // Optionally handle errors more gracefully here (e.g., show a message to the user)
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
          value={credentials.username} // Corrected to match the state key
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
