// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    setUser(stored);
  }, []);

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">IT Support Portal</h1>
      {user ? (
        <div className="flex gap-4 items-center">
          <span>{user.name} ({user.role})</span>
          <button className="bg-red-600 px-4 py-1 rounded" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
