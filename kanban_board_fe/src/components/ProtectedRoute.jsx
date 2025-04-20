// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ role }) => {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role');

//   if (!token) {
//     // If no token, redirect to login page
//     return <Navigate to="/" replace />;
//   }

//   // If the role doesn't match the userRole, redirect to the correct dashboard based on userRole
//   if (!userRole) {
//     // If userRole is not set, redirect to login (you can change this to another fallback page)
//     return <Navigate to="/login" replace />;
//   }

//   if (role && role !== userRole) {
//     // Redirect to the corresponding dashboard based on userRole
//     return <Navigate to={`/${userRole}-dashboard`} replace />;
//   }

//   // If role matches userRole, render the requested route
//   return <Outlet />;
// };

// export default ProtectedRoute;
