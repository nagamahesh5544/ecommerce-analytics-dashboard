import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to E-Commerce Analytics</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}