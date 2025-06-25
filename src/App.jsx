import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import SupportDashboard from './pages/SupportDashboard.jsx';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
} />
         <Route path="/support" element={
          <ProtectedRoute>
            <SupportDashboard />
          </ProtectedRoute>
        } />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
