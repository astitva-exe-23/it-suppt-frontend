import React, { useState, useContext } from 'react';
import { registerUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      login(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      {/* Logo/Image Placeholder */}
      <div className="mb-8">
        <img
          src="https://media.licdn.com/dms/image/v2/C4D0BAQHFqkbvHJ7M9g/company-logo_200_200/company-logo_200_200/0/1656934548100?e=1756339200&v=beta&t=ETuBSOmzcrLhtvS_EIdU5QG6tRx5Sys-YTt2omkgRyQ" // Replace with your logo path or URL
          alt="Logo"
          className="w-24 h-24 rounded-full shadow-lg object-cover"
        />
      </div>

      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-900 mb-6 text-center">Register</h2>

        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800 transition"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
