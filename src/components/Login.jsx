// components/Login.jsx
import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
    } else if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address.');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters.');
    } else {
      setError('');
      fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          onLoginSuccess(); // triggers services page load
        } else {
          setError(data.error || 'Login failed.');
        }
      })
      .catch(() => setError('Login failed due to network error.'));
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h3>Login</h3>
      {error && <div className="error">{error}</div>}
      <label>Email:</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
