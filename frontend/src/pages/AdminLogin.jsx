import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });

      // Store admin info in localStorage or context
      localStorage.setItem('adminToken', res.data.token); // optional
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded space-y-4">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        <input type="email" placeholder="Admin Email" className="border p-2 w-full"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Admin Password" className="border p-2 w-full"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
