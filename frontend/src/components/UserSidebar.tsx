import React from "react";
import { Link } from "react-router-dom";

const UserSidebar: React.FC = () => {
  return (
    <nav style={styles.sidebar}>
      <h2>User Panel</h2>
      <ul style={styles.navList}>
        <li><Link to="/user">Dashboard</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>
        <li><Link to="/user/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "#444",
    color: "#fff",
    padding: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
};

export default UserSidebar;
