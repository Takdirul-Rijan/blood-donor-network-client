import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { FaDonate, FaTint, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donationStats, setDonationStats] = useState(null);

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const res = await axiosSecure.get("/admin/donation-stats");
        setDonationStats(res.data);
      } catch (error) {
        console.error("Error fetching donation stats:", error);
      }
    };

    fetchDonationStats();
  }, [axiosSecure]);

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

  const chartData = donationStats
    ? [
        { name: "Today", requests: donationStats.daily || 0 },
        { name: "This Week", requests: donationStats.weekly || 0 },
        { name: "This Month", requests: donationStats.monthly || 0 },
      ]
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-amber-600">{dbUser?.name}</span> <br />
        <span className="text-xl text-green-600">
          Welcome to BloodConnect, Admin! 💐
        </span>
        <br />
        <span className="text-xl text-green-600">
          Manage your platform efficiently
        </span>
      </h1>

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

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-amber-500">
          Donation Requests (Bar Chart)
        </h2>

        {donationStats ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />

              <Bar dataKey="requests" fill="#ff5733" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <span className="loading loading-ring loading-xl"></span>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
