import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {

  return (
    
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute role="admin" />}> */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute role="user" />}> */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;