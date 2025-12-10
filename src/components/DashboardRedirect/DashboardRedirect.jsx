import React from "react";
import useRole from "../../hooks/useRole";
import { Navigate } from "react-router";

const DashboardRedirect = () => {
  const { role, loading } = useRole();

  if (!role) {
    return null;
  }

  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "donor") return <Navigate to="/dashboard/donor" replace />;
  if (role === "volunteer")
    return <Navigate to="/dashboard/volunteer" replace />;

  return <Navigate to="/dashboard/profile" replace />;
};

export default DashboardRedirect;
