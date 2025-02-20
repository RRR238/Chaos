import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  meno: string;
  priezvisko: string;
  zaplatene: boolean;
  od: string;
  do: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Make sure token exists before making the request
        if (!token) {
          setError('Unauthorized. Please log in again.');
          setLoading(false);
          return;
        }

        // Send request to the backend
        const response = await axios.get('http://localhost:5000/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token
          },
        });

        setUsers(response.data); // Set the user data
      } catch (err) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. You can manage users, settings, etc., here.</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Meno</th>
              <th>Priezvisko</th>
              <th>Zaplatene</th>
              <th>Od</th>
              <th>Do</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.meno}</td>
                <td>{user.priezvisko}</td>
                <td>{user.zaplatene ? '✔️' : '❌'}</td>
                <td>{user.od}</td>
                <td>{user.do}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
