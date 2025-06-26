import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import BugTracker from './components/BugTracker';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (username, password) => {
    // Simple authentication - in production, this would be handled by a proper auth system
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              !showLogin ? (
                <LandingPage onShowLogin={handleShowLogin} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <BugTracker onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;