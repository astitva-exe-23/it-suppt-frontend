import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);

      const role = res.data.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'support') navigate('/support');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl w-full max-w-md p-8 text-white">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-300">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <div className="mt-6 text-center text-sm text-white/70">
          Don't have an account? <span className="text-blue-300">Ask Admin to Register</span>
        </div>
      </div>
    </div>
  );
}
