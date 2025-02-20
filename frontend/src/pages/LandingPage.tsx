// src/pages/LandingLoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // We'll use axios to send HTTP requests

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/login', { email, password });

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);

      // Optionally, check the role (if included in the token) and navigate accordingly
      // For now, let's just assume all users are directed to the user dashboard
      navigate('/user'); // You can redirect based on user role here if necessary
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Navigate to Admin Login page
  const goToAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div>
      <h1>Welcome to the App</h1>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Admin login button */}
      <div>
        <p>Admin? <button onClick={goToAdminLogin}>Login as Admin</button></p>
      </div>
    </div>
  );
};

export default LandingPage;
