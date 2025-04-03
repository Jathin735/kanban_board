// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ role }) => {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   if (role && role !== userRole) {
//     return <Navigate to={`/${userRole}-dashboard`} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
