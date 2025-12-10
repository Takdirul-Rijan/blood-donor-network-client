import React from "react";
import useRole from "../../hooks/useRole";
import { FaHome } from "react-icons/fa";

import { Link, NavLink } from "react-router";

const DashboardSidebar = () => {
  const { role } = useRole();

  return (
    <div className="space-y-5">
      <Link to={"/"}>
        <FaHome size={24} />
      </Link>

      <Link to="/dashboard" className="flex items-center gap-1 mt-5">
        <span className="text-red-600 font-bold">Dashboard</span> —{" "}
        <span className="text-red-600">{role}</span>
      </Link>

      {/* COMMON MENU */}
      <ul className="menu p-2 bg-base-200 rounded-md">
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
            }
          >
            My Profile
          </NavLink>
        </li>
      </ul>

      {/* DONOR MENU */}
      {role === "donor" && (
        <ul className="menu p-2 bg-base-200 rounded-md">
          <li>
            <NavLink
              to="/dashboard/donor"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              My Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-requests"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              My Donation Requests
            </NavLink>
          </li>

          <li className="mt-1">
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Create Donation Request
            </NavLink>
          </li>
        </ul>
      )}

      {/* ADMIN MENU */}
      {role === "admin" && (
        <ul className="menu p-2 bg-base-200 rounded-md">
          <li>
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-donations"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              All Donation Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/funding"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Funding
            </NavLink>
          </li>
        </ul>
      )}

      {/* VOLUNTEER MENU */}
      {role === "volunteer" && (
        <ul className="menu p-2 bg-base-200 rounded-md">
          <li>
            <NavLink
              to="/dashboard/volunteer"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Volunteer Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-donations"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              Manage Donation Status
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboardSidebar;
