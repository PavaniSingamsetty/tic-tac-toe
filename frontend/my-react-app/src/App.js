import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'; 
import Register from './components/Register/Register';
import Game from './components/Game/Game';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div className="App">
      <Header isLoggedIn={isLoggedIn} onLoginStatusChange={handleLoginStatus} />
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <LandingPage />
              ) : (
                <Navigate to="/game" />
              )
            }
          />
          <Route path="/login"
          element={<Login onLoginStatusChange={handleLoginStatus} />
          }
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/game"
            element={<PrivateRoute element={<Game />} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
