const API_URL = "http://16.171.237.160:5000/api/";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};



export const getAnalytics = async (token) => {
  const res = await fetch(`${API_URL}/analytics/revenue`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
};