import React, { useEffect, useState } from 'react';
import { getAllTickets, getSupportStats, registerSupport } from '../api/api';

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [supportStats, setSupportStats] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const [ticketRes, statsRes] = await Promise.all([
        getAllTickets(),
        getSupportStats()
      ]);
      setTickets(ticketRes.data);
      setSupportStats(statsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to load admin data');
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegisterSupport = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await registerSupport(form);
      setMessage('Support user registered');
      setForm({ name: '', email: '', password: '' });
      fetchData();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-blue-900 mb-6">Admin Dashboard</h2>

      {error && (
        <p className="mb-4 px-4 py-2 bg-red-200 text-red-800 rounded w-full max-w-3xl text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 px-4 py-2 bg-green-200 text-green-800 rounded w-full max-w-3xl text-center">
          {message}
        </p>
      )}

      <section className="w-full max-w-3xl mb-10 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow border border-white">
        <h3 className="text-2xl font-semibold mb-4 text-blue-900">Register Support User</h3>
        <form className="flex flex-col space-y-4" onSubmit={handleRegisterSupport}>
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
            className="bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
            type="submit"
          >
            Register
          </button>
        </form>
      </section>

      <section className="w-full max-w-6xl mb-10">
        <h3 className="text-3xl font-semibold text-blue-900 mb-6">All Tickets</h3>
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white/30 backdrop-blur-md p-5 rounded-lg shadow border border-white"
            >
              <p>
                <strong>Title:</strong> {ticket.title}
              </p>
              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
              <p>
                <strong>Assigned To:</strong> {ticket.assignedTo?.name || 'Unassigned'}
              </p>
              <p>
                <strong>Created By:</strong> {ticket.createdBy?.name || 'User'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-3xl">
        <h3 className="text-3xl font-semibold text-blue-900 mb-6">Support Stats</h3>
        <div className="space-y-3">
          {supportStats.map((stat) => (
            <p
              key={stat.supportId}
              className="bg-white/30 backdrop-blur-md p-4 rounded shadow border border-white"
            >
              {stat.name} - Tickets Resolved: {stat.count}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
