import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onLogin(username.trim(), password.trim())) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo">🐞 Bug Tracker</div>
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username or Email" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Login</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="account-links">
          <p>Don't have an account? <a href="#">Signup</a></p>
          <p><a href="#">Make Payment</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;