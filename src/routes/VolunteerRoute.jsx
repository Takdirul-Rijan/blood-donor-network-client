import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const VolunteerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user || role !== "volunteer") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;
