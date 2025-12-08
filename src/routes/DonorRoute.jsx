import React from "react";
import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DonorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <Loading />;

  if (role !== "donor") return <Forbidden />;

  return children;
};

export default DonorRoute;
