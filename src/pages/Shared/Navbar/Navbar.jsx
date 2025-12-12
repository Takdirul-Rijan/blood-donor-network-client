import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { ScaleLoader } from "react-spinners";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          timer: 2500,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch((error) => {});
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#e63946" />
      </div>
    );

  const links = (
    <>
      <li className="font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
              : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li className="font-medium">
        <NavLink
          to="/donation-requests"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
              : ""
          }
        >
          Donation Requests
        </NavLink>
      </li>

      <li className="font-medium">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
              : ""
          }
        >
          Search Donors
        </NavLink>
      </li>

      {user && (
        <li className="font-medium">
          <NavLink
            to="/funding"
            className={({ isActive }) =>
              isActive
                ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
                : ""
            }
          >
            Funding
          </NavLink>
        </li>
      )}

      <li className="font-medium">
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
              : ""
          }
        >
          About Us
        </NavLink>
      </li>

      <li className="font-medium">
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white font-bold py-2 px-6 rounded-lg "
              : ""
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto navbar bg-base-100 shadow-sm p-3 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <div className="flex items-center mr-16">
          <div className="w-10 h-10 flex items-center justify-center bg-neutral rounded-full">
            <Logo />
          </div>
          <h2 className="text-xl font-bold">
            <span className="text-red-600">Blood</span>
            <span className="text-gray-900">Connect</span>
          </h2>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {user ? (
          <div className="dropdown dropdown-end relative group">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full relative">
                <img src={dbUser?.avatar || user.photoURL} alt="avatar" />
              </div>
            </label>

            <span
              className="absolute right-0 mt-12 bg-base-200 text-sm px-2 py-1 rounded shadow 
             opacity-0 group-hover:opacity-100 transition-all duration-200 
             whitespace-nowrap"
            >
              {dbUser?.name}
            </span>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48 animate__animated animate__fadeIn"
            >
              <li className="font-medium">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="font-medium">
                <a onClick={handleLogOut}>Log Out</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link className="btn btn-secondary w-32" to="/login">
              Log In
            </Link>

            <Link className="btn btn-primary w-32" to="/register">
              Join as Donor
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
