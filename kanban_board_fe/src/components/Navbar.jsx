import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Only show navbar if token and userId exist
  if (!token || !userId) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        Kanban Board
      </h1>
      <div className="space-x-4">
        <button onClick={() => navigate('/dashboard')} className="hover:underline">
          Dashboard
        </button>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
