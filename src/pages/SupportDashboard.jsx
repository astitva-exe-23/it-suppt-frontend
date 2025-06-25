import React, { useEffect, useState, useContext } from 'react';
import { getAllTicketsSupport, assignTicketSupport, resolveTicketSupport } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../api/api';

export default function SupportDashboard() {
  const { user, logout } = useContext(AuthContext); // get logged-in user and logout handler
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await getAllTicketsSupport();
      setTickets(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tickets');
    }
  };

  const handleAssign = async (id) => {
    try {
      await assignTicketSupport(id);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Assign failed');
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveTicketSupport(id);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Resolve failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
    } catch (err) {
      console.error('Logout failed');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white relative">
      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow"
        >
          Logout
        </button>
      </div>

      <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Support Dashboard</h2>

      {error && (
        <p className="text-center text-red-600 font-semibold mb-6">{error}</p>
      )}

      {tickets.length === 0 && (
        <p className="text-center text-gray-500">No tickets found.</p>
      )}

      <div className="space-y-6">
        {tickets.map(ticket => (
          <div
            key={ticket._id}
            className="bg-white bg-opacity-30 backdrop-blur-md border border-white rounded-lg p-6 shadow-md"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">{ticket.title}</h3>
            <p className="mb-3 text-gray-700">{ticket.description}</p>

            <p className="mb-1"><span className="font-semibold">Status:</span> {ticket.status}</p>
            <p className="mb-4"><span className="font-semibold">Assigned To:</span> {ticket.assignedTo?.name || 'Unassigned'}</p>

            <div className="flex gap-4">
              {ticket.status !== 'resolved' && !ticket.assignedTo && (
                <button
                  onClick={() => handleAssign(ticket._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Assign to Me
                </button>
              )}

              {ticket.status !== 'resolved' && ticket.assignedTo === user._id && (
                <button
                  onClick={() => handleResolve(ticket._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
