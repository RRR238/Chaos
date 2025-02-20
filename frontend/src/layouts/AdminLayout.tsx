import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* This renders the nested admin routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
