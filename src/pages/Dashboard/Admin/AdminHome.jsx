import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ScaleLoader } from "react-spinners";
import { FaDonate, FaTint, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#e63946" />
      </div>
    );

  return (
    <div>
      {/* Welcome Section */}
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-amber-600">
          {dbUser?.name} <br />
        </span>
        <span className="text-xl text-green-600">
          Welcome to BloodConnect, Admin! 💐
        </span>{" "}
        <br />
        <span className="text-xl text-green-600">
          Manage your platform efficiently
        </span>
      </h1>

      {/* Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        <div className="bg-lime-300 shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaUsers className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalUsers || 0}</h2>
            <p>Total Users</p>
          </div>
        </div>

        <div className="bg-lime-300 shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaDonate className="text-4xl text-green-500" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalFunding || 0}</h2>
            <p>Total Funding</p>
          </div>
        </div>

        <div className="bg-lime-300 shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaTint className="text-4xl text-red-500" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalRequests || 0}</h2>
            <p>Blood Donation Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
