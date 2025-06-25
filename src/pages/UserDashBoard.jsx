import React, { useEffect, useState, useContext } from 'react';
import { getMyTickets, createTicket, logoutUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function UserDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await getMyTickets();
      setTickets(res.data);
    } catch (err) {
      setError('Failed to fetch tickets');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createTicket(form);
      setForm({ title: '', description: '' });
      fetchTickets();
    } catch (err) {
      setError('Failed to create ticket');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center p-6">
      {/* Logo / Topbar */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">IT Support</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome Text */}
      <div className="mb-6 w-full max-w-4xl text-left">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user?.name}</h2>
      </div>

      {/* Ticket Form */}
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mb-10 border border-white">
        <h3 className="text-xl font-bold mb-4 text-blue-700">Create a Ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Issue Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <textarea
            name="description"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Ticket List */}
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-blue-700">My Tickets</h3>
        <div className="space-y-4">
          {tickets.map(t => (
            <div
              key={t._id}
              className="bg-white/30 backdrop-blur-md p-4 rounded-lg border border-white shadow"
            >
              <h4 className="font-semibold text-lg">{t.title}</h4>
              <p className="text-gray-700 text-sm italic mb-1">Status: {t.status}</p>
              <p className="text-gray-800 mb-2">{t.description}</p>
              <p className="text-blue-800">
                <strong>Suggestion:</strong>{' '}
                {t.suggestion ? t.suggestion : <em>No suggestion yet</em>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
