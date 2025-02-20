import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  return (
    <nav style={styles.sidebar}>
      <h2>Admin Panel</h2>
      <ul style={styles.navList}>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "#333",
    color: "#fff",
    padding: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
};

export default AdminSidebar;
