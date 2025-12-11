import React from "react";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user } = useAuth();
  const { role, loading } = useRole();

  if (loading) return <span className="loading loading-bars loading-xl"></span>;

  if (!user) return <Navigate to="/login" replace />;

  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "donor") return <Navigate to="/dashboard/donor" replace />;
  if (role === "volunteer")
    return <Navigate to="/dashboard/volunteer" replace />;

  return <Navigate to="/dashboard" replace />;
};

export default DashboardRedirect;
