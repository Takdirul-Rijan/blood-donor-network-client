import React from "react";
import useRole from "../../hooks/useRole";
import { FaHome } from "react-icons/fa";
// import { Link, NavLink } from "react-router-dom";
// import useRole from "../../hooks/useRole";
// import { FaHome } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { Link, NavLink } from "react-router";

const DashboardSidebar = () => {
  const { role } = useRole();

  return (
    <div className="space-y-5">
      <Link to={"/"}>
        <FaHome size={24} />
      </Link>

      <Link to="/dashboard" className="flex items-center gap-1 mt-5">
        <MdOutlineHome className="text-2xl" />
        <span>
          Dashboard — <span className="text-red-600">{role}</span>
        </span>
      </Link>

      {/* COMMON MENU */}
      {/* <ul className="menu p-2 bg-base-200 rounded-md">
        <li>
          <NavLink to="/dashboard/profile">My Profile</NavLink>
        </li>
      </ul> */}

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

          <li className="my-1">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "bg-amber-600 text-white font-bold rounded-lg " : ""
              }
            >
              My Profile
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
              to="/dashboard/request-blood"
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
          <li>
            <NavLink to="/dashboard/funding">Funding</NavLink>
          </li>
        </ul>
      )}

      {/* VOLUNTEER MENU */}
      {role === "volunteer" && (
        <ul className="menu p-2 bg-base-200 rounded-md">
          <li>
            <NavLink to="/dashboard/volunteer">Volunteer Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-donations">
              Manage Donation Status
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboardSidebar;
