import React, { useState, useContext } from 'react';
import '../Styles/Login.css';
import { Usercontext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { setuser } = useContext(Usercontext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { phone, password };
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setuser(data)
        navigate('/');
      } else {
        console.error('Failed to log in');
        alert({ login: 'Incorrect Mobile Number or Password' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert({ login: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
