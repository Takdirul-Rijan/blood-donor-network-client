import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StatCard = ({ icon, value, title, className = "" }) => (
  <div
    className={`p-6 rounded-2xl shadow-sm flex items-center gap-4 ${className}`}
  >
    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
    enabled: !!user,
  });

  const stats = data || { totalUsers: 0, totalFunds: 0, totalRequests: 0 };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-amber-600">
          {user?.displayName} <br />
        </span>
        <span className="text-xl text-green-600">
          Welcome to BloodConnect Admin
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"></path>
              <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"></path>
            </svg>
          }
          value={isLoading ? "..." : stats.totalUsers}
          title="Total Users (Donors)"
        />

        <StatCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 1v22"></path>
              <path d="M5 7h14"></path>
              <path d="M5 17h14"></path>
            </svg>
          }
          value={
            isLoading ? "..." : stats.totalFunds ? `$${stats.totalFunds}` : "$0"
          }
          title="Total Funding"
        />

        <StatCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          }
          value={isLoading ? "..." : stats.totalRequests}
          title="Total Blood Requests"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
