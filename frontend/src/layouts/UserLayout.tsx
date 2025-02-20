import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
