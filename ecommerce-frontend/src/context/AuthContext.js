import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = "http://16.171.237.160:5000/api/";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const { token, role } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);