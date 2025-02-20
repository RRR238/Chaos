// src/pages/AdminLogin.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // We'll use axios to send HTTP requests

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the backend (replace with your backend URL)
      const response = await axios.post('http://localhost:5000/admin-login', { email, password });

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);

      // Redirect to the Admin Dashboard or any other protected route
      navigate('/admin'); // Change this as necessary
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="admin-email">Email:</label>
          <input
            type="email"
            id="admin-email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="admin-password">Password:</label>
          <input
            type="password"
            id="admin-password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Admin Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
