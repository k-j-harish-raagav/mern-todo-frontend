import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (endpoint) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/${endpoint}`, { email, password });
      setUser(res.data.user);
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div>
      <h3>Login / Signup</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={() => handleAuth('login')}>Login</button>
      <button onClick={() => handleAuth('signup')}>Signup</button>
    </div>
  );
}

export default Auth;