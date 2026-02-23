import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder Components (Create these files in src/pages/)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Home from './pages/Home';

// Navbar Component
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold' }}>E-Commerce Analytics</div>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: '#fff', marginRight: '10px' }}>Dashboard</Link>
            {user.role === 'admin' && (
              <Link to="/analytics" style={{ color: '#fff', marginRight: '10px' }}>Analytics</Link>
            )}
            <button onClick={logout} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

// App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Route for All Users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Route for Admin Only (RBAC Claim) */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;