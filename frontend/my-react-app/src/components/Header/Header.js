import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css'; // Import your CSS file

const Header = ({ isLoggedIn, onLoginStatusChange }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://cdn-icons-png.flaticon.com/128/566/566294.png" alt="Logo" className='logo'/>
      </div>
      <div className="title">
        <h1>Tic-Tac-Toe</h1>
      </div>
      <div className="user-actions">
      {isLoggedIn ? (
          <Link to="/" onClick={() => onLoginStatusChange(false)} className="logout-button">Logout</Link>
        ) : (
          <Link to="/login" className="login-button">Login/ Register</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
