import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationFailedMessage, setRegistrationFailedMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:5000/game/register';

    const requestBody = {
      email,
      username,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        navigate('/login');
      } else {
        setRegistrationFailedMessage(responseData.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
        {registrationFailedMessage && <p className="error-message">{registrationFailedMessage}</p>}
        <div>
        <span>Already have an account?</span>
        <button className="btn" onClick={handleLoginRedirect}>Back to Login</button>
      </div>
      </form>
    </div>
  );
};

export default Register;
