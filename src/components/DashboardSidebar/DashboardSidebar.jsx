import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Link, NavLink } from "react-router";
import { FaHome } from "react-icons/fa";

const DashboardSidebar = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="space-y-5">
      <Link to={"/"}>
        <FaHome size={24} />
      </Link>
      <h2 className="text-xl font-bold">
        Dashboard — <span className="text-red-600">{role}</span>
      </h2>

      {/* Common Links */}
      <ul className="menu bg-base-100 p-2 rounded-box">
        <li>
          <NavLink to="/dashboard/profile">My Profile</NavLink>
        </li>
      </ul>

      {/* Admin Links */}
      {role === "admin" && (
        <ul className="menu bg-base-100 p-2 rounded-box">
          <li>
            <NavLink to="/dashboard/admin">Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-donations">
              All Donation Requests
            </NavLink>
          </li>
        </ul>
      )}

      {/* Donor Links */}
      {role === "donor" && (
        <ul className="menu bg-base-100 p-2 rounded-box">
          <li>
            <NavLink to="/dashboard/donor">Donor Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-donations">My Donations</NavLink>
          </li>
        </ul>
      )}

      {/* Volunteer Links */}
      {role === "volunteer" && (
        <ul className="menu bg-base-100 p-2 rounded-box">
          <li>
            <NavLink to="/dashboard/volunteer">Volunteer Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/assigned-requests">
              Assigned Requests
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboardSidebar;
