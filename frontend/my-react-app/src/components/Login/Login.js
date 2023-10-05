import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = ({ onLoginStatusChange}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailedMessage, setLoginFailedMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = 'http://localhost:5000/game/login';
  
    const requestBody = {
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
  
      if (response.status === 200) {
        onLoginStatusChange(true);
        navigate('/game');
      }  else {
        setLoginFailedMessage(responseData.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Username:</label>
          <input
            type="username"
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
        <button type="submit" className="btn">Login</button>
        {loginFailedMessage && <p className="error-message">{loginFailedMessage}</p>}
        <div>
          <span>New User? </span>
          <button type="button" className="btn" onClick={goToRegister}>
            Register
          </button>
        </div>
      </form> 
    </div>
  );
};

export default Login;
