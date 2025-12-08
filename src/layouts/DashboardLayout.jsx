import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-3 bg-base-200 min-h-screen p-5">
        <DashboardSidebar></DashboardSidebar>
      </div>

      <div className="lg:col-span-9 p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
