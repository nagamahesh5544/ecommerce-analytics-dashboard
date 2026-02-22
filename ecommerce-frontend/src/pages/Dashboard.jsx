import { useEffect, useState } from 'react';
import { getAnalytics } from '../api';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token'); // Get token from login

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAnalytics(token);
      setData(result);
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Revenue Analytics</h1>
      {data.map((row) => (
        <div key={row.sale_date}>
          <p>Date: {row.sale_date}</p>
          <p>Revenue: ${row.daily_revenue}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;